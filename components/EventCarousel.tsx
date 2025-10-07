
import React, { useState, useRef, useEffect } from 'react';
import type { CardData } from '../types';
import EventCard from './EventCard';

interface EventCarouselProps {
  events: CardData[];
  onViewDetails: (event: CardData) => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events, onViewDetails }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 275; // from EventCard
      const spacing = 16; // Corresponds to mr-4 on EventCard
      const index = Math.round(scrollLeft / (cardWidth + spacing));
      setActiveIndex(index);
    }
  };
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const cardWidth = 275; // from EventCard
        const scrollAmount = cardWidth + 16; // mr-4
        scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) {
      // Use a timeout to ensure rendering is complete before attaching listener
      const timer = setTimeout(() => {
        scroller.addEventListener('scroll', handleScroll, { passive: true });
      }, 100);
      return () => {
        clearTimeout(timer);
        scroller.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -ml-4 pl-4"
      >
        {events.map(event => (
          <EventCard key={event.id} event={event} onViewDetails={onViewDetails} />
        ))}
      </div>
      
       {events.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white hidden md:block"
            aria-label="Previous event"
            style={{ transform: 'translate(-50%, -100%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white hidden md:block"
            aria-label="Next event"
            style={{ transform: 'translate(50%, -100%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="flex justify-center my-4 space-x-2">
        {events.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <a
        href="https://form.jotform.com/252710762458056"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
      >
        Add New Event
      </a>
    </div>
  );
};

export default EventCarousel;