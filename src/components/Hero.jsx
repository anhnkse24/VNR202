import React from 'react';
import { Landmark, Users, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

const EMBERS = [
  { left: '8%', size: 3, delay: 0.5, duration: 8 },
  { left: '15%', size: 4, delay: 2, duration: 11 },
  { left: '23%', size: 2, delay: 0, duration: 9 },
  { left: '32%', size: 5, delay: 3.5, duration: 12 },
  { left: '40%', size: 3, delay: 1, duration: 7 },
  { left: '48%', size: 4, delay: 4.8, duration: 10 },
  { left: '55%', size: 2.5, delay: 2.5, duration: 9.5 },
  { left: '63%', size: 5, delay: 0.8, duration: 11.5 },
  { left: '71%', size: 3, delay: 3.8, duration: 8.5 },
  { left: '79%', size: 4, delay: 1.5, duration: 10.5 },
  { left: '87%', size: 2, delay: 5.2, duration: 7.5 },
  { left: '94%', size: 3, delay: 2.9, duration: 9.8 },
  { left: '12%', size: 4.5, delay: 4.1, duration: 11.2 },
  { left: '29%', size: 3, delay: 1.3, duration: 8.7 },
  { left: '52%', size: 5, delay: 3.2, duration: 10.1 },
  { left: '69%', size: 2, delay: 0.3, duration: 7.2 },
  { left: '83%', size: 3.5, delay: 2.7, duration: 9.3 }
];

export default function Hero({ onStartClick }) {
  const stats = [
    { icon: <Calendar className="text-museum-gold" size={24} />, label: "15 Năm Đấu Tranh", desc: "Thời kỳ rèn luyện xương máu và tích lũy lực lượng từ 1930 đến 1945." },
    { icon: <Users className="text-museum-gold" size={24} />, label: "3 Cao Trào Lớn", desc: "1930-1931, 1936-1939 và phong trào GPMT 1939-1945." },
    { icon: <Award className="text-museum-gold" size={24} />, label: "Giành Chính Quyền", desc: "Thắng lợi vĩ đại của Cách mạng Tháng Tám, chấm dứt xiềng xích thực dân." },
    { icon: <Landmark className="text-museum-gold" size={24} />, label: "Khai Sinh VNDCCH", desc: "Mở ra kỷ nguyên mới: Độc lập dân tộc gắn liền với Chủ nghĩa xã hội." }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-museum-redDark via-museum-red to-red-950 text-white py-16 sm:py-24 border-b-4 border-museum-gold shadow-2xl">
      
      {/* 1. Breathing Ambient Glows */}
      <motion.div 
        className="absolute -top-[15%] -left-[15%] w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-[100px] opacity-[0.25] transform-gpu"
        style={{
          background: 'radial-gradient(circle, #da251d 0%, rgba(218, 37, 29, 0) 70%)'
        }}
        animate={{
          scale: [1.0, 1.15, 1.0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-[15%] -right-[15%] w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-[100px] opacity-[0.25] transform-gpu"
        style={{
          background: 'radial-gradient(circle, #FFD700 0%, rgba(255, 215, 0, 0) 70%)'
        }}
        animate={{
          scale: [1.0, 1.15, 1.0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* 2. Floating Golden Embers (Particles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {EMBERS.map((p, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-[#FFD700]/70 pointer-events-none transform-gpu"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              bottom: -15,
              boxShadow: '0 0 8px rgba(255, 215, 0, 0.7)'
            }}
            animate={{
              y: [0, -600],
              opacity: [0, 0.9, 0.9, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* 3. Animated Waving Flag Watermark */}
      <motion.div 
        className="absolute left-[8%] top-[15%] w-[180px] sm:w-[260px] md:w-[320px] aspect-[3/2] pointer-events-none z-0 select-none transform-gpu"
        style={{ opacity: 0.12 }}
        animate={{
          y: [-10, 10, -10],
          skewY: [2, -2, 2],
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]">
          {/* Flag Red Background */}
          <rect width="300" height="200" fill="#da251d" rx="2" />
          {/* Yellow Star in the center */}
          <polygon 
            points="150,55 162,93 201,93 169,116 181,154 150,131 119,154 131,116 99,93 138,93" 
            fill="#ffff00" 
          />
        </svg>
      </motion.div>

      {/* 4. Subtle Topographic/Compass Grid */}
      <motion.div 
        className="absolute right-[-10%] top-[-15%] w-[550px] h-[550px] opacity-[0.06] pointer-events-none z-0 select-none transform-gpu"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 150,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-full h-full text-museum-gold">
          <circle cx="100" cy="100" r="95" strokeWidth="0.5" strokeDasharray="4,4" />
          <circle cx="100" cy="100" r="90" strokeWidth="0.25" />
          <circle cx="100" cy="100" r="65" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="100" cy="100" r="40" strokeWidth="0.25" />
          <line x1="100" y1="5" x2="100" y2="195" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="5" y1="100" x2="195" y2="100" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="100" y1="10" x2="100" y2="15" strokeWidth="0.75" />
          <line x1="100" y1="190" x2="100" y2="185" strokeWidth="0.75" />
          <line x1="10" y1="100" x2="15" y2="100" strokeWidth="0.75" />
          <line x1="190" y1="100" x2="185" y2="100" strokeWidth="0.75" />
          <text x="100" y="24" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">N</text>
          <text x="100" y="184" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">S</text>
          <text x="24" y="102" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">W</text>
          <text x="176" y="102" fontSize="6" textAnchor="middle" fill="currentColor" fontWeight="bold">E</text>
          <text x="105" y="48" fontSize="4" fill="currentColor" opacity="0.6">21°02'N</text>
          <text x="145" y="96" fontSize="4" fill="currentColor" opacity="0.6">105°51'E</text>
        </svg>
      </motion.div>


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
            <div className="rounded-2xl bg-white p-2 border border-museum-gold/40 shadow-2xl relative group flex flex-col gap-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <ImagePlaceholder 
                  src="/images/ba_dinh_square.jpg" 
                  alt="Quảng trường Ba Đình lịch sử" 
                  tip="Dán ảnh Quảng trường Ba Đình 2/9/1945 (Tạo thư mục public/images/ và dán ảnh đặt tên ba_dinh_square.jpg)."
                  aspectRatio="aspect-full w-full h-full"
                />
              </div>
              <p className="text-center font-serif text-[11px] sm:text-xs text-museum-charcoal/70 italic mt-0.5 px-2">
                Ảnh tư liệu: Quảng trường Ba Đình trong ngày Độc lập 2/9/1945
              </p>
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
