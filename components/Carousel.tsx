
import React, { useState, useRef, useEffect } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  activeIndicatorColor?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, activeIndicatorColor = 'bg-red-500' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const card = scrollRef.current.querySelector(':scope > div');
      if (card) {
        const cardWidth = card.clientWidth;
        const spacing = 16; // Corresponds to mr-4 on child items
        const index = Math.round(scrollLeft / (cardWidth + spacing));
        setActiveIndex(index);
      }
    }
  };
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(':scope > div');
      if (card) {
        const cardWidth = card.clientWidth;
        const scrollAmount = cardWidth + 16; // 16 for mr-4
        scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) {
      const timer = setTimeout(() => {
        scroller.addEventListener('scroll', handleScroll, { passive: true });
      }, 100);
      return () => {
        clearTimeout(timer);
        scroller.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  if (childrenArray.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -ml-4 pl-4"
      >
        {children}
      </div>
      
      {childrenArray.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white hidden md:block"
            aria-label="Previous item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white hidden md:block"
            aria-label="Next item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-2 space-x-2">
            {childrenArray.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${activeIndex === index ? activeIndicatorColor : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
