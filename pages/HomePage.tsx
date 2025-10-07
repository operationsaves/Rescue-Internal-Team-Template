
import React, { useState, useEffect, useCallback } from 'react';
import type { Page, CardData } from '../types';
import { fetchWorkflowData } from '../services/mockApiService';
import ActionableCard from '../components/ActionableCard';
import { NewApplicationStatus, VetAppointmentStatus, CommunicationStatus, EmailStatus } from '../types';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const AIQuickAssist: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const suggestions = [
    'List new animals',
    'Show upcoming events',
    'Check pending applications',
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Quick Assist</h2>
      
      <div className="relative mb-5">
        <input
          type="text"
          placeholder="✨ What can I help you with? ✨"
          className="w-full bg-white rounded-full py-3 px-5 text-center text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map(text => (
          <button 
            key={text}
            onClick={() => setCurrentPage('chat')}
            className="bg-blue-100/70 text-blue-800 font-semibold py-2 px-5 rounded-full hover:bg-blue-200 transition-colors duration-200"
          >
            {text}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-6">
        For more detailed questions, please use the dedicated {' '}
        <button 
          onClick={() => setCurrentPage('chat')} 
          className="text-blue-600 hover:underline font-semibold"
        >
          AI Chat page
        </button>.
      </p>
    </div>
  );
};

const getActionPriority = (card: CardData): number => {
    if (card.vetAppointmentDetails?.status === VetAppointmentStatus.Unscheduled) return 1;
    if (card.vetAppointmentDetails?.status === VetAppointmentStatus.NeedsTransport) return 2;
    if (card.docVerificationDetails) return 3;
    if (card.communicationDetails?.status === CommunicationStatus.Urgent) return 4;
    if (card.emailDetails?.status === EmailStatus.Urgent) return 5;
    if (card.adoptionDetails && !card.adoptionDetails.paperworkScanned) return 6;
    if (card.newAnimalDetails) {
        const isActionNeeded = Object.values(card.newAnimalDetails.compatibility).some(v => v === null) || Object.values(card.newAnimalDetails.idealHousehold).some(v => v === null);
        if (isActionNeeded) return 7;
    }
    if (card.newApplicationDetails?.status === NewApplicationStatus.ACTION_NEEDED) return 8;
    return 99;
};

const isActionable = (card: CardData): boolean => {
    if (card.vetAppointmentDetails?.status === VetAppointmentStatus.Unscheduled) return true;
    if (card.vetAppointmentDetails?.status === VetAppointmentStatus.NeedsTransport) return true;
    if (card.docVerificationDetails) return true;
    if (card.communicationDetails?.status === CommunicationStatus.Urgent) return true;
    if (card.emailDetails?.status === EmailStatus.Urgent) return true;
    if (card.adoptionDetails && !card.adoptionDetails.paperworkScanned) return true;
    if (card.newAnimalDetails) {
        const isActionNeeded = Object.values(card.newAnimalDetails.compatibility).some(v => v === null) || Object.values(card.newAnimalDetails.idealHousehold).some(v => v === null);
        if (isActionNeeded) return true;
    }
    if (card.newApplicationDetails?.status === NewApplicationStatus.ACTION_NEEDED) return true;
    return false;
};


const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const [actionableCards, setActionableCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActions = useCallback(async () => {
    setLoading(true);
    const allCards = await fetchWorkflowData();
    const filtered = allCards.filter(isActionable);
    const sorted = filtered.sort((a,b) => getActionPriority(a) - getActionPriority(b));
    setActionableCards(sorted);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadActions();
  }, [loadActions]);

  return (
    <div>
      <AIQuickAssist setCurrentPage={setCurrentPage} />
      <h2 className="text-2xl font-bold text-gray-800 text-center my-6">
        Actions Needed
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading actions...</div>
      ) : actionableCards.length > 0 ? (
        <div className="space-y-4">
          {actionableCards.map(card => <ActionableCard key={card.id} data={card} />)}
        </div>
      ) : (
        <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <p className="text-xl font-semibold text-gray-700">You're all caught up!</p>
          <p className="text-gray-500 mt-2 mb-4">There are no new items that require your immediate attention.</p>
          <button
            onClick={loadActions}
            className="bg-blue-500 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow"
          >
            Refresh Submissions
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
