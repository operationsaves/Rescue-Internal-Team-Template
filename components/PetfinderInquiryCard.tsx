import React from 'react';
import type { CardData } from '../types';

interface PetfinderInquiryCardProps {
  data: CardData;
  onClick: () => void;
}

const PetfinderInquiryCard: React.FC<PetfinderInquiryCardProps> = ({ data, onClick }) => {
  const details = data.petfinderInquiryDetails;
  if (!details) return null;

  return (
    <div 
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-4 border-l-4 border-purple-500 p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={details.animalImageUrl} alt={details.animalName} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div className="ml-4">
            <h3 className="font-bold text-xl text-gray-900">{details.animalName}</h3>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
           <p className="text-4xl font-bold text-purple-600">{details.inquiryCount}</p>
           <p className="text-sm text-gray-500 -mt-1">New Inquiries</p>
        </div>
      </div>
      <div className="mt-3">
        <button
          onClick={onClick}
          className='w-full font-semibold py-2 px-4 rounded-lg transition-colors text-sm shadow-sm bg-purple-100 text-purple-800 hover:bg-purple-200'
        >
          View Inquiries
        </button>
      </div>
    </div>
  );
};

export default PetfinderInquiryCard;
