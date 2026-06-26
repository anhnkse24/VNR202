import React from 'react';
import { Landmark, Users, Award, Calendar } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

export default function Hero({ onStartClick }) {
  const stats = [
    { icon: <Calendar className="text-museum-gold" size={24} />, label: "15 Năm Đấu Tranh", desc: "Thời kỳ rèn luyện xương máu và tích lũy lực lượng từ 1930 đến 1945." },
    { icon: <Users className="text-museum-gold" size={24} />, label: "3 Cao Trào Lớn", desc: "1930-1931, 1936-1939 và phong trào GPMT 1939-1945." },
    { icon: <Award className="text-museum-gold" size={24} />, label: "Giành Chính Quyền", desc: "Thắng lợi vĩ đại của Cách mạng Tháng Tám, chấm dứt xiềng xích thực dân." },
    { icon: <Landmark className="text-museum-gold" size={24} />, label: "Khai Sinh VNDCCH", desc: "Mở ra kỷ nguyên mới: Độc lập dân tộc gắn liền với Chủ nghĩa xã hội." }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-museum-redDark via-museum-red to-red-950 text-white py-16 sm:py-24 border-b-4 border-museum-gold shadow-2xl">
      
      {/* Sparks rising from bottom (Revolutionary Flame Theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute bottom-[-10px] left-[15%] w-1.5 h-1.5 rounded-full bg-museum-gold/80 animate-rise-sparks" style={{ animationDelay: '0.5s', animationDuration: '6s' }} />
        <div className="absolute bottom-[-10px] left-[35%] w-2 h-2 rounded-full bg-orange-500/70 animate-rise-sparks" style={{ animationDelay: '1.8s', animationDuration: '7s' }} />
        <div className="absolute bottom-[-10px] left-[55%] w-1.5 h-1.5 rounded-full bg-yellow-400/90 animate-rise-sparks" style={{ animationDelay: '3.2s', animationDuration: '5s' }} />
        <div className="absolute bottom-[-10px] left-[75%] w-2.5 h-2.5 rounded-full bg-museum-gold/60 animate-rise-sparks" style={{ animationDelay: '0.1s', animationDuration: '8s' }} />
        <div className="absolute bottom-[-10px] left-[90%] w-1.5 h-1.5 rounded-full bg-orange-600/75 animate-rise-sparks" style={{ animationDelay: '4.5s', animationDuration: '6.5s' }} />
      </div>

      {/* Decorative Traditional Sun Motif in background (Vietnamese Dong Son Bronze Drum Motif) */}
      <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] opacity-10 rounded-full border-[10px] border-dashed border-museum-gold animate-[spin_200s_linear_infinite]" />
      <div className="absolute left-[-5%] bottom-[-10%] w-[300px] h-[300px] opacity-10 rounded-full border-[4px] border-museum-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Header */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-museum-gold/20 border border-museum-gold/30 text-museum-gold font-semibold text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-museum-gold animate-pulse" />
              Chương trình Học tập Lịch sử Cao cấp
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
              Đảng Lãnh Đạo <br />
              <span className="text-museum-gold bg-clip-text">Đấu Tranh Giành Chính Quyền</span> <br />
              (1930 - 1945)
            </h1>
            
            <p className="text-base sm:text-lg text-museum-cream/80 font-normal leading-relaxed max-w-2xl">
              Khám phá chặng đường lịch sử 15 năm vẻ vang dưới sự lãnh đạo tài tình của Đảng Cộng sản Việt Nam. Từ những ngày đầu thành lập, vượt qua giông tố khủng bố trắng, khơi dậy ngọn lửa dân chủ công khai cho đến mốc son chói lọi của Cách mạng Tháng Tám 1945.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onStartClick('p1')}
                className="px-8 py-3 bg-museum-gold text-white font-semibold rounded-lg hover:bg-museum-goldLight transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-museum"
              >
                Bắt đầu hành trình
              </button>
              <button 
                onClick={() => onStartClick('overview')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Xem tổng quan chương
              </button>
            </div>
          </div>

          {/* Historical Artwork Representation / Illustration container */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl bg-white p-1 border border-museum-gold/40 shadow-2xl relative overflow-hidden group">
              <ImagePlaceholder 
                src="/images/ba_dinh_square.jpg" 
                alt="Quảng trường Ba Đình lịch sử" 
                tip="Dán ảnh Quảng trường Ba Đình 2/9/1945 (Tạo thư mục public/images/ và dán ảnh đặt tên ba_dinh_square.jpg)."
                aspectRatio="aspect-full w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Quick Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-left">
              <div className="bg-museum-gold/20 p-2.5 rounded-lg w-fit mb-4">
                {stat.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-1">
                {stat.label}
              </h4>
              <p className="text-sm text-museum-cream/70">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
