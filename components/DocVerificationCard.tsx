
import React from 'react';
import type { CardData } from '../types';

interface DocVerificationCardProps {
  data: CardData;
  onClick: () => void;
}

const ActionTag: React.FC = () => (
  <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
    ACTION NEEDED
  </span>
);

const DocVerificationCard: React.FC<DocVerificationCardProps> = ({ data, onClick }) => {
  const details = data.docVerificationDetails;
  if (!details) return null;
  
  const { animalName, applicantName, submissionDate, residencyStatus, vetStatus, reviewLink } = details;

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReviewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openLink(reviewLink);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-4 border-l-4 border-yellow-500 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="p-4">
        <div className="mb-2">
          <ActionTag />
        </div>
        <div className="mb-3">
          <p className="text-xl font-bold text-black">{animalName}</p>
          <p className="text-gray-600">{applicantName} - Submitted {submissionDate}</p>
        </div>
        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p><span className="font-semibold">Residency:</span> {residencyStatus}</p>
          <p><span className="font-semibold">Vet:</span> {vetStatus}</p>
        </div>
        <div>
          <button
            onClick={handleReviewClick}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocVerificationCard;