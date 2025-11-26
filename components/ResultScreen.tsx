import React, { useState } from 'react';
import { Language, PersonalityResult } from '../types';
import { RefreshCw, Share2, Download, Loader2 } from 'lucide-react';

interface Props {
  result: PersonalityResult;
  lang: Language;
  onRetry: () => void;
}

export const ResultScreen: React.FC<Props> = ({ result, lang, onRetry }) => {
  const [isSharing, setIsSharing] = useState(false);

  // Helper to wrap text on canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  };

  const generateShareImage = async (): Promise<File | null> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set dimensions (Portrait format for Stories/Mobile)
    const w = 800;
    const h = 1200;
    canvas.width = w;
    canvas.height = h;

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, '#fef08a'); // yellow-200
    gradient.addColorStop(1, '#d8b4fe'); // purple-300
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Decorative Polka Dots
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    for (let i = 0; i < w; i += 40) {
      for (let j = 0; j < h; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.beginPath();
          ctx.arc(i, j, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Border
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(0, 0, w, h);

    // Setup Text
    ctx.textAlign = 'center';
    
    // Header
    ctx.font = 'bold 40px "Fredoka", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(lang === 'vi' ? 'CHỨNG NHẬN ĐỘ LẦY' : 'CERTIFIED QUIRKY', w / 2, 80);

    // White Card Container
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(50, 150, w - 100, h - 300, 30);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.stroke();

    // Emoji Background
    ctx.fillStyle = '#f3f4f6';
    ctx.beginPath();
    ctx.arc(w / 2, 350, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Emoji
    ctx.font = '180px serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(result.spiritEmoji, w / 2, 360);
    ctx.textBaseline = 'alphabetic';

    // Title
    ctx.font = '900 60px "Fredoka", sans-serif';
    ctx.fillStyle = '#6b21a8'; // purple-800
    wrapText(ctx, result.title.toUpperCase(), w / 2, 620, w - 140, 70);

    // Score Meter
    const percentage = Math.round((result.totalScore / result.maxPossibleScore) * 100);
    const barW = w - 200;
    const barH = 40;
    const barX = 100;
    const barY = 780;

    // Bar bg
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.strokeRect(barX, barY, barW, barH);

    // Bar fill
    ctx.fillStyle = percentage > 70 ? '#ef4444' : percentage > 30 ? '#eab308' : '#3b82f6';
    ctx.fillRect(barX, barY, barW * (percentage / 100), barH);
    ctx.strokeRect(barX, barY, barW * (percentage / 100), barH);

    // Score Text
    ctx.font = 'bold 50px "Fredoka", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(`${percentage}% ${lang === 'vi' ? 'ĐỘ BỰA' : 'QUIRKINESS'}`, w / 2, barY + 90);

    // Roast Snippet
    ctx.font = 'italic 32px "Fredoka", sans-serif';
    ctx.fillStyle = '#374151';
    wrapText(ctx, `"${result.roast}"`, w / 2, barY + 160, w - 160, 45);

    // Footer Text
    ctx.font = 'bold 30px "Fredoka", sans-serif';
    ctx.fillStyle = '#4b5563';
    ctx.fillText('Quirky Persona App', w / 2, h - 50);

    // Convert to File
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'quirky-persona-result.png', { type: 'image/png' });
          resolve(file);
        } else {
          resolve(null);
        }
      }, 'image/png');
    });
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const file = await generateShareImage();
      
      const shareData: ShareData = {
        title: 'Quirky Persona Result',
        text: lang === 'vi' 
          ? `Tôi đạt ${Math.round((result.totalScore / result.maxPossibleScore) * 100)}% độ lầy! Tôi là "${result.title}"!`
          : `I scored ${Math.round((result.totalScore / result.maxPossibleScore) * 100)}% on quirkiness! I am a "${result.title}"!`,
      };

      if (file && navigator.canShare && navigator.canShare({ ...shareData, files: [file] })) {
        await navigator.share({ ...shareData, files: [file] });
      } else if (navigator.share) {
        // Fallback to text share if file sharing not supported
        await navigator.share({ ...shareData, url: window.location.href });
      } else {
         // Fallback manual download
         if (file) {
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'quirky-persona-result.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert(lang === 'vi' ? 'Ảnh đã được tải xuống!' : 'Image downloaded!');
         } else {
            // Text clipboard fallback
            navigator.clipboard.writeText(shareData.text || '');
            alert(lang === 'vi' ? 'Đã sao chép kết quả!' : 'Result copied to clipboard!');
         }
      }
    } catch (err) {
      console.log('Share canceled or failed', err);
    } finally {
      setIsSharing(false);
    }
  };

  const percentage = Math.round((result.totalScore / result.maxPossibleScore) * 100);

  return (
    <div className="max-w-2xl mx-auto w-full p-6 animate-in zoom-in duration-500">
      <div className="bg-white border-4 border-black p-8 rounded-2xl pop-shadow text-center relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 left-0 w-full h-4 bg-red-400 border-b-4 border-black"></div>
        
        {/* Score Badge */}
        <div className="inline-block bg-black text-white px-4 py-2 rounded-full font-bold mb-4 mt-6 transform rotate-2">
            {lang === 'vi' ? 'ĐIỂM ĐỘ LẦY' : 'WEIRDNESS SCORE'}
        </div>
        
        {/* Meter */}
        <div className="relative h-8 bg-gray-200 rounded-full border-4 border-black mb-8 overflow-hidden">
             <div 
                className="h-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
             ></div>
             <div className="absolute inset-0 flex items-center justify-center font-black text-sm md:text-base drop-shadow-md">
                {percentage}/100 POINTS
             </div>
        </div>

        {/* Spirit Emoji */}
        <div className="text-8xl mb-4 animate-bounce">
          {result.spiritEmoji}
        </div>

        {/* Title */}
        <h2 className="text-4xl font-black text-purple-700 uppercase mb-4 tracking-tighter transform -rotate-1">
          {result.title}
        </h2>

        {/* Description */}
        <p className="text-xl font-medium text-gray-800 mb-6 leading-relaxed bg-yellow-100 p-4 border-2 border-black rounded-lg rotate-1">
          {result.description}
        </p>

        {/* Roast Section */}
        <div className="bg-gray-900 text-white p-6 rounded-xl border-4 border-gray-500 mb-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 border-2 border-white rounded-full uppercase">
                {lang === 'vi' ? 'Góc Cà Khịa' : 'The Roast'}
            </div>
            <p className="text-lg italic font-semibold">
                "{result.roast}"
            </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center justify-center gap-2 px-6 py-3 font-bold bg-blue-400 border-4 border-black rounded-lg hover:bg-blue-300 transition-all pop-shadow-sm active:translate-y-1 active:shadow-none disabled:opacity-70 disabled:cursor-wait"
            >
                {isSharing ? <Loader2 className="animate-spin" size={20}/> : <Share2 size={20} />}
                {lang === 'vi' ? 'Khoe Ngay (Ảnh)' : 'Share Card'}
            </button>
            <button
                onClick={onRetry}
                className="flex items-center justify-center gap-2 px-6 py-3 font-bold bg-green-400 border-4 border-black rounded-lg hover:bg-green-300 transition-all pop-shadow-sm active:translate-y-1 active:shadow-none"
            >
                <RefreshCw size={20} />
                {lang === 'vi' ? 'Chơi Lại' : 'Try Again'}
            </button>
        </div>
      </div>
    </div>
  );
};
