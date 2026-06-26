import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Landmark, BookOpen } from 'lucide-react';
import { timelineEvents } from '../data/historyData';

export default function Navbar({ activePeriod, setActivePeriod, onSearchSelect }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const handleNavClick = (itemId) => {
    setActivePeriod(itemId);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(itemId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }
    }, 120);
  };

  // Track scrolling progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside search results dropdown to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = timelineEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.year.includes(query) ||
      event.exactDate.includes(query)
    );
    setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
  };

  const selectSearchResult = (event) => {
    onSearchSelect(event);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  const navItems = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'p1', label: '1930 - 1935' },
    { id: 'p2', label: '1936 - 1939' },
    { id: 'p3', label: '1939 - 1945' },
    { id: 'mindmap', label: 'Sơ đồ tư duy' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-museum-cream/95 backdrop-blur-md border-b-2 border-museum-red/20 shadow-museum">
      {/* Scroll Progress Bar */}
      <div 
        className="h-1 bg-gradient-to-r from-museum-red via-museum-gold to-museum-red transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('overview')}>
            <div className="bg-museum-red p-2.5 rounded-lg text-white shadow-md">
              <Landmark size={24} />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-museum-red block">
                BẢO TÀNG LỊCH SỬ
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-museum-gold block">
                Đảng Cộng Sản Việt Nam (1930-1945)
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center bg-white/80 border border-museum-red/20 rounded-full px-4 py-1.5 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activePeriod === item.id
                      ? 'bg-museum-red text-white shadow-sm'
                      : 'text-museum-charcoal/80 hover:text-museum-red hover:bg-museum-creamDark/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar & Mobile button */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm sự kiện, nhân vật..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-40 sm:w-60 pl-9 pr-4 py-2 border border-museum-red/20 rounded-full bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-museum-red/50 text-sm transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 text-museum-red/50" size={16} />
              </div>

              {/* Search Results Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-museum-red/20 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="bg-museum-cream px-4 py-2 text-xs font-semibold text-museum-gold border-b border-museum-red/10">
                    KẾT QUẢ TÌM KIẾM
                  </div>
                  <div className="divide-y divide-museum-red/5">
                    {searchResults.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => selectSearchResult(event)}
                        className="w-full text-left px-4 py-3 hover:bg-museum-cream transition-colors duration-200 block"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-museum-red bg-museum-red/10 px-2 py-0.5 rounded">
                            {event.exactDate}
                          </span>
                          <span className="text-[10px] text-museum-gold font-semibold uppercase">
                            {event.year}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-museum-charcoal mt-1 line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-xs text-museum-charcoal/70 line-clamp-2 mt-0.5">
                          {event.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-museum-red hover:bg-museum-creamDark"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-museum-cream border-b border-museum-red/20 py-4 px-6 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  activePeriod === item.id
                    ? 'bg-museum-red text-white'
                    : 'text-museum-charcoal hover:bg-museum-creamDark hover:text-museum-red'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
