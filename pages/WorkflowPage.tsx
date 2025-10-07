
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import WorkflowSection from '../components/WorkflowSection';
import EventCarousel from '../components/EventCarousel';
import VetAppointmentCard from '../components/VetAppointmentCard';
import DocVerificationCard from '../components/DocVerificationCard';
import MeetAndGreetCard from '../components/MeetAndGreetCard';
import Carousel from '../components/Carousel';
import CommunicationCard from '../components/CommunicationCard';
import EmailCard from '../components/EmailCard';
import AdoptionCard from '../components/AdoptionCard';
import NewAnimalCard from '../components/NewAnimalCard';
import NewApplicationCard from '../components/NewApplicationCard';
import PetfinderInquiryCard from '../components/PetfinderInquiryCard';
import SocialPostCard from '../components/SocialPostCard';
import { fetchWorkflowData } from '../services/mockApiService';
import type { CardData } from '../types';
import { Urgency, CommunicationType, CommunicationStatus, EmailStatus, NewApplicationStatus } from '../types';

const WorkflowPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchWorkflowData();
      setCards(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const sections = [
    { icon: '🗓️', title: 'Upcoming Adoption Events', subtitle: 'next 30 days', category: 'Upcoming Adoption Events' },
    { icon: '🩺', title: 'Vet Appointments', subtitle: '', category: 'Vet Appointments' },
    { icon: '❗️', title: 'Document Verifications', subtitle: '', category: 'Document Verifications' },
    { icon: '👋', title: 'Meet & Greets / Follow-ups', subtitle: '', category: 'Meet & Greets / Follow-ups' },
    { icon: '📞', title: 'Calls & Texts', subtitle: 'last 7 days', category: 'Calls & Texts' },
    { icon: '💌', title: 'Emails & Contact Form', subtitle: 'last 7 days', category: 'Emails & Contact Form' },
    { icon: '❤️', title: 'Finalized Adoptions', subtitle: 'last 30 days', category: 'Finalized Adoptions' },
    { icon: '✨', title: 'New Animals', subtitle: 'last 30 days', category: 'New Animals' },
    { icon: '📝', title: 'New Applications', subtitle: 'last 7 days', category: 'New Applications' },
    { icon: '🐾', title: 'Petfinder Inquiries', subtitle: 'last 7 days', category: 'Petfinder Inquiries' },
    { icon: '📱', title: 'Social Posts', subtitle: 'last 24 hours', category: 'Social Posts' },
  ];

  if (loading) {
    return <div className="text-center p-10">Loading workflow...</div>;
  }

  return (
    <div>
      {sections.map(section => {
        const sectionCards = cards.filter(c => c.category === section.category);
        if (sectionCards.length === 0) return null;

        const isEventSection = section.category === 'Upcoming Adoption Events';
        const isVetSection = section.category === 'Vet Appointments';
        const isDocVerificationSection = section.category === 'Document Verifications';
        const isMeetAndGreetSection = section.category === 'Meet & Greets / Follow-ups';
        const isCommunicationSection = section.category === 'Calls & Texts';
        const isEmailSection = section.category === 'Emails & Contact Form';
        const isFinalizedAdoptionSection = section.category === 'Finalized Adoptions';
        const isNewAnimalSection = section.category === 'New Animals';
        const isNewApplicationSection = section.category === 'New Applications';
        const isPetfinderInquirySection = section.category === 'Petfinder Inquiries';
        const isSocialPostSection = section.category === 'Social Posts';

        let actionableCount = 0;
        let nonActionableCount = 0;
        
        if (isEventSection) {
          actionableCount = 0;
          nonActionableCount = sectionCards.length;
        } else if (isVetSection) {
            actionableCount = sectionCards.filter(c => c.vetAppointmentDetails?.status !== 'FULLY_STAFFED').length;
            nonActionableCount = sectionCards.filter(c => c.vetAppointmentDetails?.status === 'FULLY_STAFFED').length;
        } else if (isDocVerificationSection) {
            actionableCount = sectionCards.length;
            nonActionableCount = 0;
        } else if (isMeetAndGreetSection) {
            actionableCount = sectionCards.filter(c => c.urgency === Urgency.Medium || c.urgency === Urgency.High).length;
            nonActionableCount = sectionCards.filter(c => c.urgency === Urgency.Low || c.urgency === Urgency.Info).length;
        } else if (isCommunicationSection) {
            actionableCount = sectionCards.filter(c => c.communicationDetails?.status === CommunicationStatus.ActionNeeded || c.communicationDetails?.status === CommunicationStatus.Urgent).length;
            nonActionableCount = sectionCards.filter(c => c.communicationDetails?.status === CommunicationStatus.Resolved || c.communicationDetails?.status === CommunicationStatus.Info).length;
        } else if (isEmailSection) {
            actionableCount = sectionCards.filter(c => c.emailDetails?.status === EmailStatus.Urgent).length;
            nonActionableCount = sectionCards.length - actionableCount;
        } else if (isFinalizedAdoptionSection) {
            actionableCount = sectionCards.filter(c => !c.adoptionDetails?.paperworkScanned).length;
            nonActionableCount = sectionCards.length - actionableCount;
        } else if (isNewAnimalSection) {
            actionableCount = sectionCards.filter(c => {
                const details = c.newAnimalDetails;
                if (!details) return true; // Treat as actionable if details are missing
                return Object.values(details.compatibility).some(v => v === null) || Object.values(details.idealHousehold).some(v => v === null);
            }).length;
            nonActionableCount = sectionCards.length - actionableCount;
        } else if (isNewApplicationSection) {
            actionableCount = sectionCards.filter(c => c.newApplicationDetails?.status === NewApplicationStatus.ACTION_NEEDED).length;
            nonActionableCount = sectionCards.length - actionableCount;
        } else if (isPetfinderInquirySection) {
            actionableCount = 0;
            nonActionableCount = sectionCards.length;
        } else if (isSocialPostSection) {
            actionableCount = 0;
            nonActionableCount = sectionCards.length;
        }
        else {
            actionableCount = sectionCards.filter(c => c.tags.includes('Action Needed')).length;
            nonActionableCount = sectionCards.length - actionableCount;
        }
        
        return (
          <WorkflowSection
            key={section.title}
            icon={section.icon}
            title={section.title}
            subtitle={section.subtitle}
            actionableCount={actionableCount}
            nonActionableCount={nonActionableCount}
            isEventSection={isEventSection}
          >
            {isVetSection ? (
              sectionCards.map(card => (
                <VetAppointmentCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            ) : isEventSection ? (
              <EventCarousel events={sectionCards} onViewDetails={setSelectedCard} />
            ) : isDocVerificationSection ? (
              sectionCards.map(card => (
                <DocVerificationCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            ) : isMeetAndGreetSection ? (
              sectionCards.map(card => (
                <MeetAndGreetCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            ) : isCommunicationSection ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2 pl-1">Calls</h3>
                  <Carousel>
                    {sectionCards
                      .filter(c => c.communicationDetails?.type === CommunicationType.Call)
                      .map(card => <CommunicationCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />)
                    }
                  </Carousel>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2 pl-1">Texts</h3>
                   <Carousel>
                    {sectionCards
                      .filter(c => c.communicationDetails?.type === CommunicationType.Text)
                      .map(card => <CommunicationCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />)
                    }
                  </Carousel>
                </div>
              </div>
            ) : isEmailSection ? (
              sectionCards.map(card => (
                <EmailCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            ) : isFinalizedAdoptionSection ? (
              <Carousel>
                {sectionCards.map(card => <AdoptionCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />)}
              </Carousel>
            ) : isNewAnimalSection ? (
              <div>
                <Carousel>
                  {sectionCards.map(card => <NewAnimalCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />)}
                </Carousel>
                <div className="mt-4">
                   <a
                      href="#" // Placeholder for Jotform link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
                    >
                      Add a new pet
                    </a>
                </div>
              </div>
            ) : isNewApplicationSection ? (
              sectionCards.map(card => (
                <NewApplicationCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            ) : isPetfinderInquirySection ? (
              sectionCards.map(card => (
                <PetfinderInquiryCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            ) : isSocialPostSection ? (
              <Carousel activeIndicatorColor="bg-blue-600">
                {sectionCards.map(card => <SocialPostCard key={card.id} data={card} onClick={() => setSelectedCard(card)} />)}
              </Carousel>
            ) : (
              sectionCards.map(card => (
                <Card key={card.id} data={card} onClick={() => setSelectedCard(card)} />
              ))
            )}
          </WorkflowSection>
        )
      })}
      <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

export default WorkflowPage;
