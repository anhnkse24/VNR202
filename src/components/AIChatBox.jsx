import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Landmark } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    keywords: ["xô viết", "nghệ tĩnh", "nghệ an", "hà tĩnh"],
    reply: "Xô viết Nghệ - Tĩnh (1930-1931) là đỉnh cao của phong trào cách mạng thời kỳ này. Quần chúng nhân dân dưới sự lãnh đạo của Đảng đã nổi dậy làm tan rã chính quyền thực dân phong kiến ở nhiều thôn xã Nghệ An - Hà Tĩnh, tự thành lập chính quyền kiểu Xô viết quản lý đời sống xã hội."
  },
  {
    keywords: ["luận cương", "trần phú", "10/1930"],
    reply: "Luận cương chính trị tháng 10/1930 do đồng chí Trần Phú khởi thảo. Luận cương xác định con đường cách mạng tư sản dân quyền tiến thẳng lên XHCN. Điểm hạn chế lớn nhất là chưa đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và nặng về đấu tranh giai cấp."
  },
  {
    keywords: ["cách mạng tháng tám", "tháng 8", "1945", "tổng khởi nghĩa"],
    reply: "Cách mạng Tháng Tám năm 1945 nổ ra khi phát xít Nhật đầu hàng Đồng minh vô điều kiện. Dưới sự lãnh đạo của Đảng và Việt Minh, nhân dân cả nước giành chính quyền thắng lợi ở Hà Nội (19/8), Huế (23/8), và Sài Gòn (25/8). Ngày 2/9/1945, nước Việt Nam Dân chủ Cộng hòa chính thức được khai sinh."
  },
  {
    keywords: ["đội việt nam", "tuyên truyền", "giải phóng quân", "võ nguyên giáp", "quân đội"],
    reply: "Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập ngày 22/12/1944 tại Cao Bằng gồm 34 chiến sĩ, do đồng chí Võ Nguyên Giáp chỉ huy. Đây là lực lượng quân sự chủ lực tiền thân của Quân đội nhân dân Việt Nam."
  },
  {
    keywords: ["hồ chí minh", "nguyễn ái quốc", "bác hồ"],
    reply: "Lãnh tụ Nguyễn Ái Quốc sáng lập Đảng Cộng sản Việt Nam (3/2/1930). Tháng 1/1941, Người trở về nước sau 30 năm bôn ba, họp Hội nghị TW VIII tại hang Pác Bó thành lập Mặt trận Việt Minh và đọc Tuyên ngôn Độc lập ngày 2/9/1945."
  },
  {
    keywords: ["nhật pháp bắn nhau", "chỉ thị", "9/3/1945"],
    reply: "Chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta' ra đời ngày 12/3/1945 ngay sau đảo chính. Đảng xác định kẻ thù chính duy nhất là phát xít Nhật, thay đổi khẩu hiệu sang 'Đánh đuổi phát xít Nhật' và phát động cao trào kháng Nhật."
  },
  {
    keywords: ["nạn đói", "kho thóc"],
    reply: "Cuối năm 1944 - đầu năm 1945, ách áp bức Pháp - Nhật đã gây ra nạn đói khủng khiếp làm hơn 2 triệu người chết. Việt Minh phát động chiến dịch 'Phá kho thóc Nhật giải quyết nạn đói', cứu sống hàng triệu đồng bào và thu hút quần chúng đi theo cách mạng."
  }
];

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Xin chào! Tôi là Trợ lý Lịch sử AI. Bạn cần tìm hiểu thông tin gì về giai đoạn cách mạng Việt Nam 1930 - 1945?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulate AI response
    setTimeout(() => {
      let aiResponse = "Xin lỗi, tôi chưa tìm thấy thông tin chính xác về câu hỏi của bạn trong dữ liệu 1930-1945. Bạn có thể hỏi về: Xô viết Nghệ Tĩnh, Luận cương Trần Phú, Cách mạng Tháng Tám, Đội Việt Nam Tuyên truyền Giải phóng quân hoặc Chỉ thị Nhật - Pháp bắn nhau.";
      
      const cleanText = text.toLowerCase();
      
      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some(keyword => cleanText.includes(keyword))) {
          aiResponse = item.reply;
          break;
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponse
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const sampleQuestions = [
    "Xô viết Nghệ Tĩnh là gì?",
    "Hạn chế của Luận cương 10/1930?",
    "Ý nghĩa Cách mạng Tháng Tám?",
    "Đội Giải phóng quân thành lập khi nào?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-museum-red hover:bg-museum-redLight text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-museum-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-museum-gold"></span>
          </span>
          <MessageSquare size={18} />
          <span className="font-semibold text-sm">Hỏi Trợ lý AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-2xl border-2 border-museum-gold/30 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-museum-redDark to-museum-red text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-museum-gold p-1.5 rounded-lg text-museum-charcoal">
                <Landmark size={16} />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold flex items-center gap-1">
                  Trợ lý Lịch sử AI
                  <Sparkles size={12} className="text-museum-gold animate-pulse" />
                </h4>
                <p className="text-[10px] text-museum-cream/70 font-semibold">Tư vấn bài học 1930 - 1945</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-museum-cream/30 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-museum-gold text-white' : 'bg-museum-red text-white'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Landmark size={14} />}
                </div>

                {/* Message Bubble */}
                <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-museum-gold text-white rounded-tr-none' 
                    : 'bg-white border border-museum-red/10 text-museum-charcoal rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-museum-red text-white flex items-center justify-center text-xs shrink-0">
                  <Landmark size={14} />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-museum-red/10 text-museum-charcoal rounded-tl-none text-xs sm:text-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-museum-red animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-museum-red animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-museum-red animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-museum-cream/10 border-t border-museum-red/5">
              <p className="text-[10px] font-bold text-museum-gold uppercase mb-1.5">GỢI Ý CÂU HỎI:</p>
              <div className="flex flex-wrap gap-1.5">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-[10px] sm:text-xs text-museum-red bg-museum-red/5 hover:bg-museum-red/10 border border-museum-red/10 px-2 py-1 rounded-full transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 border-t border-museum-red/10 bg-white flex gap-2">
            <input
              type="text"
              placeholder="Nhập câu hỏi tại đây..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
              className="flex-1 border border-museum-red/10 focus:border-museum-red focus:outline-none rounded-xl px-3 py-2 text-xs sm:text-sm"
            />
            <button
              onClick={() => handleSend(inputValue)}
              className="bg-museum-red hover:bg-museum-redLight text-white p-2.5 rounded-xl transition-colors shrink-0"
              aria-label="Gửi"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
