import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import PeriodContent from './components/PeriodContent';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import AIChatBox from './components/AIChatBox';

// Mapping from timeline event ID to period subSection ID for smart scrolling
const eventToSubSectionMap = {
  e1: 'p1-s1', 
  e2: 'p1-s1',
  e3: 'p1-s2',
  e4: 'p1-s3', 
  e5: 'p1-s3',
  e6: 'p1-s4',
  e7: 'p2-s1',
  e8: 'p2-s2',
  e9: 'p2-s3', 
  e10: 'p2-s2',
  e11: 'p3-s1', 
  e12: 'p3-s1', 
  e13: 'p3-s1', 
  e14: 'p3-s1', 
  e15: 'p3-s1',
  e16: 'p3-s2',
  e17: 'p3-s3',
  e18: 'p3-s4', 
  e19: 'p3-s4', 
  e20: 'p3-s4'
};

export default function App() {
  const [activePeriod, setActivePeriod] = useState(() => {
    return localStorage.getItem('vnr_active_period') || 'overview';
  });
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Scroll Progress Hook for top page bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync activePeriod to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vnr_active_period', activePeriod);
  }, [activePeriod]);


  // When user clicks a search result in the Navbar
  const handleSearchSelect = (event) => {
    setActivePeriod(event.periodId);
    setSelectedEventId(event.id);

    // Scroll to the specific sub-section
    const targetSubSectionId = eventToSubSectionMap[event.id];
    if (targetSubSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSubSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const handleHeroStart = (targetPeriod) => {
    setActivePeriod(targetPeriod);
    setTimeout(() => {
      const el = document.getElementById(targetPeriod);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If overview
        window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-museum-cream flex flex-col font-sans selection:bg-museum-gold selection:text-white relative overflow-hidden parchment-overlay">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-museum-gold z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* Rotating Bronze Drum Motif (Decor Background) */}
      <div className="fixed right-[-15%] bottom-[-10%] w-[550px] h-[550px] opacity-[0.035] text-museum-red pointer-events-none z-0 select-none animate-spin-very-slow hidden lg:block">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2"/>
          <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.6"/>
          <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1,1"/>
          <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="0.4"/>
          <polygon points="50,38 48,44 42,42 46,47 40,50 46,53 42,58 48,56 50,62 52,56 58,58 54,53 60,50 54,47 58,42 52,44" />
        </svg>
      </div>

      <div className="fixed left-[-10%] top-[15%] w-[400px] h-[400px] opacity-[0.025] text-museum-red pointer-events-none z-0 select-none animate-spin-very-slow hidden lg:block" style={{ animationDirection: 'reverse' }}>
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <polygon points="50,38 48,44 42,42 46,47 40,50 46,53 42,58 48,56 50,62 52,56 58,58 54,53 60,50 54,47 58,42 52,44" />
        </svg>
      </div>

      {/* Floating Historical Dust Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-[15%] left-[8%] w-2.5 h-2.5 rounded-full bg-museum-gold/30 blur-[1px] animate-float-slow" />
        <div className="absolute top-[65%] left-[82%] w-3.5 h-3.5 rounded-full bg-museum-red/25 blur-[2px] animate-float-medium" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[80%] left-[20%] w-2 h-2 rounded-full bg-museum-gold/40 blur-[1px] animate-float-slow" style={{ animationDelay: '5s' }} />
        <div className="absolute top-[35%] left-[75%] w-3 h-3 rounded-full bg-museum-gold/25 blur-[1.5px] animate-float-medium" style={{ animationDelay: '8s' }} />
      </div>

      {/* Sticky Navigation Bar */}
      <Navbar 
        activePeriod={activePeriod} 
        setActivePeriod={setActivePeriod} 
        onSearchSelect={handleSearchSelect}
      />

      {/* Hero Banner Section */}
      <Hero onStartClick={handleHeroStart} />

      {/* Interactive Timeline Section (renders everywhere except directly inside the active quiz view for clean focus, but keeping it visible is great for context) */}
      {activePeriod !== 'quiz' && (
        <Timeline 
          activePeriod={activePeriod} 
          setActivePeriod={setActivePeriod} 
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {activePeriod === 'quiz' ? (
          <Quiz />
        ) : (
          <PeriodContent 
            activePeriod={activePeriod} 
            setActivePeriod={setActivePeriod}
            selectedEventId={selectedEventId}
          />
        )}
      </main>

      {/* AI Chat Box */}
      <AIChatBox />

      {/* Footer */}
      <Footer setActivePeriod={setActivePeriod} />
    </div>
  );
}

