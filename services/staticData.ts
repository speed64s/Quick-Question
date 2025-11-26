import { QuizQuestion } from "../types";

// Helper to create options with scores easily
const opt = (id: string, text: string, score: number) => ({ id, text, score });

export const getStaticQuestions = (lang: 'en' | 'vi'): QuizQuestion[] => {
  if (lang === 'vi') {
    return [
      {
        id: 1,
        text: "Nếu ngày mai là tận thế, hành động đầu tiên của bạn là gì?",
        options: [
          opt('a', "Khóc lóc gọi điện cho người yêu cũ", 2),
          opt('b', "Ăn hết đồ ngon trong tủ lạnh", 5),
          opt('c', "Livestream Facebook: 'Review ngày tận thế'", 10),
          opt('d', "Ngủ tiếp, tận thế tính sau", 7)
        ]
      },
      {
        id: 2,
        text: "Bạn thấy tờ 500k rơi giữa đường đông người...",
        options: [
          opt('a', "Lơ đi như người thanh cao", 1),
          opt('b', "Lấy chân dẫm lên rồi giả vờ buộc dây giày", 6),
          opt('c', "Hét lên 'Tiền của ai rớt nè!' rồi lụm bỏ túi", 9),
          opt('d', "Nhặt lên đem nộp đồn công an (xạo ghê)", 3)
        ]
      },
      {
        id: 3,
        text: "Người lạ inbox mượn tiền, bạn sẽ...",
        options: [
          opt('a', "Block thẳng tay không nói nhiều", 4),
          opt('b', "Gửi lại số tài khoản để xin tiền ngược lại", 10),
          opt('c', "Seen không rep cho nó cay", 6),
          opt('d', "Hỏi lý do rồi... block", 5)
        ]
      },
      {
        id: 4,
        text: "Đang đi hẹn hò thì bị đau bụng dữ dội...",
        options: [
          opt('a', "Giả vờ có điện thoại gấp rồi chuồn", 5),
          opt('b', "Thú nhận và xin đi WC (hơi quê)", 3),
          opt('c', "Gồng mình chịu đựng đến chết", 8),
          opt('d', "Thả bom tại chỗ và đổ thừa tiếng ghế kêu", 10)
        ]
      },
      {
        id: 5,
        text: "Bạn thích nuôi con gì nhất?",
        options: [
          opt('a', "Chó mèo bình thường", 1),
          opt('b', "Nuôi 'báo' (báo cha báo mẹ)", 9),
          opt('c', "Nuôi gián để dọa người khác", 10),
          opt('d', "Nuôi mộng làm giàu", 6)
        ]
      },
      {
        id: 6,
        text: "Đồng nghiệp rủ đi nhậu nhưng bạn hết tiền...",
        options: [
          opt('a', "Từ chối khéo là bận việc", 2),
          opt('b', "Đi luôn, tới đó giả say để về sớm", 8),
          opt('c', "Đi nhưng chỉ ngồi ăn mồi", 7),
          opt('d', "Mượn tiền chính người rủ để đi", 10)
        ]
      },
      {
        id: 7,
        text: "Thấy người yêu cũ có người yêu mới xấu hơn mình...",
        options: [
          opt('a', "Cười thầm trong bụng", 5),
          opt('b', "Vào like ảnh dằn mặt", 7),
          opt('c', "Chúc phúc thật lòng (chắc chắn là nói dối)", 2),
          opt('d', "Lập nick ảo vào chê bai", 9)
        ]
      },
      {
        id: 8,
        text: "Nếu trúng số độc đắc, việc đầu tiên là...",
        options: [
          opt('a', "Mua nhà mua xe", 3),
          opt('b', "Đổi số điện thoại, cắt đứt liên lạc bạn bè", 8),
          opt('c', "Đi làm và tát sếp một cái rồi nghỉ", 10),
          opt('d', "Làm từ thiện lấy tiếng", 4)
        ]
      },
      {
        id: 9,
        text: "Đang tắm thì hết nước...",
        options: [
          opt('a', "Hét lên gọi mẹ cứu", 4),
          opt('b', "Lấy khăn lau tạm bọt xà phòng", 5),
          opt('c', "Mặc quần áo vào và đi ra như chưa có gì", 8),
          opt('d', "Ngồi thiền đợi nước có lại", 9)
        ]
      },
      {
        id: 10,
        text: "Bạn ghét nhất loại người nào?",
        options: [
          opt('a', "Người hay khoe khoang", 3),
          opt('b', "Người ăn xong không trả tiền", 5),
          opt('c', "Người mượn bút không trả nắp", 7),
          opt('d', "Người giống y hệt mình", 10)
        ]
      },
      {
        id: 11,
        text: "Nếu được tàng hình 1 ngày, bạn sẽ...",
        options: [
          opt('a', "Vào ngân hàng hốt bạc", 8),
          opt('b', "Rình xem crush đang làm gì", 7),
          opt('c', "Vào rạp xem phim miễn phí", 4),
          opt('d', "Ngủ, vì không ai thấy mình để sai vặt", 9)
        ]
      },
      {
        id: 12,
        text: "Món ăn nào mô tả đúng nhất về bạn?",
        options: [
          opt('a', "Đậu hũ thúi (ngoài thúi trong ngon)", 8),
          opt('b', "Mì cay cấp độ 7 (nóng tính)", 6),
          opt('c', "Bánh bèo (vô dụng)", 7),
          opt('d', "Cơm trắng (nhạt nhẽo)", 3)
        ]
      },
      {
        id: 13,
        text: "Gặp ma bạn sẽ làm gì?",
        options: [
          opt('a', "Xỉu ngay lập tức", 2),
          opt('b', "Xin con số đề", 10),
          opt('c', "Chạy bán sống bán chết", 4),
          opt('d', "Đứng lại selfie với ma đăng Face", 9)
        ]
      },
      {
        id: 14,
        text: "Sếp nhắn tin vào Chủ Nhật, bạn...",
        options: [
          opt('a', "Rep ngay lập tức", 1),
          opt('b', "Giả vờ không thấy, thứ 2 tính", 7),
          opt('c', "Rep: 'Thuê bao quý khách vừa gọi...'", 10),
          opt('d', "Chửi thầm rồi rep", 5)
        ]
      },
      {
        id: 15,
        text: "Bạn nghĩ gì về người ngoài hành tinh?",
        options: [
          opt('a', "Họ rất đáng sợ", 2),
          opt('b', "Họ chắc chắn thông minh hơn loài người", 4),
          opt('c', "Tôi chính là người ngoài hành tinh đây", 10),
          opt('d', "Muốn bị bắt cóc để khỏi đi làm", 8)
        ]
      },
      {
        id: 16,
        text: "Khi đi thang máy một mình, bạn thường...",
        options: [
          opt('a', "Đứng nghiêm chỉnh", 1),
          opt('b', "Soi gương nặn mụn", 5),
          opt('c', "Nhảy múa quay TikTok", 8),
          opt('d', "Thử bấm hết các tầng xem sao", 9)
        ]
      },
      {
        id: 17,
        text: "Nếu được phẫu thuật thẩm mỹ miễn phí...",
        options: [
          opt('a', "Sửa hết toàn bộ", 6),
          opt('b', "Chỉ sửa cái nết", 10),
          opt('c', "Tôi đẹp sẵn rồi, không cần", 8),
          opt('d', "Sửa mũi cho cao để dễ thở", 3)
        ]
      },
      {
        id: 18,
        text: "Bạn sợ điều gì nhất?",
        options: [
          opt('a', "Sợ ma", 3),
          opt('b', "Sợ gián bay", 7),
          opt('c', "Sợ check số dư tài khoản", 9),
          opt('d', "Sợ người ta biết lịch sử duyệt web", 10)
        ]
      },
      {
        id: 19,
        text: "Khi thấy trẻ con khóc...",
        options: [
          opt('a', "Dỗ dành", 2),
          opt('b', "Làm mặt xấu cho nó khóc to hơn", 10),
          opt('c', "Bỏ đi chỗ khác", 5),
          opt('d', "Khóc theo", 8)
        ]
      },
      {
        id: 20,
        text: "Phương châm sống của bạn là...",
        options: [
          opt('a', "Việc hôm nay chớ để ngày mai", 2),
          opt('b', "Việc hôm nay để mai làm cũng chưa muộn", 8),
          opt('c', "Ngu si hưởng thái bình", 9),
          opt('d', "Sống chết có số, phú quý do trời", 5)
        ]
      }
    ];
  } else {
    // English mapping (simplified for brevity but maintaining structure)
    return [
      {
        id: 1,
        text: "The apocalypse is tomorrow. Your first move?",
        options: [
          opt('a', "Crying and calling your ex", 2),
          opt('b', "Eating everything in the fridge", 5),
          opt('c', "Livestream: 'Apocalypse Review!'", 10),
          opt('d', "Go back to sleep, deal with it later", 7)
        ]
      },
      {
        id: 2,
        text: "You find $100 on a crowded street...",
        options: [
          opt('a', "Ignore it, I'm noble", 1),
          opt('b', "Step on it and tie my shoe", 6),
          opt('c', "Yell 'Who dropped this?' then pocket it", 9),
          opt('d', "Take it to the police (liar)", 3)
        ]
      },
      {
        id: 3,
        text: "A stranger DMs you asking for money...",
        options: [
          opt('a', "Block immediately", 4),
          opt('b', "Send your bank details asking them for money", 10),
          opt('c', "Leave on 'Read' to annoy them", 6),
          opt('d', "Ask why, then block", 5)
        ]
      },
      {
        id: 4,
        text: "Stomach ache during a date...",
        options: [
          opt('a', "Fake an emergency call and run", 5),
          opt('b', "Confess and go to WC (awkward)", 3),
          opt('c', "Hold it in until death", 8),
          opt('d', "Let it rip and blame the chair", 10)
        ]
      },
      {
        id: 5,
        text: "Ideal pet?",
        options: [
          opt('a', "Normal dog/cat", 1),
          opt('b', "A leech (like my friends)", 9),
          opt('c', "Cockroaches to scare people", 10),
          opt('d', "A dream of being rich", 6)
        ]
      },
      {
        id: 6,
        text: "Coworker invites you for drinks, you're broke...",
        options: [
          opt('a', "Politely decline", 2),
          opt('b', "Go, fake drunk, leave early", 8),
          opt('c', "Go but only eat the free peanuts", 7),
          opt('d', "Borrow money from that coworker to go", 10)
        ]
      },
      {
        id: 7,
        text: "Ex gets a new partner who is uglier than you...",
        options: [
          opt('a', "Smile internally", 5),
          opt('b', "Like the photo aggressively", 7),
          opt('c', "Wish them well (lie)", 2),
          opt('d', "Make a fake account to roast them", 9)
        ]
      },
      {
        id: 8,
        text: "You win the lottery. First step?",
        options: [
          opt('a', "Buy house/car", 3),
          opt('b', "Change number, ghost everyone", 8),
          opt('c', "Slap my boss and quit", 10),
          opt('d', "Donate for clout", 4)
        ]
      },
      {
        id: 9,
        text: "Shower water cuts out while you're soapy...",
        options: [
          opt('a', "Scream for mom", 4),
          opt('b', "Wipe with a towel", 5),
          opt('c', "Walk out like nothing happened", 8),
          opt('d', "Meditate until it returns", 9)
        ]
      },
      {
        id: 10,
        text: "Type of person you hate most?",
        options: [
          opt('a', "Show-offs", 3),
          opt('b', "Dine and dashers", 5),
          opt('c', "Pen thieves", 7),
          opt('d', "People exactly like me", 10)
        ]
      },
      {
        id: 11,
        text: "Invisible for a day...",
        options: [
          opt('a', "Rob a bank", 8),
          opt('b', "Spy on my crush", 7),
          opt('c', "Free movies", 4),
          opt('d', "Sleep, no one can bother me", 9)
        ]
      },
      {
        id: 12,
        text: "Food that describes you?",
        options: [
          opt('a', "Stinky Tofu (smells bad, tastes good)", 8),
          opt('b', "Spicy Noodle Lvl 7 (Hot tempered)", 6),
          opt('c', "Vanilla Ice Cream (Basic)", 7),
          opt('d', "Plain Rice (Boring)", 3)
        ]
      },
      {
        id: 13,
        text: "You see a ghost...",
        options: [
          opt('a', "Faint immediately", 2),
          opt('b', "Ask for lottery numbers", 10),
          opt('c', "Run for my life", 4),
          opt('d', "Take a selfie with it", 9)
        ]
      },
      {
        id: 14,
        text: "Boss texts on Sunday...",
        options: [
          opt('a', "Reply immediately", 1),
          opt('b', "Pretend I died until Monday", 7),
          opt('c', "Reply: 'Who dis?'", 10),
          opt('d', "Curse loudly, then reply", 5)
        ]
      },
      {
        id: 15,
        text: "Thoughts on aliens?",
        options: [
          opt('a', "Scary", 2),
          opt('b', "Smarter than us", 4),
          opt('c', "I am one", 10),
          opt('d', "Take me away from work pls", 8)
        ]
      },
      {
        id: 16,
        text: "Alone in an elevator...",
        options: [
          opt('a', "Stand still", 1),
          opt('b', "Check for pimples", 5),
          opt('c', "TikTok dance", 8),
          opt('d', "Press all buttons", 9)
        ]
      },
      {
        id: 17,
        text: "Free plastic surgery...",
        options: [
          opt('a', "Fix everything", 6),
          opt('b', "Fix my attitude", 10),
          opt('c', "I'm perfect already", 8),
          opt('d', "Fix nose to breathe better", 3)
        ]
      },
      {
        id: 18,
        text: "Biggest fear?",
        options: [
          opt('a', "Ghosts", 3),
          opt('b', "Flying roaches", 7),
          opt('c', "Checking bank balance", 9),
          opt('d', "Browser history leak", 10)
        ]
      },
      {
        id: 19,
        text: "Crying baby nearby...",
        options: [
          opt('a', "Comfort it", 2),
          opt('b', "Make faces to scare it more", 10),
          opt('c', "Walk away", 5),
          opt('d', "Cry with it", 8)
        ]
      },
      {
        id: 20,
        text: "Life motto?",
        options: [
          opt('a', "Do it now", 2),
          opt('b', "Do it tomorrow", 8),
          opt('c', "Ignorance is bliss", 9),
          opt('d', "It is what it is", 5)
        ]
      }
    ];
  }
};