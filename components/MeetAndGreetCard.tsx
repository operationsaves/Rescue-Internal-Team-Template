import React from 'react';
import type { CardData, FollowUpItem } from '../types';
import { MeetAndGreetType, Urgency, FollowUpStatus } from '../types';

const SentIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect width="24" height="24" rx="6" fill="#4CAF50"/>
    <path d="M8 12.5L11 15.5L16.5 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScheduledIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="12" fill="#4CAF50"/>
  </svg>
);

const FollowUpItemDisplay: React.FC<{ item: FollowUpItem }> = ({ item }) => {
  const statusText = item.status === FollowUpStatus.Sent ? '(sent)' : '(scheduled)';
  return (
    <div className="flex items-center space-x-3">
      {item.status === FollowUpStatus.Sent ? <SentIcon /> : <ScheduledIcon />}
      <span className="text-gray-800">{`${item.title} ${statusText}`}</span>
    </div>
  );
};

interface MeetAndGreetCardProps {
  data: CardData;
  onClick: () => void;
}

const MeetAndGreetCard: React.FC<MeetAndGreetCardProps> = ({ data, onClick }) => {
  const details = data.meetAndGreetDetails;
  if (!details) return null;

  const baseClasses = "bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]";

  const borderColorClass = {
    [Urgency.Medium]: 'border-l-4 border-yellow-500',
    [Urgency.Low]: 'border-l-4 border-green-500',
    [Urgency.High]: 'border-l-4 border-red-500',
    [Urgency.Info]: 'border-l-4 border-gray-400'
  }[data.urgency] || 'border-l-4 border-gray-400';

  if (details.type === MeetAndGreetType.MeetAndGreet) {
    return (
      <div onClick={onClick} className={`${baseClasses} ${borderColorClass}`}>
        <div className="p-4">
          <p className="text-xl font-bold text-black">{details.familyName} & {details.animalName}</p>
          <p className="text-2xl font-bold text-gray-800 my-2">{details.dateTime}</p>
          <p className="text-gray-600">{details.statusText}</p>
        </div>
      </div>
    );
  }

  if (details.type === MeetAndGreetType.FollowUp) {
    return (
      <div onClick={onClick} className={`${baseClasses} ${borderColorClass}`}>
        <div className="p-4">
          <p className="text-xl font-bold text-black">{details.familyName} & {details.animalName}</p>
          <p className="text-gray-700 font-medium mt-1">{details.statusText}</p>
          <p className="text-sm text-gray-500 border-l-2 border-gray-300 pl-2 ml-1 my-2">{details.timelineText}</p>
          <div className="mt-4 space-y-2">
            {details.followUpItems?.map((item, index) => (
              <FollowUpItemDisplay key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MeetAndGreetCard;
