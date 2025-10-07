
import React from 'react';
import type { CardData } from '../types';
import { EmailStatus } from '../types';

interface EmailCardProps {
  data: CardData;
  onClick: () => void;
}

const ActionNeededTag: React.FC = () => (
    <div className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
        ACTION NEEDED
    </div>
);

const EmailCard: React.FC<EmailCardProps> = ({ data, onClick }) => {
  const details = data.emailDetails;
  if (!details) return null;

  const isUrgent = details.status === EmailStatus.Urgent;

  const borderClasses = isUrgent
    ? "p-0.5 bg-red-500"
    // This conic gradient creates the 4-color border effect: Red (top-right), Blue (bottom-right), Green (bottom-left), Yellow (top-left)
    : "p-0.5 bg-[conic-gradient(at_50%_50%,#F87171_0deg_90deg,#60A5FA_90deg_180deg,#34D399_180deg_270deg,#FBBF24_270deg_360deg)]";

  return (
    <div 
      onClick={onClick}
      className={`mb-4 rounded-xl ${borderClasses} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
    >
      <div className="rounded-[10px] bg-white p-4 flex flex-col justify-between min-h-[160px]">
        <div>
          {isUrgent && <ActionNeededTag />}
          <p className="text-lg font-bold text-black">Email from {details.sender}</p>
          <p className="mt-1 text-gray-700">
            Subject: {details.subject}
          </p>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <div className="w-px h-4 bg-gray-300 mr-3"></div>
            <span>{details.aiAction}</span>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={onClick}
            className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            View Thread
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;