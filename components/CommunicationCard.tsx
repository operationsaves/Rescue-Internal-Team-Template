
import React from 'react';
import type { CardData } from '../types';
import { CommunicationType, CommunicationStatus } from '../types';

const ActionNeededTag: React.FC = () => (
    <div className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
        ACTION NEEDED
    </div>
);

interface CommunicationCardProps {
    data: CardData;
    onClick: () => void;
}

const CommunicationCard: React.FC<CommunicationCardProps> = ({ data, onClick }) => {
    const details = data.communicationDetails;
    if (!details) return null;

    const { type, status, from, summary, urgentText, aiAnalysis } = details;

    let borderColorClass = '';
    if (type === CommunicationType.Call) {
        if (status === CommunicationStatus.Info || status === CommunicationStatus.Resolved) {
            borderColorClass = 'border-l-4 border-green-500';
        } else if (status === CommunicationStatus.ActionNeeded) {
            borderColorClass = 'border-l-4 border-red-500';
        } else if (status === CommunicationStatus.Urgent) {
            borderColorClass = 'border-4 border-red-500';
        }
    } else { // Text
        if (status === CommunicationStatus.Resolved) {
            borderColorClass = 'border-l-4 border-blue-500';
        } else if (status === CommunicationStatus.ActionNeeded) {
            borderColorClass = 'border-l-4 border-yellow-500';
        } else if (status === CommunicationStatus.Urgent) {
            borderColorClass = 'border-l-4 border-red-500';
        }
    }
    
    const needsAction = status === CommunicationStatus.ActionNeeded || status === CommunicationStatus.Urgent;
    
    const handleActionClick = (e: React.MouseEvent, action: 'call' | 'text' | 'complete') => {
        e.stopPropagation();
        const phoneNumber = from.replace(/\D/g, '');
        if (action === 'call') {
            window.open(`tel:${phoneNumber}`);
        } else if (action === 'text') {
            window.open(`sms:${phoneNumber}`);
        } else if (action === 'complete') {
            alert('Marked as complete!');
        }
    };

    let titleText = type === CommunicationType.Call ? `Call from ${from}` : `Text from ${from}`;
    if(data.title.startsWith('Voicemail')) {
        titleText = `Voicemail from ${from}`
    }

    return (
        <div 
            onClick={onClick}
            className={`flex-shrink-0 w-[300px] h-full bg-white rounded-xl shadow-md overflow-hidden mr-4 snap-start last:mr-0 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${borderColorClass}`}
        >
            <div className="p-4 flex-grow flex flex-col">
                {needsAction && <ActionNeededTag />}
                <p className="font-bold text-gray-900">{titleText}</p>
                
                {urgentText && (
                    <p className="mt-2 text-gray-800"><span className="font-bold text-red-600">URGENT:</span> {urgentText}</p>
                )}
                
                {summary && <p className="mt-2 text-gray-700 line-clamp-2">{summary}</p>}

                <div className="flex-grow"></div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500 italic">
                        <span className="font-semibold not-italic text-gray-600">AI analysis:</span> {aiAnalysis}
                    </p>
                </div>
            </div>
            {needsAction && (
                 <div className="bg-gray-50 p-2 flex gap-2 justify-end">
                    {status === CommunicationStatus.Urgent && (
                        <button 
                            onClick={(e) => handleActionClick(e, 'complete')}
                            className="flex-1 text-sm bg-gray-200 text-gray-800 font-bold py-2 px-3 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            Mark as complete
                        </button>
                    )}
                     <button 
                        onClick={(e) => handleActionClick(e, 'call')}
                        className="flex-1 text-sm bg-green-500 text-white font-bold py-2 px-3 rounded-md hover:bg-green-600 transition-colors">Call</button>
                     <button 
                        onClick={(e) => handleActionClick(e, 'text')}
                        className="flex-1 text-sm bg-blue-500 text-white font-bold py-2 px-3 rounded-md hover:bg-blue-600 transition-colors">Text</button>
                </div>
            )}
        </div>
    );
};

export default CommunicationCard;