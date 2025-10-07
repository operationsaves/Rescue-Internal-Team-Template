
import React from 'react';
import type { CardData } from '../types';
import { Urgency } from '../types';

interface CardProps {
  data: CardData;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ data, onClick }) => {
  const urgencyClasses = {
    [Urgency.High]: 'border-red-500 bg-red-50',
    [Urgency.Medium]: 'border-yellow-500 bg-yellow-50',
    [Urgency.Low]: 'border-blue-500 bg-blue-50',
    [Urgency.Info]: 'border-gray-400 bg-gray-50',
  };

  const tagClasses = {
    [Urgency.High]: 'bg-red-100 text-red-800',
    [Urgency.Medium]: 'bg-yellow-100 text-yellow-800',
    [Urgency.Low]: 'bg-blue-100 text-blue-800',
    [Urgency.Info]: 'bg-gray-100 text-gray-800',
  };

  const hasActionButton = data.tags.includes('Action Needed');

  return (
    <div
      onClick={onClick}
      className={`bg-white/60 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-4 border-l-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${urgencyClasses[data.urgency]}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{data.category}</div>
            <p className="block mt-1 text-lg leading-tight font-bold text-black">{data.title}</p>
            <p className="mt-1 text-gray-600">{data.subtitle}</p>
          </div>
          {hasActionButton && (
            <button className="bg-blue-500 text-white font-bold py-1 px-3 rounded-full text-sm shadow-lg hover:bg-blue-600 transition-colors">
              Action
            </button>
          )}
        </div>
        <p className="mt-3 text-gray-700">{data.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags.map(tag => (
            <span key={tag} className={`px-2 py-1 text-xs font-semibold rounded-full ${tagClasses[data.urgency]}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
