
import React from 'react';
import type { CardData } from '../types';

interface AdoptionCardProps {
  data: CardData;
  onClick: () => void;
}

const ActionNeededTag: React.FC = () => (
    <div className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
        ACTION NEEDED
    </div>
);

const CheckListItem: React.FC<{ label: string; isComplete: boolean }> = ({ label, isComplete }) => {
    const Icon = isComplete
        ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        );

    return (
        <div className="flex items-center space-x-2">
            {Icon}
            <span className={isComplete ? 'text-gray-700' : 'text-red-600'}>{label}</span>
        </div>
    );
};

const AdoptionCard: React.FC<AdoptionCardProps> = ({ data, onClick }) => {
    const details = data.adoptionDetails;
    if (!details) return null;

    const { animalName, animalType, adopterName, adoptionDate, imageUrl, paperworkScanned, agreementSent } = details;

    const isActionNeeded = !paperworkScanned;

    const adoptionDateObj = new Date(adoptionDate);
    const daysAgo = Math.round((Date.now() - adoptionDateObj.getTime()) / (1000 * 60 * 60 * 24));
    
    const borderColorClass = isActionNeeded ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500';

    const handleScanPaperwork = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            // This is a placeholder for actual camera interaction.
            // In a real app, this would involve using the camera API.
            alert('Opening camera to scan paperwork...');
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Close the stream immediately for this demo
            stream.getTracks().forEach(track => track.stop());
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Camera access was denied. Please enable it in your browser settings.");
        }
    };

    return (
        <div 
            onClick={onClick}
            className={`flex-shrink-0 w-[275px] bg-white rounded-xl shadow-lg overflow-hidden mr-4 snap-start last:mr-0 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${borderColorClass} cursor-pointer`}
        >
            <img src={imageUrl} alt={animalName} className="w-full h-32 object-cover" />
            <div className="p-4 flex-grow flex flex-col">
                {isActionNeeded && <ActionNeededTag />}
                <p className="font-bold text-lg text-black">{animalName} ({animalType})</p>
                <p className="text-gray-700">{`Adopted by ${adopterName}`}</p>
                <p className="text-sm text-gray-500 mb-3">{`(${daysAgo} days ago)`}</p>

                <div className="space-y-2 mb-4">
                    <CheckListItem label="Paperwork scanned" isComplete={paperworkScanned} />
                    <CheckListItem label="Agreement & records sent" isComplete={agreementSent} />
                </div>
                
                <div className="flex-grow"></div>
                
                {isActionNeeded && (
                    <button
                        onClick={handleScanPaperwork}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Scan in paperwork
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdoptionCard;
