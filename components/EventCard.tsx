
import React from 'react';
import type { CardData } from '../types';

interface EventCardProps {
  event: CardData;
  onViewDetails: (event: CardData) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  return (
    <button
      onClick={() => onViewDetails(event)}
      className="flex-shrink-0 w-[275px] bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-500 mr-4 snap-start last:mr-0 text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <div className="p-4 flex flex-col justify-between h-56">
        <div>
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{event.title}</h3>
          <p className="text-sm font-semibold text-gray-600 mt-1">{event.subtitle}</p>
          <div className="mt-3 text-sm text-gray-500 space-y-1">
            <p className="truncate font-medium">{event.eventDetails?.locationName}</p>
            <p className="truncate">{event.eventDetails?.address}</p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="w-full bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-lg mt-2 text-center"
        >
          View Details
        </div>
      </div>
    </button>
  );
};

export default EventCard;