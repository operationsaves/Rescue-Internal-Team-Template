
import React from 'react';
import type { CardData } from '../types';
import { VetAppointmentStatus } from '../types';

interface VetAppointmentCardProps {
  data: CardData;
  onClick: () => void;
}

const ActionTag: React.FC = () => (
  <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full absolute top-4 left-4">
    ACTION NEEDED
  </span>
);

const TransportInfo: React.FC<{ label: string; time: string | null; person: string | null }> = ({ label, time, person }) => {
  return (
    <div className="text-sm">
      <span className="font-semibold text-gray-700">{label}:</span>{' '}
      <span className="text-gray-600">{time ?? 'N/A'} by </span>
      {person ? (
        <span className="font-semibold text-gray-800">{person}</span>
      ) : (
        <span className="font-semibold text-red-600">Volunteer Needed</span>
      )}
    </div>
  );
};

const VetAppointmentCard: React.FC<VetAppointmentCardProps> = ({ data, onClick }) => {
  const details = data.vetAppointmentDetails;
  if (!details) return null;

  const { status, animalName, service, clinicName, clinicAddress, date, dropOffTime, dropOffBy, pickUpTime, pickUpBy, scheduleLink, signUpLink } = details;

  const needsAction = status === VetAppointmentStatus.Unscheduled || status === VetAppointmentStatus.NeedsTransport;

  let borderColorClass = '';
  if (status === VetAppointmentStatus.Unscheduled) {
    borderColorClass = 'border-4 border-red-400';
  } else if (status === VetAppointmentStatus.NeedsTransport) {
    borderColorClass = 'border-l-4 border-red-400';
  } else if (status === VetAppointmentStatus.FullyStaffed) {
    borderColorClass = 'border-l-4 border-green-500';
  }
  
  const openLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  
  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, url?: string) => {
    e.stopPropagation(); // Prevent modal from opening when clicking action button
    openLink(url);
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-4 relative ${borderColorClass} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
    >
      <div className="p-4">
        {needsAction && <ActionTag />}
        <div className={`flex justify-between items-start ${needsAction ? 'pt-8' : ''}`}>
          <div>
            <p className="text-xl leading-tight font-bold text-black">{animalName}</p>
            <p className="text-gray-600">{service}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-800">{date}</p>
            {status === VetAppointmentStatus.Unscheduled && <p className="text-red-600 font-semibold">Needs Scheduling</p>}
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
          <div>
            <p className="font-bold text-gray-800">{clinicName}</p>
            <p className="text-sm text-gray-500">{clinicAddress}</p>
          </div>
          <div className="space-y-1 pt-2">
            <TransportInfo label="Drop-off" time={dropOffTime} person={dropOffBy} />
            <TransportInfo label="Pick-up" time={pickUpTime} person={pickUpBy} />
          </div>
        </div>

        {status === VetAppointmentStatus.Unscheduled && (
          <div className="mt-4">
            <button 
              onClick={(e) => handleActionClick(e, scheduleLink)}
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Schedule
            </button>
          </div>
        )}

        {status === VetAppointmentStatus.NeedsTransport && (
          <div className="mt-4 flex gap-2">
            {dropOffBy === null && (
              <button 
                onClick={(e) => handleActionClick(e, signUpLink)}
                className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Sign up to drop off
              </button>
            )}
            {pickUpBy === null && (
              <button 
                onClick={(e) => handleActionClick(e, signUpLink)}
                className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Sign up to pick up
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VetAppointmentCard;