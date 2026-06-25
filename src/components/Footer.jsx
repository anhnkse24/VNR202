import React from 'react';
import { Landmark, ArrowUp } from 'lucide-react';

export default function Footer({ setActivePeriod }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-museum-charcoal text-museum-cream/90 pt-16 pb-8 mt-20 border-t-4 border-museum-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 text-left space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-museum-gold p-2 rounded text-museum-charcoal font-bold">
                <Landmark size={20} />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white uppercase">
                Bảo tàng Lịch sử Trực tuyến
              </span>
            </div>
            <p className="text-xs text-museum-cream/65 leading-relaxed max-w-sm">
              Trang web E-learning lịch sử được phát triển nhằm mục đích tuyên truyền, giảng dạy và hệ thống hóa học liệu chương trình lịch sử Việt Nam giai đoạn cách mạng hào hùng từ 1930 đến 1945.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 text-left">
            <h4 className="font-serif text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Bài học lịch sử
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setActivePeriod('overview'); scrollToTop(); }} className="hover:text-museum-gold transition-colors">
                  Tổng quan bài học
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePeriod('p1'); scrollToTop(); }} className="hover:text-museum-gold transition-colors">
                  Thời kỳ phục hồi 1930 - 1935
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePeriod('p2'); scrollToTop(); }} className="hover:text-museum-gold transition-colors">
                  Thời kỳ dân chủ 1936 - 1939
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePeriod('p3'); scrollToTop(); }} className="hover:text-museum-gold transition-colors">
                  Giải phóng dân tộc 1939 - 1945
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Quotes Column */}
          <div className="md:col-span-4 text-left border-l border-white/10 pl-0 md:pl-8">
            <h4 className="font-serif text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Lời căn dặn lịch sử
            </h4>
            <p className="text-xs italic text-museum-cream/70 leading-relaxed font-serif">
              "Dân ta phải biết sử ta / Cho tường gốc tích nước nhà Việt Nam."
            </p>
            <span className="text-[10px] text-museum-gold font-semibold uppercase block mt-2">
              — Chủ tịch Hồ Chí Minh
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] sm:text-xs text-museum-cream/50 text-center sm:text-left">
            © {new Date().getFullYear()} Bảo tàng Lịch sử Cách mạng. Phát triển phục vụ mục đích giáo dục số chất lượng cao.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs text-museum-gold hover:text-white transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
          >
            <span>Lên đầu trang</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
