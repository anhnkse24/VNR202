import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { timelineEvents } from '../data/historyData';

export default function Timeline({ activePeriod, setActivePeriod, selectedEventId, setSelectedEventId }) {
  const containerRef = useRef(null);

  // Filter events based on active period, or show all but highlight active
  const filteredEvents = timelineEvents;

  // Scroll desktop timeline horizontally
  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 340;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to active event in horizontal timeline
  useEffect(() => {
    if (selectedEventId && containerRef.current) {
      const activeEl = containerRef.current.querySelector(`#timeline-node-${selectedEventId}`);
      if (activeEl) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const activeOffset = activeEl.offsetLeft;
        const activeWidth = activeEl.offsetWidth;

        container.scrollTo({
          left: activeOffset - (containerWidth / 2) + (activeWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [selectedEventId]);

  const handleNodeClick = (event) => {
    setSelectedEventId(event.id);
    setActivePeriod(event.periodId);
    
    // Jump to the detailed section in the page
    const detailEl = document.getElementById(event.periodId);
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const periodLabels = {
    p1: { label: "1930 - 1935", bg: "bg-red-50 text-museum-red border-museum-red/30" },
    p2: { label: "1936 - 1939", bg: "bg-amber-50 text-museum-gold border-museum-gold/30" },
    p3: { label: "1939 - 1945", bg: "bg-rose-50 text-rose-950 border-rose-900/30" }
  };

  return (
    <div className="py-12 bg-white border-b border-museum-red/10 shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between border-b border-museum-red/10 pb-5 mb-8">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-museum-charcoal flex items-center gap-2">
              <Calendar className="text-museum-red animate-pulse" size={28} />
              Trục Thời Gian Lịch Sử Tương Tác
            </h2>
            <p className="text-sm text-museum-charcoal/70 mt-1">
              Nhấp vào các cột mốc để chuyển nhanh đến các bài học và tư liệu chi tiết.
            </p>
            {activePeriod && (
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-museum-gold/10 border border-museum-gold/20 text-museum-gold text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-museum-gold animate-pulse" />
                  Giai đoạn {periodLabels[activePeriod]?.label}
                </span>
              </div>
            )}
          </div>

          {/* Desktop scroll buttons */}
          <div className="hidden md:flex gap-3 mb-1">
            <button 
              onClick={() => scroll('left')}
              className="p-2.5 border border-museum-red/20 rounded-full hover:bg-museum-cream hover:text-museum-red transition-all shadow-sm active:scale-95 duration-100 bg-white"
              aria-label="Cuộn trái"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2.5 border border-museum-red/20 rounded-full hover:bg-museum-cream hover:text-museum-red transition-all shadow-sm active:scale-95 duration-100 bg-white"
              aria-label="Cuộn phải"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 1. DESKTOP VIEW: Horizontal Scrollable Timeline */}
        <div className="hidden md:block relative">
          {/* Main timeline axis line (refined to 2px thickness) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-[104px] left-0 right-0 h-[2px] timeline-gradient z-0 origin-left" 
          />

          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto py-8 px-4 no-scrollbar scroll-smooth z-10 relative"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {filteredEvents.map((event, index) => {
              const isActive = selectedEventId === event.id || (activePeriod === event.periodId && !selectedEventId && index === 0);

              return (
                <motion.div
                  key={event.id}
                  id={`timeline-node-${event.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex-shrink-0 w-80 scroll-snap-align-start relative flex flex-col"
                >
                  {/* Top section: Date & Point */}
                  <div className="flex flex-col items-center mb-6 relative">
                    
                    {/* Date above the main line */}
                    <div className="h-10 flex items-center justify-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all duration-300 ${
                        isActive 
                          ? 'bg-museum-gold/10 text-museum-gold border-museum-gold/30 shadow-sm' 
                          : 'bg-museum-cream text-museum-charcoal/60 border-museum-red/10'
                      }`}>
                        {event.exactDate}
                      </span>
                    </div>

                    {/* Spacer to align dot perfectly on line */}
                    <div className="h-4" />
                    
                    {/* Ring for active item - smooth sliding effect using layoutId */}
                    <div className="relative flex items-center justify-center h-8 w-8 z-10">
                      {isActive && (
                        <motion.div 
                          layoutId="activeTimelinePill"
                          className="absolute inset-[-4px] rounded-full bg-museum-gold/15 border-2 border-museum-gold/30 z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <button
                        onClick={() => handleNodeClick(event)}
                        className={`w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all duration-300 z-10 ${
                          isActive 
                            ? 'bg-museum-gold border-museum-red scale-110 shadow-md' 
                            : 'bg-white border-museum-red/40 hover:border-museum-red hover:scale-105'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-museum-red/40'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Standardized Event card with fixed height (h-48) and improved padding (p-6) */}
                  <motion.div 
                    onClick={() => handleNodeClick(event)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`p-6 rounded-xl border text-left cursor-pointer transition-all duration-300 h-48 flex flex-col justify-between group ${
                      isActive 
                        ? 'bg-white border-museum-gold shadow-museum-hover' 
                        : 'bg-museum-creamDark/40 border-museum-red/10 hover:border-museum-red/30 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col justify-start h-full">
                      <span className="text-[10px] font-bold text-museum-gold uppercase tracking-wider block mb-1">
                        Cột mốc {index + 1}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-museum-charcoal line-clamp-2 group-hover:text-museum-red transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs text-museum-charcoal/70 mt-2 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-museum-red mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
                      <span>Xem tư liệu học</span>
                      <ArrowRight size={12} className="animate-[bounce_1.5s_infinite]" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. MOBILE VIEW: Vertical Timeline */}
        <div className="md:hidden relative pl-6 py-4 text-left">
          {/* Vertical axis line (2px thickness) */}
          <div className="absolute top-0 bottom-0 left-2.5 w-[2px] bg-museum-red/20 z-0" />

          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const isActive = selectedEventId === event.id;

              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Bullet */}
                  <button
                    onClick={() => handleNodeClick(event)}
                    className={`absolute -left-5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                      isActive
                        ? 'bg-museum-gold border-museum-red ring-2 ring-museum-gold/20 scale-110'
                        : 'bg-white border-museum-red/40'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-museum-red/40'}`} />
                  </button>

                  {/* Mobile Content */}
                  <div className="pl-4">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-[10px] font-bold text-museum-red bg-museum-red/10 px-2.5 py-0.5 rounded-full">
                        {event.exactDate}
                      </span>
                    </div>

                    <motion.div 
                      onClick={() => handleNodeClick(event)}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 rounded-xl border mt-1 cursor-pointer transition-all ${
                        isActive
                          ? 'bg-white border-museum-gold shadow-md'
                          : 'bg-museum-creamDark/30 border-museum-red/10 hover:border-museum-red/30'
                      }`}
                    >
                      <span className="text-[9px] font-bold text-museum-gold uppercase tracking-wider block mb-1">
                        Cột mốc {index + 1}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-museum-charcoal">
                        {event.title}
                      </h4>
                      <p className="text-xs text-museum-charcoal/70 mt-2 leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
