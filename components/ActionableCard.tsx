
import React from 'react';
import type { CardData, Applicant } from '../types';
import { VetAppointmentStatus, CommunicationStatus, EmailStatus, NewApplicationStatus } from '../types';

const openLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
};

// Helper components for rich card details, adapted from modal/card components
const TransportInfo: React.FC<{ label: string; time: string | null; person: string | null }> = ({ label, time, person }) => (
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

const CheckListItem: React.FC<{ label: string; isComplete: boolean }> = ({ label, isComplete }) => {
    const Icon = isComplete
        ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
    return <div className="flex items-center space-x-2"><span className={isComplete ? 'text-gray-700' : 'text-red-600 font-medium'}>{label}</span></div>;
};

const InfoChip: React.FC<{icon: string, label: string, isCompatible: boolean | null}> = ({ icon, label, isCompatible }) => {
    let chipClasses, StatusIcon;
    if (isCompatible === null) {
        chipClasses = "bg-yellow-100 text-yellow-800";
        StatusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
    } else if (isCompatible) {
        chipClasses = "bg-green-100 text-green-800";
        StatusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
    } else {
        chipClasses = "bg-red-100 text-red-800";
        StatusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
    }
    return <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${chipClasses}`}><span className="text-lg">{icon}</span><span className="font-medium">{label}</span><StatusIcon /></div>;
};

const ApplicantCard: React.FC<{applicant: Applicant}> = ({ applicant }) => (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <p className="font-semibold">{applicant.name} <span className="font-normal text-sm text-gray-500">- Submitted {applicant.submissionDate}</span></p>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{applicant.summary}</p>
    </div>
);


const ActionableCard: React.FC<{ data: CardData }> = ({ data }) => {
    const { 
        vetAppointmentDetails, 
        docVerificationDetails,
        communicationDetails,
        emailDetails,
        adoptionDetails,
        newAnimalDetails,
        newApplicationDetails
    } = data;

    if (vetAppointmentDetails) {
        const { status, animalName, service, clinicName, clinicAddress, date, dropOffTime, dropOffBy, pickUpTime, pickUpBy, scheduleLink, signUpLink, mapUrl } = vetAppointmentDetails;
        const needsDropOff = dropOffBy === null;
        const needsPickUp = pickUpBy === null;

        return (
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
                <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xl leading-tight font-bold text-black">{animalName} - {service}</p>
                            <p className="text-gray-600">{clinicName}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-800">{date}</p>
                            {status === VetAppointmentStatus.Unscheduled && <p className="text-red-600 font-semibold">Needs Scheduling</p>}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="space-y-1">
                            <TransportInfo label="Drop-off" time={dropOffTime} person={dropOffBy} />
                            <TransportInfo label="Pick-up" time={pickUpTime} person={pickUpBy} />
                        </div>
                        <div className="pt-4">
                            <h3 className="font-bold text-sm text-gray-800 mb-2 text-left">Location</h3>
                            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                                <iframe
                                    src={mapUrl}
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    title="Vet Clinic Location Map"
                                ></iframe>
                            </div>
                            <p className="mt-2 text-center text-xs bg-gray-100 text-gray-600 font-medium py-1 px-2 rounded-md">
                                {clinicAddress}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200 flex justify-center gap-3">
                    {status === VetAppointmentStatus.Unscheduled && (
                        <button onClick={() => openLink(scheduleLink)} className="w-full bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700">
                            Schedule
                        </button>
                    )}
                    {status === VetAppointmentStatus.NeedsTransport && (
                        <>
                            {needsDropOff && (
                                <button onClick={() => openLink(signUpLink)} className="flex-1 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700">
                                    Sign up for Drop-off
                                </button>
                            )}
                            {needsPickUp && (
                                <button onClick={() => openLink(signUpLink)} className="flex-1 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700">
                                    Sign up for Pick-up
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }

    if (docVerificationDetails) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-yellow-500">
                <div className="p-4 space-y-4">
                    <div>
                        <p className="text-xl font-bold text-black">{docVerificationDetails.animalName} - {docVerificationDetails.applicantName}</p>
                        <p className="text-gray-600">Submitted {docVerificationDetails.submissionDate}</p>
                    </div>
                    {docVerificationDetails.uploadedDocuments && (
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Uploaded Documents:</h4>
                            <div className="flex flex-wrap gap-2">
                            {docVerificationDetails.uploadedDocuments.map(doc => (
                                <button 
                                    key={doc.label} 
                                    onClick={() => openLink(doc.url)} 
                                    className="flex items-center gap-2 text-sm bg-blue-100 text-blue-800 font-semibold py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors"
                                >
                                    <span>{doc.label}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </button>
                            ))}
                            </div>
                        </div>
                    )}
                    {docVerificationDetails.providedInfo && (
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-1 text-sm">{docVerificationDetails.providedInfo.title}:</h4>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{docVerificationDetails.providedInfo.content}</p>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200">
                    <button onClick={() => openLink(docVerificationDetails.reviewLink)} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Review Submission
                    </button>
                </div>
            </div>
        );
    }
    
    if (communicationDetails?.status === CommunicationStatus.Urgent) {
        const phoneNumber = communicationDetails.from.replace(/\D/g, '');
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
                 <div className="p-4">
                    <p className="font-bold text-gray-900">Urgent Text from {communicationDetails.from}</p>
                    <p className="mt-2 text-gray-800 bg-red-50 p-3 rounded-lg border border-red-200">"{communicationDetails.urgentText}"</p>
                 </div>
                 <div className="p-2 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-2">
                    <button onClick={() => window.open(`tel:${phoneNumber}`)} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-green-600">Call</button>
                    <button onClick={() => window.open(`sms:${phoneNumber}`)} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700">Text</button>
                 </div>
            </div>
        )
    }

    if (emailDetails?.status === EmailStatus.Urgent) {
        return (
             <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
                <div className="p-4">
                    <p className="font-bold text-gray-900">Urgent Email from {emailDetails.sender}</p>
                    <p className="text-gray-700">Subject: {emailDetails.subject}</p>
                    {emailDetails.thread && <p className="mt-2 text-gray-800 bg-red-50 p-3 rounded-lg border border-red-200">"{emailDetails.thread[0].body}"</p>}
                </div>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200">
                     <button onClick={() => openLink(emailDetails.threadUrl)} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
                        View Thread
                    </button>
                </div>
             </div>
        )
    }

    if (adoptionDetails && !adoptionDetails.paperworkScanned) {
        const { animalName, adopterName, imageUrl, paperworkScanned, agreementSent } = adoptionDetails;
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
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
                <div className="p-4">
                    <div className="flex items-center gap-4">
                        <img src={imageUrl} alt={animalName} className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                            <p className="font-bold text-xl text-black">{animalName}</p>
                            <p className="text-gray-700">Adopted by {adopterName}</p>
                        </div>
                    </div>
                    <div className="space-y-2 py-4 mt-4 border-t border-gray-200">
                        <CheckListItem label="Paperwork scanned" isComplete={paperworkScanned} />
                        <CheckListItem label="Agreement & records sent" isComplete={agreementSent} />
                    </div>
                </div>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200">
                    <button onClick={handleScanPaperwork} className="w-full bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-blue-700">
                        Scan in paperwork
                    </button>
                </div>
            </div>
        )
    }

    if (newAnimalDetails) {
        const { name, breed, age, gender, images, compatibility, idealHousehold } = newAnimalDetails;
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
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
                <div className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={images[0]} alt={name} className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                            <p className="font-bold text-xl text-black">{name}</p>
                            <p className="text-gray-600">{breed} • {age} • {gender}</p>
                            <p className="text-red-600 font-semibold mt-1">Profile is incomplete</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-sm text-gray-800 mb-2 text-center">Compatibility</h3>
                            {/* FIX: Explicitly pass props to InfoChip instead of spreading, mapping 'value' to 'isCompatible'. */}
                            <div className="flex flex-wrap gap-2 justify-center">{compatibilityItems.map(item => <InfoChip key={item.key} icon={item.icon} label={item.label} isCompatible={item.value} />)}</div>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-gray-800 mb-2 text-center">Ideal Household</h3>
                            {/* FIX: Explicitly pass props to InfoChip instead of spreading, mapping 'value' to 'isCompatible'. */}
                            <div className="flex flex-wrap gap-2 justify-center">{householdItems.map(item => <InfoChip key={item.key} icon={item.icon} label={item.label} isCompatible={item.value} />)}</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200">
                     <button onClick={() => openLink(newAnimalDetails.jotformLink)} className="w-full bg-teal-500 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-teal-600">
                        Complete Profile
                    </button>
                </div>
            </div>
        )
    }

    if (newApplicationDetails?.status === NewApplicationStatus.ACTION_NEEDED) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
                <div className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={newApplicationDetails.animalImageUrl} alt={newApplicationDetails.animalName} className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                            <p className="font-bold text-xl text-black">Applications for {newApplicationDetails.animalName}</p>
                            <p className="text-red-600 font-semibold">{newApplicationDetails.applicationCount} application(s) need review</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {newApplicationDetails.applicants.map(applicant => <ApplicantCard key={applicant.id} applicant={applicant} />)}
                    </div>
                </div>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200">
                    <button onClick={() => openLink(newApplicationDetails.reviewLink)} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Review All Submissions
                    </button>
                </div>
            </div>
        )
    }

    return null;
};

export default ActionableCard;
