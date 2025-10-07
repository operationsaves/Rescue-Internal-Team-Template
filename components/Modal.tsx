
import React, { useState } from 'react';
import type { CardData } from '../types';
import { MeetAndGreetType, FollowUpStatus, CommunicationType, CommunicationStatus, EmailStatus } from '../types';

interface ModalProps {
  card: CardData | null;
  onClose: () => void;
}

const InfoSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div>
    <div className="flex items-center mb-2">
      <div className="w-6 h-6 mr-3 text-gray-500">{icon}</div>
      <h3 className="font-bold text-sm uppercase tracking-wider text-gray-600">{title}</h3>
    </div>
    <div className="pl-9">{children}</div>
  </div>
);

const ModalSentIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="11.5" stroke="#4CAF50" strokeOpacity="0.5"/>
    <path d="M8.5 12.5L11 15L16 10" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ModalScheduledIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="12" cy="12" r="6" fill="#3B82F6"/>
  </svg>
);

const ModalCheckListItem: React.FC<{ label: string; isComplete: boolean }> = ({ label, isComplete }) => {
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
            <span className={isComplete ? 'text-gray-700' : 'text-red-600 font-medium'}>{label}</span>
        </div>
    );
};

const ModalActionNeededTag: React.FC = () => (
    <div className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
        ACTION NEEDED
    </div>
);


const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const isEvent = !!card.eventDetails;
  const isVetAppointment = !!card.vetAppointmentDetails;
  const vetDetails = card.vetAppointmentDetails;
  const isDocVerification = !!card.docVerificationDetails;
  const docDetails = card.docVerificationDetails;
  const isMeetAndGreet = !!card.meetAndGreetDetails;
  const meetDetails = card.meetAndGreetDetails;
  const isCommunication = !!card.communicationDetails;
  const commsDetails = card.communicationDetails;
  const isEmail = !!card.emailDetails;
  const emailDetails = card.emailDetails;
  const isAdoption = !!card.adoptionDetails;
  const adoptionDetails = card.adoptionDetails;
  const isNewAnimal = !!card.newAnimalDetails;
  const newAnimalDetails = card.newAnimalDetails;
  const isNewApplication = !!card.newApplicationDetails;
  const newAppDetails = card.newApplicationDetails;
  const isPetfinderInquiry = !!card.petfinderInquiryDetails;
  const inquiryDetails = card.petfinderInquiryDetails;
  const isSocialPost = !!card.socialPostDetails;
  const socialPostDetails = card.socialPostDetails;


  const renderHeader = () => {
    if (isAdoption || isNewAnimal) {
      return null;
    }
    if (isSocialPost && socialPostDetails) {
        const platformName = socialPostDetails.platform.charAt(0) + socialPostDetails.platform.slice(1).toLowerCase();
        return (
            <div className="p-6 flex items-center border-b border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <div>
                    <h2 className="font-bold text-gray-900 text-xl pr-8">{platformName} Post</h2>
                </div>
            </div>
        )
    }
     if (isNewApplication && newAppDetails) {
        return (
            <div className="p-4 relative bg-black/10 backdrop-blur-xl rounded-t-xl">
                 <div className="p-4 bg-white/70 rounded-xl shadow-inner">
                    <h2 className="font-bold text-gray-900 text-xl pr-8">Applications for {newAppDetails.animalName}</h2>
                 </div>
            </div>
        )
    }
    if (isPetfinderInquiry && inquiryDetails) {
        return (
            <div className="p-4 relative bg-black/10 backdrop-blur-xl rounded-t-xl">
                 <div className="p-4 bg-white/70 rounded-xl shadow-inner">
                    <h2 className="font-bold text-gray-900 text-xl pr-8">Inquiries for {inquiryDetails.animalName}</h2>
                 </div>
            </div>
        )
    }
    if (isEmail && emailDetails) {
        return (
          <div className="p-6 flex items-center border-b border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h2 className="font-bold text-gray-900 text-xl pr-8">{emailDetails.subject}</h2>
              <p className="text-gray-600 mt-1">From: {emailDetails.sender}</p>
            </div>
          </div>
        );
    }
    if (isCommunication && commsDetails) {
       let titleText = '';
       let icon = null;
       
       if (commsDetails.type === CommunicationType.Call) {
         titleText = `Voicemail from ${commsDetails.from}`;
         icon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
         );
       } else { // Text
         titleText = `Text from ${commsDetails.from}`;
         icon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
         );
       }
      
      return (
        <div className="p-6 flex items-center border-b border-gray-200">
          {icon}
          <div>
            <h2 className="font-bold text-gray-900 text-xl pr-8">{titleText}</h2>
          </div>
        </div>
      );
    }
    if (isMeetAndGreet && meetDetails) {
      const title = `${meetDetails.familyName} & ${meetDetails.animalName}`;
      const subtitle = meetDetails.type === MeetAndGreetType.MeetAndGreet
        ? `Meet & Greet: ${meetDetails.dateTime}`
        : `Follow-up Sequence`;
      
      return (
        <div className="p-6 flex items-center border-b border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <div>
            <h2 className="font-bold text-gray-900 text-xl pr-8">{title}</h2>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>
        </div>
      );
    }
    if (isDocVerification && docDetails) {
      return (
        <div className="p-6 flex justify-between items-start border-b border-gray-200 relative">
          <div>
            <h2 className="font-bold text-gray-900 text-xl pr-8">{docDetails.animalName} - {docDetails.applicantName}</h2>
            <p className="text-gray-600 mt-1">Submitted: {docDetails.submissionDate}</p>
          </div>
        </div>
      );
    }
    if (isVetAppointment && vetDetails) {
      return (
        <div className="p-6 flex justify-between items-start border-b border-gray-200 relative">
          <div>
            <h2 className="font-bold text-gray-900 text-xl pr-8">{vetDetails.animalName} - {vetDetails.service}</h2>
            {vetDetails.status !== 'FULLY_STAFFED' && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-2">Action Needed</span>
            )}
          </div>
        </div>
      );
    }
    if (isEvent && card.eventDetails) {
      return (
        <div className="p-6 pb-2 text-center">
          <h2 className="font-bold text-gray-900 text-2xl">{card.title}</h2>
          <p className="text-gray-600 mt-1">{card.eventDetails.date}</p>
          <p className="text-gray-500 text-sm">{card.eventDetails.time}</p>
        </div>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (isSocialPost && socialPostDetails) {
        return (
            <div className="p-4 bg-gray-100/50 flex items-center justify-center">
                {socialPostDetails.mediaUrl ? (
                    <img src={socialPostDetails.mediaUrl} alt={card.title} className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg" />
                ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center bg-blue-100 rounded-lg">
                        <p className="text-lg text-blue-700 font-semibold mb-2">{card.title}</p>
                        <div className="w-24 h-24 rounded-lg bg-blue-200 flex items-center justify-center text-5xl text-blue-600 font-bold shadow-inner">?</div>
                    </div>
                )}
            </div>
        );
    }
    if (isNewApplication && newAppDetails) {
      const { applicants } = newAppDetails;
      if (applicants.length === 0) {
        return <div className="p-6 text-gray-500">No applications to display.</div>;
      }

      const currentApplicant = applicants[currentApplicantIndex];

      return (
        <div className="relative p-6 -mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
                <p className="text-sm text-gray-500 uppercase tracking-wider">Applicant</p>
                <h3 className="text-lg font-bold text-gray-900">{currentApplicant.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Submitted: {currentApplicant.submissionDate}</p>
                <p className="text-gray-800 ">{currentApplicant.summary}</p>
            </div>
        </div>
      )
    }
    if (isPetfinderInquiry && inquiryDetails) {
      const { inquirers } = inquiryDetails;
      if (inquirers.length === 0) {
        return <div className="p-6 text-gray-500">No inquiries to display.</div>;
      }

      const currentInquirer = inquirers[currentApplicantIndex];

      return (
        <div className="relative p-6 -mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50">
                <p className="text-sm text-gray-500 uppercase tracking-wider">Inquirer</p>
                <h3 className="text-lg font-bold text-gray-900">{currentInquirer.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Received: {currentInquirer.submissionDate}</p>
                <p className="text-gray-800 ">{currentInquirer.emailBody}</p>
            </div>
        </div>
      )
    }
    if (isNewAnimal && newAnimalDetails) {
        const { name, breed, age, gender, images, compatibility, idealHousehold } = newAnimalDetails;
        const isProfileComplete = Object.values(compatibility).every(v => v !== null) && Object.values(idealHousehold).every(v => v !== null);

        const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % images.length);
        const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);

        const InfoChip: React.FC<{icon: string, label: string, isCompatible: boolean | null}> = ({ icon, label, isCompatible }) => {
            if (isCompatible === null) {
                 const unknownClasses = "bg-yellow-100 text-yellow-800";
                 const UnknownIcon = () => (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                 );
                 return (
                    <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${unknownClasses}`}>
                        <span className="text-lg">{icon}</span>
                        <span className="font-medium">{label}</span>
                        <UnknownIcon />
                    </div>
                );
            }

            const compatibleClasses = "bg-green-100 text-green-800";
            const notCompatibleClasses = "bg-red-100 text-red-800";
            const CompatibleIcon = () => (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            );
            const NotCompatibleIcon = () => (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            );

            return (
                <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${isCompatible ? compatibleClasses : notCompatibleClasses}`}>
                    <span className="text-lg">{icon}</span>
                    <span className="font-medium">{label}</span>
                    {isCompatible ? <CompatibleIcon /> : <NotCompatibleIcon />}
                </div>
            );
        };
        
        const compatibilityItems = [
            { key: 'cats', icon: '🐈', label: 'Cats', value: compatibility.cats },
            { key: 'smallDogs', icon: '🐕', label: 'Small Dogs', value: compatibility.smallDogs },
            { key: 'largeDogs', icon: '🐾', label: 'Large Dogs', value: compatibility.largeDogs },
        ];
        const householdItems = [
            { key: 'adults', icon: '👩', label: 'Adults', value: idealHousehold.adults },
            { key: 'children', icon: '👧', label: 'Children', value: idealHousehold.children },
            { key: 'seniors', icon: '👵', label: 'Seniors', value: idealHousehold.seniors },
            { key: 'infants', icon: '👶', label: 'Infants', value: idealHousehold.infants },
        ];

        return (
             <div className="overflow-y-auto text-gray-700 scrollbar-hide">
                <div className="relative w-full h-64 bg-gray-200">
                    <img src={images[currentImageIndex]} alt={`${name} ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <div key={index} className={`w-2.5 h-2.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </div>
                <div className="p-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
                    <p className="text-gray-500 mt-1">{breed} • {age} • {gender}</p>
                </div>
                <div className="px-6 pb-6 space-y-6">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-3 text-center">Compatibility</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {compatibilityItems.map(item => (
                                <InfoChip key={item.key} icon={item.icon} label={item.label} isCompatible={item.value} />
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-3 text-center">Ideal Household</h3>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {householdItems.map(item => (
                                <InfoChip key={item.key} icon={item.icon} label={item.label} isCompatible={item.value} />
                            ))}
                        </div>
                    </div>
                </div>
             </div>
        )

    }
    if (isAdoption && adoptionDetails) {
        const { animalName, animalType, adopterName, adoptionDate, imageUrl, paperworkScanned, agreementSent } = adoptionDetails;
        const isActionNeeded = !paperworkScanned;

        const adoptionDateObj = new Date(adoptionDate);
        const daysAgo = Math.round((Date.now() - adoptionDateObj.getTime()) / (1000 * 60 * 60 * 24));

        return (
            <div className="overflow-y-auto text-gray-700 scrollbar-hide">
                <img src={imageUrl} alt={animalName} className="w-full h-48 object-cover" />
                <div className="p-6">
                    {isActionNeeded && <ModalActionNeededTag />}
                    <p className="font-bold text-2xl text-black">{animalName} ({animalType})</p>
                    <p className="text-gray-700 mt-1 text-lg">{`Adopted by ${adopterName}`}</p>
                    <p className="text-sm text-gray-500 mb-4">{`(${daysAgo} days ago)`}</p>

                    <div className="space-y-2 py-4 border-t border-gray-200">
                        <ModalCheckListItem label="Paperwork scanned" isComplete={paperworkScanned} />
                        <ModalCheckListItem label="Agreement & records sent" isComplete={agreementSent} />
                    </div>
                </div>
            </div>
        );
    }
    if (isEmail && emailDetails) {
      if (!emailDetails.thread || emailDetails.thread.length === 0) {
        return <div className="p-6 text-gray-500">No thread details available.</div>;
      }
      return (
        <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide space-y-4 bg-gray-100/50">
          {emailDetails.thread.map((message, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 border border-gray-200/80">
              <div className="flex justify-between items-baseline mb-2 pb-2 border-b border-gray-100">
                <p className="font-bold text-gray-800">{message.sender}</p>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
              </div>
              <p className="text-gray-600 whitespace-pre-wrap">{message.body}</p>
            </div>
          ))}
        </div>
      );
    }
    if (isCommunication && commsDetails) {
      if (commsDetails.type === CommunicationType.Call) {
        return (
          <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">AI Summary</h3>
              <p>{commsDetails.summary}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Full Transcript</h3>
              <div className="bg-gray-100/70 p-4 rounded-lg text-gray-800">
                <p>{commsDetails.fullTranscript}</p>
              </div>
            </div>
          </div>
        );
      } else { // Text
        return (
          <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide flex flex-col space-y-3">
             {commsDetails.conversation?.map((msg, index) => (
              <div key={index} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl py-2 px-4 max-w-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-200">
               <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">AI Analysis</h3>
               <p className="text-gray-600">{commsDetails.aiAnalysis}</p>
            </div>
          </div>
        );
      }
    }
    if (isMeetAndGreet && meetDetails) {
      if (meetDetails.type === MeetAndGreetType.FollowUp) {
        return (
          <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide space-y-4">
            {meetDetails.timelineText && (
              <p className="text-gray-600 mb-4">{meetDetails.timelineText}</p>
            )}
            <div className="border-t border-gray-200 pt-4 space-y-5">
              {meetDetails.followUpItems?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {item.status === FollowUpStatus.Sent ? <ModalSentIcon /> : <ModalScheduledIcon />}
                  <div>
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500 capitalize">{item.status.toLowerCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      const householdIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
        </svg>
      );
      const petsIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0012 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253m18.148-4.506A11.953 11.953 0 0012 10.5" />
        </svg>
      );
      const notesIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );

      return (
        <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide space-y-8">
          {meetDetails.householdInfo && (
            <InfoSection icon={householdIcon} title="Household">
              <p className="text-gray-800">{meetDetails.householdInfo}</p>
            </InfoSection>
          )}
          {meetDetails.currentPetsInfo && (
            <InfoSection icon={petsIcon} title="Current Pets">
              <p className="text-gray-800">{meetDetails.currentPetsInfo}</p>
            </InfoSection>
          )}
          {meetDetails.applicantNotes && (
            <InfoSection icon={notesIcon} title="Applicant Notes">
              <p className="text-gray-800 bg-gray-100 p-4 rounded-lg italic border-l-4 border-gray-300">"{meetDetails.applicantNotes}"</p>
            </InfoSection>
          )}
        </div>
      );
    }
    if (isDocVerification && docDetails) {
      return (
        <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide space-y-6">
          {(docDetails.uploadedDocuments && docDetails.uploadedDocuments.length > 0) && (
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2 border-b pb-1">Uploaded Information</h3>
              <div className="space-y-3 mt-3">
                {docDetails.uploadedDocuments.map(doc => (
                  <button 
                    key={doc.label} 
                    onClick={() => openLink(doc.url)}
                    className="w-full flex justify-between items-center bg-white border border-gray-300 text-blue-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
                  >
                    <span>{doc.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
          {docDetails.providedInfo && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-1">{docDetails.providedInfo.title}</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{docDetails.providedInfo.content}</p>
            </div>
          )}
        </div>
      );
    }
    if (isVetAppointment && vetDetails) {
      return (
        <div className="p-6 overflow-y-auto text-gray-700 scrollbar-hide space-y-4">
          <div className="space-y-1">
              <p><span className="font-semibold">Clinic:</span> {vetDetails.clinicName}</p>
              <p><span className="font-semibold">Drop-off:</span> {vetDetails.dropOffTime || 'N/A'} by {vetDetails.dropOffBy || 'TBD'}</p>
              <p><span className="font-semibold">Pick-up:</span> {vetDetails.pickUpTime || 'N/A'} by {vetDetails.pickUpBy || 'TBD'}</p>
          </div>
          <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Location</h3>
              <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                  <iframe
                      src={vetDetails.mapUrl}
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      title="Vet Clinic Location Map"
                  ></iframe>
              </div>
              <div className="mt-2 text-center text-sm bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg">
                  Map View of: {vetDetails.clinicAddress}
              </div>
          </div>
        </div>
      );
    }
    if (isEvent && card.eventDetails) {
      return (
        <div className="px-6 pb-6 pt-4 overflow-y-auto text-gray-700 scrollbar-hide">
          <div className="space-y-6">
            <p className="text-center">{card.eventDetails.description}</p>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3">Attending Animals</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {card.eventDetails.participatingAnimals.map(animal => (
                  <div key={animal.name} className="text-center">
                    <img src={animal.imageUrl} alt={animal.name} className="w-16 h-16 rounded-full object-cover mx-auto shadow-md border-2 border-white" />
                    <p className="text-sm mt-1 font-medium">{animal.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3">Location</h3>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                <iframe
                  src={card.eventDetails.mapUrl}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Event Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  const renderFooter = () => {
    if (isSocialPost) {
        return null;
    }
    if (isNewApplication && newAppDetails && newAppDetails.applicants.length > 1) {
        return (
            <div className="p-4 bg-transparent flex justify-center items-center gap-3">
                {newAppDetails.applicants.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentApplicantIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${index === currentApplicantIndex ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'}`}
                      aria-label={`Go to applicant ${index + 1}`}
                    />
                ))}
            </div>
        )
    }
     if (isPetfinderInquiry && inquiryDetails && inquiryDetails.inquirers.length > 1) {
        return (
            <div className="p-4 bg-transparent flex justify-center items-center gap-3">
                {inquiryDetails.inquirers.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentApplicantIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${index === currentApplicantIndex ? 'bg-purple-600' : 'bg-gray-400 hover:bg-gray-500'}`}
                      aria-label={`Go to inquirer ${index + 1}`}
                    />
                ))}
            </div>
        )
    }
    if (isNewAnimal && newAnimalDetails) {
        const isProfileComplete = Object.values(newAnimalDetails.compatibility).every(v => v !== null) && Object.values(newAnimalDetails.idealHousehold).every(v => v !== null);
        if (isProfileComplete) return null;

        return (
            <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl">
                <button
                    onClick={() => openLink(newAnimalDetails.jotformLink)}
                    className="w-full bg-teal-500 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-200"
                >
                    Complete Profile
                </button>
            </div>
        )
    }
    if (isAdoption && adoptionDetails) {
        const isActionNeeded = !adoptionDetails.paperworkScanned;
        if (!isActionNeeded) return null;
        
        const handleScanPaperwork = async (e: React.MouseEvent) => {
            e.stopPropagation();
            try {
                alert('Opening camera to scan paperwork...');
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                stream.getTracks().forEach(track => track.stop());
            } catch (err) {
                console.error("Camera access denied:", err);
                alert("Camera access was denied. Please enable it in your browser settings.");
            }
        };

        return (
            <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl">
                <button
                    onClick={handleScanPaperwork}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
                >
                    Scan in paperwork
                </button>
            </div>
        );
    }
    if (isEmail) {
      return null;
    }
    if (isCommunication && commsDetails) {
      const needsAction = commsDetails.status === CommunicationStatus.ActionNeeded || commsDetails.status === CommunicationStatus.Urgent;
      if (!needsAction) return null;
      
      const phoneNumber = commsDetails.from.replace(/\D/g, '');
      const handleCall = () => window.open(`tel:${phoneNumber}`);
      const handleText = () => window.open(`sms:${phoneNumber}`);

      return (
        <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl">
           <button onClick={handleCall} className="bg-green-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200">
             Call
           </button>
           <button onClick={handleText} className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
             Text
           </button>
        </div>
      );
    }
    if (isMeetAndGreet) {
      return null;
    }
    if (isDocVerification && docDetails) {
      return (
        <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={() => openLink(docDetails.reviewLink)}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Review Submission
          </button>
        </div>
      );
    }
    if (isVetAppointment && vetDetails) {
       if (vetDetails.status === 'UNSCHEDULED') {
        return (
            <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-center gap-3 rounded-b-2xl">
                <button 
                    onClick={() => openLink(vetDetails.scheduleLink)} 
                    className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Schedule
                </button>
            </div>
        );
      }

      const needsDropOff = vetDetails.dropOffBy === null;
      const needsPickUp = vetDetails.pickUpBy === null;

      if(!needsDropOff && !needsPickUp) return null;

      return (
         <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-center gap-3 rounded-b-2xl">
              {needsDropOff && (
                  <button 
                    onClick={() => openLink(vetDetails.signUpLink)} 
                    className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                      Sign up for Drop-off
                  </button>
              )}
              {needsPickUp && (
                  <button 
                    onClick={() => openLink(vetDetails.signUpLink)} 
                    className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                      Sign up for Pick-up
                  </button>
              )}
          </div>
      );
    }
    if (isEvent) {
        return null;
    }
    return null;
  };

  const isGlassModal = (isNewApplication && newAppDetails) || (isPetfinderInquiry && inquiryDetails);
  const modalBg = isGlassModal ? 'bg-transparent' : 'bg-white/80 backdrop-blur-lg';
  const modalWidth = isGlassModal ? 'max-w-md' : 'max-w-lg';


  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className={`${modalBg} rounded-2xl shadow-2xl w-full ${modalWidth} max-h-[90vh] flex flex-col animate-fade-in-up`}>
        <div className="relative">
          {renderHeader()}
           <button onClick={onClose} className={`absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10 ${isAdoption || isNewAnimal ? 'bg-black/20 backdrop-blur-sm rounded-full p-1 text-white hover:text-white' : ''} ${isGlassModal ? 'top-6 right-6': ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {renderBody()}
        
        {renderFooter()}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
