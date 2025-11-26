import { GoogleGenAI, Type } from "@google/genai";
import { Language, PersonalityResult, QuizQuestion, UserAnswer } from "../types";
import { getStaticQuestions } from "./staticData";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to get schema based on language (though the structure is the same, instructions differ slightly)
const getSystemInstruction = (lang: Language): string => {
  if (lang === 'vi') {
    return "Bạn là một AI hài hước, lầy lội và thích 'cà khịa'. Nhiệm vụ của bạn là tạo ra các câu hỏi trắc nghiệm tính cách cực kỳ bựa, buồn cười và độc lạ. Mỗi lựa chọn phải có điểm số 'độ lầy' (score) từ 1 đến 10.";
  }
  return "You are a funny, quirky, and slightly trolling AI. Your task is to generate personality quiz questions that are hilarious, absurd, and unique. Each option must have a 'quirk score' (score) from 1 to 10.";
};

export const generateQuestions = async (lang: Language): Promise<QuizQuestion[]> => {
  const model = "gemini-2.5-flash";
  
  const prompt = lang === 'vi' 
    ? "Tạo danh sách 5 câu hỏi trắc nghiệm vui nhộn để kiểm tra tính cách. Mỗi câu hỏi có 3-4 lựa chọn trả lời. Gán điểm (score) cho mỗi lựa chọn (1=bình thường, 10=siêu lầy)."
    : "Generate a list of 5 funny personality quiz questions. Each question should have 3-4 answer options. Assign a score (1=normal, 10=super weird) to each option.";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              text: { type: Type.STRING, description: "The funny question text" },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING, description: "The funny answer option" },
                    score: { type: Type.INTEGER, description: "Quirkiness score from 1-10" }
                  },
                  required: ["id", "text", "score"]
                }
              }
            },
            required: ["id", "text", "options"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from Gemini");
    return JSON.parse(jsonText) as QuizQuestion[];

  } catch (error) {
    console.error("Failed to generate questions:", error);
    // Use fallback from static data (random 5)
    const allQuestions = getStaticQuestions(lang);
    return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
  }
};

export const analyzePersonality = async (answers: UserAnswer[], totalScore: number, maxScore: number, lang: Language): Promise<PersonalityResult> => {
  const model = "gemini-2.5-flash";
  
  const answersText = answers.map(a => `Q: ${a.questionText} - A: ${a.selectedOptionText} (Score: ${a.score})`).join('\n');
  const scorePercent = Math.round((totalScore / maxScore) * 100);

  const prompt = lang === 'vi'
    ? `Dựa trên các câu trả lời sau và tổng điểm độ lầy là ${scorePercent}/100, hãy phân tích tính cách người dùng. Hãy đưa ra một kết quả hài hước, 'cà khịa' nhẹ nhàng nhưng vẫn đúng.
       
       Dữ liệu trả lời:
       ${answersText}`
    : `Based on the following answers and a quirkiness score of ${scorePercent}/100, analyze the user's personality. Give a funny, slightly roasting but accurate result.
    
       Answer Data:
       ${answersText}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: lang === 'vi' 
          ? "Bạn là một nhà tâm lý học 'nửa mùa' cực kỳ hài hước. Hãy phán xét người dùng một cách vui vẻ dựa trên điểm số của họ."
          : "You are a hilarious amateur psychologist. Judge the user playfully based on their weirdness score.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A creative title for their personality type" },
            description: { type: Type.STRING, description: "A paragraph describing them" },
            spiritEmoji: { type: Type.STRING, description: "A single emoji representing them" },
            roast: { type: Type.STRING, description: "A short, funny roast or advice" }
          },
          required: ["title", "description", "spiritEmoji", "roast"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No analysis returned");
    const analysis = JSON.parse(jsonText);
    
    return {
        ...analysis,
        totalScore: totalScore,
        maxPossibleScore: maxScore
    };

  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      title: lang === 'vi' ? "Người Bí Ẩn" : "The Mystery",
      description: lang === 'vi' ? "AI đã quá bối rối trước sự phức tạp của bạn." : "The AI is too confused by your complexity.",
      spiritEmoji: "👾",
      roast: lang === 'vi' ? "Bạn là ca khó nhất tôi từng gặp." : "You are the hardest case I've ever seen.",
      totalScore: totalScore,
      maxPossibleScore: maxScore
    };
  }
};