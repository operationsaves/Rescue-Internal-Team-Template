import React from 'react';
import type { CardData } from '../types';
import { NewApplicationStatus } from '../types';

interface NewApplicationCardProps {
  data: CardData;
  onClick: () => void;
}

const NewApplicationCard: React.FC<NewApplicationCardProps> = ({ data, onClick }) => {
  const details = data.newApplicationDetails;
  if (!details) return null;

  const isActionNeeded = details.status === NewApplicationStatus.ACTION_NEEDED;
  const borderColorClass = isActionNeeded ? 'border-red-500' : 'border-green-500';

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActionNeeded) {
        window.open(details.reviewLink, '_blank');
    } else {
        onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-4 border-l-4 ${borderColorClass} p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={details.animalImageUrl} alt={details.animalName} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div className="ml-4">
            <h3 className="font-bold text-xl text-gray-900">{details.animalName}</h3>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
           <p className="text-4xl font-bold text-blue-600">{details.applicationCount}</p>
           <p className="text-sm text-gray-500 -mt-1">New Applications</p>
        </div>
      </div>
      {isActionNeeded && (
        <div className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full mt-3 inline-block">
          ACTION NEEDED
        </div>
      )}
      <div className="mt-3">
        <button
          onClick={handleActionClick}
          className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors text-sm shadow-sm ${
            isActionNeeded
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {isActionNeeded ? 'Review Submission' : 'View Applications'}
        </button>
      </div>
    </div>
  );
};

export default NewApplicationCard;