
import React from 'react';
import type { CardData } from '../types';

interface NewAnimalCardProps {
  data: CardData;
  onClick: () => void;
}

const ActionNeededTag: React.FC = () => (
    <div className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
        ACTION NEEDED
    </div>
);

const NewAnimalCard: React.FC<NewAnimalCardProps> = ({ data, onClick }) => {
    const details = data.newAnimalDetails;
    if (!details) return null;

    const { name, breed, age, intakeDate, images, jotformLink } = details;

    const isActionNeeded = Object.values(details.compatibility).some(v => v === null) || Object.values(details.idealHousehold).some(v => v === null);
    
    const borderColorClass = isActionNeeded ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500';

    const handleUpdateRecord = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(jotformLink, '_blank');
    };

    const formattedIntakeDate = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
    }).format(new Date(intakeDate));

    return (
        <div 
            onClick={onClick}
            className={`flex-shrink-0 w-[275px] bg-white rounded-xl shadow-lg overflow-hidden mr-4 snap-start last:mr-0 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${borderColorClass} cursor-pointer`}
        >
            <img src={images[0]} alt={name} className="w-full h-32 object-cover" />
            <div className="p-4 flex-grow flex flex-col">
                {isActionNeeded && <ActionNeededTag />}
                <p className="font-bold text-lg text-black">{name}</p>
                <p className="text-gray-700">{breed}</p>
                <p className="text-sm text-gray-500">{age}</p>
                <p className="text-sm text-gray-500 mb-3">{`Intake: ${formattedIntakeDate}`}</p>
                
                <div className="flex-grow"></div>
                
                {isActionNeeded && (
                    <button
                        onClick={handleUpdateRecord}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Update Record
                    </button>
                )}
            </div>
        </div>
    );
};

export default NewAnimalCard;
