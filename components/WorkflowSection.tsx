import React, { useState } from 'react';

interface WorkflowSectionProps {
  icon: string;
  title: string;
  subtitle: string;
  actionableCount: number;
  nonActionableCount: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isEventSection?: boolean;
}

const NotificationBubble: React.FC<{ count: number; color: 'red' | 'green' }> = ({ count, color }) => {
  if (count === 0) return null;

  const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
  };

  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${colorClasses[color]}`}>
      {count}
    </div>
  );
};

const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  icon,
  title,
  subtitle,
  actionableCount,
  nonActionableCount,
  children,
  defaultOpen = false,
  isEventSection = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg mb-4 transition-transform transition-shadow duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className={isOpen ? `sticky top-16 z-[5] rounded-t-xl` : `rounded-xl`}>
        <div
          className={`w-full ${isOpen ? 'bg-white/80 backdrop-blur-lg shadow-md rounded-t-xl' : 'rounded-xl'}`}
        >
          <button
            className="w-full flex items-center p-4 text-left"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={`section-content-${title}`}
          >
            <span className="text-3xl mr-4">{icon}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-800 truncate">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              <NotificationBubble count={actionableCount} color="red" />
              <NotificationBubble count={nonActionableCount} color="green" />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-gray-500 transition-transform duration-300 ml-4 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div id={`section-content-${title}`} className={isEventSection ? "p-4 pt-20" : "p-4"}>
          {children}
        </div>
      )}
    </div>
  );
};

export default WorkflowSection;