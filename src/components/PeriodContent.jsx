import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, ArrowLeft, ArrowRight, UserCheck, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { historyPeriods, keyHistoricalFigures } from '../data/historyData';
import ImagePlaceholder from './ImagePlaceholder';

export default function PeriodContent({ activePeriod, setActivePeriod, selectedEventId }) {
  
  // Navigation handler
  const handleNavigate = (direction) => {
    const sequence = ['overview', 'p1', 'p2', 'p3', 'mindmap'];
    const currentIndex = sequence.indexOf(activePeriod);
    
    if (direction === 'next' && currentIndex < sequence.length - 1) {
      const nextPeriod = sequence[currentIndex + 1];
      setActivePeriod(nextPeriod);
      setTimeout(() => {
        const el = document.getElementById(nextPeriod);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      }, 100);
    } else if (direction === 'prev' && currentIndex > 0) {
      const prevPeriod = sequence[currentIndex - 1];
      setActivePeriod(prevPeriod);
      setTimeout(() => {
        const el = document.getElementById(prevPeriod);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
      }, 100);
    }
  };


  const getNavigationButtons = () => {
    const sequence = ['overview', 'p1', 'p2', 'p3', 'mindmap'];
    const currentIndex = sequence.indexOf(activePeriod);
    const prevItem = currentIndex > 0 ? sequence[currentIndex - 1] : null;
    const nextItem = currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : null;

    const labels = {
      overview: "Tổng quan chương",
      p1: "Thời kỳ 1930 - 1935",
      p2: "Thời kỳ 1936 - 1939",
      p3: "Thời kỳ 1939 - 1945",
      mindmap: "Sơ đồ tư duy"
    };

    return (
      <div className="flex justify-between items-center mt-16 pt-8 border-t-2 border-museum-red/10">
        {prevItem ? (
          <button
            onClick={() => handleNavigate('prev')}
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-museum-red/20 text-museum-red hover:bg-museum-red hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base"
          >
            <ArrowLeft size={16} />
            <span>Bài trước: {labels[prevItem]}</span>
          </button>
        ) : <div />}

        {nextItem ? (
          <button
            onClick={() => handleNavigate('next')}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-museum-red text-white hover:bg-museum-redLight transition-all duration-300 font-semibold text-sm sm:text-base shadow-sm"
          >
            <span>Bài tiếp: {labels[nextItem]}</span>
            <ArrowRight size={16} />
          </button>
        ) : <div />}
      </div>
    );
  };

  // 1. RENDER OVERVIEW
  if (activePeriod === 'overview') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-12 scroll-mt-24"
        id="overview"
      >
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-museum-gold bg-museum-gold/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Bài Học Lý Luận & Thực Tiễn
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal mt-4 mb-6">
            II. Lãnh Đạo Quá Trình Đấu Tranh Giành Chính Quyền (1930–1945)
          </h2>
          <p className="text-base text-museum-charcoal/80 leading-relaxed font-sans">
            Trong suốt 15 năm (1930 - 1945), Đảng Cộng sản Đông Dương đã dẫn dắt toàn thể nhân dân Việt Nam vượt qua muôn trùng thử thách, rèn luyện qua ba cao trào cách mạng lớn để tiến tới Tổng khởi nghĩa Cách mạng Tháng Tám năm 1945, xác lập nền độc lập nước nhà.
          </p>
        </div>

        {/* 3 Phases Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {historyPeriods.map((period, index) => (
            <motion.div 
              key={period.id}
              onClick={() => {
                setActivePeriod(period.id);
                setTimeout(() => {
                  const el = document.getElementById(period.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="museum-glass rounded-xl p-6 shadow-museum hover:shadow-museum-hover transition-all duration-300 cursor-pointer text-left flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-museum-red/10 text-museum-red flex items-center justify-center font-bold text-lg mb-4">
                  0{index + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-museum-charcoal group-hover:text-museum-red transition-colors mb-2">
                  {period.title}
                </h3>
                <span className="text-xs font-semibold text-museum-gold bg-museum-gold/5 px-2 py-0.5 rounded border border-museum-gold/10">
                  {period.years}
                </span>
                <p className="text-xs text-museum-charcoal/70 mt-3 line-clamp-4 leading-relaxed">
                  {period.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-museum-red mt-6">
                Học bài này <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Figures Spotlight */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-museum-creamDark/40 border border-museum-red/10 rounded-2xl p-8 mb-16 text-left"
        >
          <div className="flex items-center gap-2 mb-6">
            <UserCheck className="text-museum-red" size={24} />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-museum-charcoal">
              Nhân vật Lịch sử Tiêu biểu (1930 - 1945)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyHistoricalFigures.map((fig, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="museum-glass p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
              >
                <ImagePlaceholder 
                  src={fig.imagePath} 
                  alt={`Chân dung ${fig.name}`} 
                  tip={`Cần dán chân dung đồng chí ${fig.name} tại: ${fig.imagePath}`}
                  aspectRatio="aspect-square w-20 h-20 rounded-full border-2 border-museum-gold mb-4" 
                />
                <h4 className="font-serif text-base font-bold text-museum-charcoal">{fig.name}</h4>
                <p className="text-xs text-museum-gold font-semibold uppercase mt-0.5">{fig.role}</p>
                <p className="text-xs text-museum-charcoal/70 mt-2.5 leading-relaxed text-left">{fig.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Board */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="museum-glass border-2 border-museum-gold rounded-2xl p-8 text-left relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-24 h-24 bg-museum-gold/10 rounded-bl-full flex items-center justify-center text-museum-gold">
            <Award size={36} />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-museum-charcoal mb-4">
            Ý nghĩa Toàn Chương (1930–1945)
          </h3>
          <p className="text-sm sm:text-base text-museum-charcoal/80 leading-relaxed font-sans max-w-4xl">
            Từ năm 1930 đến năm 1945, dưới ngọn cờ lãnh đạo cách mạng của Đảng Cộng sản Đông Dương, nhân dân ta đã kiên trì thực hiện tiến trình giải phóng dân tộc. Ba cao trào cách mạng chính là các cuộc diễn tập vĩ đại về cả <strong>đường lối, lực lượng chính trị, lực lượng vũ trang và xây dựng căn cứ địa</strong>. Nhờ đó đã mở ra thời cơ chín muồi đưa tới sự thành công rực rỡ của Cách mạng Tháng Tám, khai sinh ra nước Việt Nam độc lập và tự chủ.
          </p>
        </motion.div>

        {/* Navigation */}
        {getNavigationButtons()}
      </motion.div>
    );
  }

  // 2. RENDER DETAILED PERIODS
  const period = historyPeriods.find(p => p.id === activePeriod);
  if (!period) return null;

  return (
    <motion.div
      key={period.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-12 text-left scroll-mt-24"
      id={period.id}
    >
      {/* Title */}
      <div className="border-b-2 border-museum-gold/30 pb-6 mb-10">
        <span className="text-xs font-bold text-museum-red bg-museum-red/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
          Giai đoạn {period.years}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-museum-charcoal mt-3">
          {period.title}
        </h2>
        <p className="text-sm sm:text-base text-museum-charcoal/70 mt-2 font-sans max-w-4xl">
          {period.description}
        </p>
      </div>

      {/* Sections rendering loop */}
      <div className="space-y-16">
        {period.subSections.map((sub, idx) => {
          return (
            <motion.div 
              key={sub.id} 
              className="scroll-mt-24" 
              id={sub.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Centralized Section Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-museum-red mb-4 border-b border-museum-red/5 pb-2">
                {sub.title}
              </h3>

              {/* Centralized Image Placement Card */}
              {sub.content?.illustration && (
                <ImagePlaceholder 
                  src={sub.content.illustration.path} 
                  alt={sub.content.illustration.title}
                  tip={sub.content.illustration.tip}
                  aspectRatio="aspect-[21/9] w-full"
                  className="mb-8"
                />
              )}

              {/* 1. Layout type: Split (2-column details) */}
              {sub.layout === 'split' && (
                <>
                  {/* 1930-1931 Custom content */}
                  {sub.id === 'p1-s1' && (
                    <div className="space-y-8">
                      {/* Context Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                          <h4 className="font-serif text-base font-bold text-museum-gold uppercase tracking-wide border-b border-museum-gold/20 pb-2 mb-3">
                            Hoàn cảnh Thế giới
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-museum-charcoal/80">
                            {sub.content.context.world.map((w, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-museum-gold mt-2 shrink-0" />
                                <span>{w}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                          <h4 className="font-serif text-base font-bold text-museum-gold uppercase tracking-wide border-b border-museum-gold/20 pb-2 mb-3">
                            Hoàn cảnh Đông Dương
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-museum-charcoal/80">
                            {sub.content.context.domestic.map((d, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-museum-gold mt-2 shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Chronology & Soviet details */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Chronology timeline */}
                        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                          <h4 className="font-serif text-lg font-bold text-museum-charcoal mb-4">
                            {sub.content.chronology.title}
                          </h4>
                          <div className="relative pl-6 border-l-2 border-museum-red/20 space-y-6">
                            {sub.content.chronology.timeline.map((item, i) => (
                              <div key={i} className="relative">
                                <span className="absolute -left-[30px] top-1 w-3.5 h-3.5 rounded-full bg-museum-red border-2 border-white" />
                                <span className="text-xs font-bold text-museum-red block">
                                  {item.time}
                                </span>
                                <p className="text-xs sm:text-sm text-museum-charcoal/80 mt-1">
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Soviet Details */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                          <div className="bg-museum-creamDark/40 p-6 rounded-xl border border-museum-red/10 flex-1">
                            <h4 className="font-serif text-lg font-bold text-museum-charcoal mb-4">
                              {sub.content.soviet.title}
                            </h4>
                            <div className="space-y-4">
                              {sub.content.soviet.details.map((detail, i) => (
                                <div key={i}>
                                  <span className="text-xs font-bold text-museum-gold uppercase block">
                                    {detail.label}
                                  </span>
                                  <p className="text-xs text-museum-charcoal/80 mt-0.5">
                                    {detail.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Significance Alert */}
                      <div className="bg-red-50 border-l-4 border-museum-red p-5 rounded-r-xl">
                        <h4 className="font-serif text-base font-bold text-museum-red mb-2">
                          {sub.content.significance.title}
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-medium">
                          {sub.content.significance.points.map((p, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <CheckCircle size={16} className="text-museum-red shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* 1932-1935 Custom split content */}
                  {sub.id === 'p1-s3' && (
                    <div className="space-y-8">
                      <p className="text-sm sm:text-base text-museum-charcoal/80 leading-relaxed bg-white p-5 rounded-lg border border-museum-red/10">
                        {sub.content.intro}
                      </p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left: Prison & Figures */}
                        <div className="lg:col-span-7 space-y-6">
                          <div className="bg-museum-creamDark/60 border border-museum-red/15 rounded-xl p-6">
                            <h4 className="font-serif text-base font-bold text-museum-red uppercase tracking-wide mb-2">
                              {sub.content.prisonTitle}
                            </h4>
                            <p className="text-xs sm:text-sm text-museum-charcoal/85 leading-relaxed">
                              {sub.content.prisonDetails}
                            </p>
                          </div>

                          {/* Key figures in jail */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {sub.content.keyFigures.map((fig, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-museum-red/10 shadow-sm flex flex-col justify-between">
                                <div>
                                  <span className="text-[9px] font-bold text-museum-gold bg-museum-gold/10 px-2 py-0.5 rounded uppercase">
                                    {fig.role}
                                  </span>
                                  <h4 className="font-serif text-sm font-bold text-museum-charcoal mt-2 mb-1">{fig.name}</h4>
                                  <p className="text-[11px] italic text-museum-red font-semibold leading-snug">"{fig.quote}"</p>
                                </div>
                                <p className="text-[10px] text-museum-charcoal/70 mt-2.5 pt-2.5 border-t border-dashed border-museum-red/10 leading-relaxed">
                                  {fig.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Milestones (Chronology-like) */}
                        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                          <h4 className="font-serif text-lg font-bold text-museum-charcoal mb-4">
                            Các mốc khôi phục hệ thống tổ chức
                          </h4>
                          <div className="relative pl-6 border-l-2 border-museum-red/20 space-y-6">
                            {sub.content.milestones.map((item, i) => (
                              <div key={i} className="relative">
                                <span className="absolute -left-[30px] top-1 w-3.5 h-3.5 rounded-full bg-museum-gold border-2 border-white" />
                                <span className="text-xs font-bold text-museum-red block">
                                  {item.date}
                                </span>
                                <p className="text-xs sm:text-sm text-museum-charcoal/80 mt-1">
                                  {item.event}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1936-1939 movements content */}
                  {sub.id === 'p2-s3' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Movements list */}
                      <div className="space-y-4">
                        {sub.content.movements.map((move, i) => (
                          <div key={i} className="bg-white p-5 rounded-xl border border-museum-red/10 shadow-sm">
                            <h4 className="font-serif text-sm sm:text-base font-bold text-museum-red">
                              {move.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-museum-charcoal/80 mt-2 leading-relaxed">
                              {move.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Stats table */}
                      <div className="bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-base font-bold text-museum-charcoal border-b border-museum-red/15 pb-2 mb-4">
                            {sub.content.stats.title}
                          </h4>
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                              <tr className="border-b border-museum-red/10 text-museum-gold font-bold">
                                <th className="py-2">Tổ chức / Lực lượng</th>
                                <th className="py-2 text-right">Số lượng</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sub.content.stats.table.map((row, i) => (
                                <tr key={i} className="border-b border-museum-red/5 hover:bg-museum-cream/60 transition-colors">
                                  <td className="py-3 pr-4 font-medium text-museum-charcoal/90">{row.type}</td>
                                  <td className="py-3 text-right font-bold text-museum-red">{row.count}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="bg-museum-creamDark/40 p-4 rounded-lg text-xs text-museum-charcoal/70 border border-museum-red/5 mt-4">
                          * Nguồn số liệu chính thức ghi chép trong tài liệu lịch sử của Đảng Cộng sản Đông Dương cuối giai đoạn dân chủ 1939.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1939-1945 uprisings split content */}
                  {sub.id === 'p3-s2' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Uprisings list */}
                        <div className="space-y-4">
                          {sub.content.uprisings.map((up, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-museum-red/10 shadow-sm">
                              <h4 className="font-serif text-sm sm:text-base font-bold text-museum-red">
                                {up.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-museum-charcoal/80 mt-2 leading-relaxed">
                                {up.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Army foundation Spotlight */}
                        <div className="bg-gradient-to-br from-museum-redDark to-red-950 text-white p-6 rounded-xl border-2 border-museum-gold shadow-md flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-museum-gold bg-museum-gold/20 border border-museum-gold/30 px-2 py-0.5 rounded uppercase">
                              Cột mốc quân sự vĩ đại
                            </span>
                            <h4 className="font-serif text-lg font-bold text-white mt-3">
                              {sub.content.army.title}
                            </h4>
                            <span className="text-xs font-semibold text-museum-gold block mt-0.5">
                              Ngày thành lập: {sub.content.army.date}
                            </span>
                            <p className="text-xs sm:text-sm text-museum-cream/80 mt-3 leading-relaxed">
                              {sub.content.army.desc}
                            </p>
                          </div>
                          <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-xs">
                            <span>Chỉ huy: <strong className="text-museum-gold">{sub.content.army.leader}</strong></span>
                            <span className="italic text-museum-cream/60">34 chiến sĩ đầu tiên</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 2. Layout type: Table (e.g. Luận cương, August Revolution timeline) */}
              {sub.layout === 'table' && (
                <>
                  {/* 1930-1930 Luận cương chính trị */}
                  {sub.id === 'p1-s2' && (
                    <div className="bg-white rounded-xl border border-museum-red/10 shadow-sm overflow-hidden p-6 space-y-6">
                      <p className="text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed border-b border-museum-red/10 pb-4">
                        {sub.content.meeting}
                      </p>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead>
                            <tr className="border-b-2 border-museum-red/20 text-museum-red font-bold">
                              <th className="py-3 px-4 w-1/4">Danh mục nội dung</th>
                              <th className="py-3 px-4">Chi tiết trong Luận cương</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sub.content.thesisData.map((row, i) => (
                              <tr key={i} className="border-b border-museum-red/5 hover:bg-museum-cream/50 transition-all">
                                <td className="py-3 px-4 font-bold text-museum-gold align-top">
                                  {row.category}
                                </td>
                                <td className={`py-3 px-4 text-museum-charcoal/85 leading-relaxed ${
                                  row.category.includes("Hạn chế") 
                                    ? 'bg-amber-50/50 border-l-2 border-amber-500 rounded-r' 
                                    : ''
                                }`}>
                                  {row.detail}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3 items-start text-xs sm:text-sm text-amber-900 font-medium">
                        <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                        <p>{sub.content.note}</p>
                      </div>
                    </div>
                  )}

                  {/* 1939-1945 August Revolution timeline */}
                  {sub.id === 'p3-s4' && (
                    <div className="space-y-8">
                      <p className="text-sm sm:text-base text-museum-charcoal/80 leading-relaxed bg-white p-5 rounded-lg border border-museum-red/10">
                        {sub.content.intro}
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Chronology table */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                          <h4 className="font-serif text-base font-bold text-museum-red mb-3">
                            Diễn biến lịch sử
                          </h4>
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                              <tr className="border-b border-museum-red/15 text-museum-gold font-bold">
                                <th className="py-2">Thời gian</th>
                                <th className="py-2">Sự kiện chính</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sub.content.chronology.map((row, i) => (
                                <tr key={i} className="border-b border-museum-red/5 hover:bg-museum-cream/60 transition-colors">
                                  <td className="py-3 pr-4 font-bold text-museum-red whitespace-nowrap align-top">{row.date}</td>
                                  <td className="py-3 text-museum-charcoal/85 leading-relaxed">{row.event}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Strategic lessons table */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                          <h4 className="font-serif text-base font-bold text-museum-red mb-3">
                            Hệ thống bài học lý luận
                          </h4>
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                              <tr className="border-b border-museum-red/15 text-museum-gold font-bold">
                                <th className="py-2">Chuyên mục</th>
                                <th className="py-2">Bài học / Tổng kết</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sub.content.lessons.map((row, i) => (
                                <tr key={i} className="border-b border-museum-red/5 hover:bg-museum-cream/60 transition-colors">
                                  <td className="py-3 pr-4 font-bold text-museum-charcoal whitespace-nowrap align-top">{row.category}</td>
                                  <td className="py-3 text-museum-charcoal/85 leading-relaxed">{row.detail}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 3. Layout type: Card (e.g. Đại hội Đảng I, Chủ trương Đảng) */}
              {sub.layout === 'card' && (
                <>
                  {/* 1930-1935 Đại hội Đảng I */}
                  {sub.id === 'p1-s4' && (
                    <div className="bg-white rounded-xl border border-museum-red/10 shadow-sm overflow-hidden p-6 space-y-6">
                      <p className="text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed">
                        {sub.content.details}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sub.content.tasks.map((task, i) => (
                          <div key={i} className="p-4 rounded-lg bg-museum-creamDark/40 border border-museum-red/5 text-xs sm:text-sm">
                            <span className="font-bold text-museum-gold">Nhiệm vụ {i + 1}</span>
                            <p className="text-museum-charcoal/80 mt-1 leading-relaxed">{task}</p>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-museum-red/10">
                        <div className="bg-amber-50/50 p-5 rounded-lg border-l-4 border-amber-500">
                          <span className="font-serif font-bold text-amber-800 text-sm">Hạn chế còn tồn tại</span>
                          <p className="text-xs text-amber-900 mt-1 leading-relaxed">{sub.content.evaluation.limit}</p>
                        </div>
                        <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-600">
                          <span className="font-serif font-bold text-emerald-800 text-sm">Ý nghĩa lịch sử</span>
                          <p className="text-xs text-emerald-950 mt-1 leading-relaxed">{sub.content.evaluation.significance}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1936-1939 Chủ trương của Đảng */}
                  {sub.id === 'p2-s2' && (
                    <div className="bg-white rounded-xl border border-museum-red/10 shadow-sm overflow-hidden p-6 space-y-6">
                      <p className="text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed border-b border-museum-red/10 pb-4">
                        {sub.content.conference}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sub.content.keyPoints.map((point, i) => (
                          <div key={i} className="p-5 rounded-lg bg-museum-creamDark/40 border border-museum-red/5 text-xs sm:text-sm flex flex-col justify-between">
                            <div>
                              <span className="font-serif font-bold text-museum-red block mb-1">{point.label}</span>
                              <p className="text-museum-charcoal/85 leading-relaxed">{point.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed bg-museum-cream/50 p-4 rounded-lg border border-museum-red/5">
                        {sub.content.progress}
                      </p>
                    </div>
                  )}

                  {/* 1936-1939 Ý nghĩa lịch sử */}
                  {sub.id === 'p2-s4' && (
                    <div className="bg-white rounded-xl border border-museum-red/10 shadow-sm overflow-hidden p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sub.content.points.map((pt, i) => (
                          <div key={i} className="p-5 rounded-lg bg-red-50/50 border-l-4 border-museum-red text-xs sm:text-sm">
                            <span className="font-serif font-bold text-museum-red">Ý nghĩa chiến lược {i + 1}</span>
                            <p className="text-museum-charcoal/85 mt-2 leading-relaxed">{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 4. Layout type: Grid (e.g. Điều kiện lịch sử, Bối cảnh & Chuyển hướng chiến lược, Cao trào kháng Nhật) */}
              {sub.layout === 'grid' && (
                <>
                  {/* 1936-1939 Điều kiện lịch sử */}
                  {sub.id === 'p2-s1' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                        <h4 className="font-serif text-base font-bold text-museum-gold uppercase tracking-wide border-b border-museum-gold/20 pb-2 mb-3">
                          Tình hình Thế giới
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-museum-charcoal/80">
                          {sub.content.world.map((w, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-museum-gold mt-2 shrink-0" />
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-museum-red/10 shadow-sm">
                        <h4 className="font-serif text-base font-bold text-museum-gold uppercase tracking-wide border-b border-museum-gold/20 pb-2 mb-3">
                          Tình hình Trong nước
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-museum-charcoal/80">
                          {sub.content.domestic.map((d, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-museum-gold mt-2 shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* 1939-1945 Bối cảnh & Chuyển hướng chiến lược */}
                  {sub.id === 'p3-s1' && (
                    <div className="space-y-6">
                      <p className="text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed bg-white p-5 rounded-lg border border-museum-red/10">
                        {sub.content.context}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sub.content.conferences.map((conf, i) => (
                          <div key={i} className="bg-white p-5 rounded-xl border border-museum-red/10 shadow-sm flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-museum-red bg-museum-red/10 px-2 py-0.5 rounded uppercase">
                                {conf.location}
                              </span>
                              <h4 className="font-serif text-base font-bold text-museum-charcoal mt-2 mb-1">
                                {conf.name}
                              </h4>
                            </div>
                            <p className="text-xs text-museum-charcoal/70 mt-3 pt-3 border-t border-dashed border-museum-red/10 leading-relaxed">
                              {conf.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 1939-1945 Cao trào kháng Nhật */}
                  {sub.id === 'p3-s3' && (
                    <div className="space-y-6">
                      <p className="text-xs sm:text-sm text-museum-charcoal/80 leading-relaxed bg-white p-5 rounded-lg border border-museum-red/10">
                        {sub.content.event}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sub.content.actions.map((act, i) => (
                          <div key={i} className="bg-white p-5 rounded-xl border border-museum-red/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                              <h4 className="font-serif text-sm sm:text-base font-bold text-museum-red">
                                {act.title}
                              </h4>
                              <p className="text-xs text-museum-charcoal/70 mt-3 leading-relaxed">
                                {act.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </div>


      {/* Action navigation buttons */}
      {getNavigationButtons()}
    </motion.div>
  );
}
