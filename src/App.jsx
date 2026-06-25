import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-museum-cream flex flex-col font-sans selection:bg-museum-gold selection:text-white">
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

