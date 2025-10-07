import React from 'react';
import type { CardData, ResourceLink, ChatMessage, EventDetails, VetAppointmentDetails, DocVerificationDetails, MeetAndGreetDetails, CommunicationDetails, EmailDetails, AdoptionDetails, NewAnimalDetails, NewApplicationDetails, Applicant, SocialPostDetails, PetfinderInquiryDetails, Inquirer } from '../types';
import { Urgency, VetAppointmentStatus, MeetAndGreetType, FollowUpStatus, CommunicationType, CommunicationStatus, EmailStatus, NewApplicationStatus, SocialPostPlatform } from '../types';

const createCard = (
  id: number,
  category: string,
  title: string,
  subtitle: string,
  summary: string,
  details: React.ReactNode,
  urgency: Urgency,
  tags: string[],
  eventDetails?: EventDetails,
  vetAppointmentDetails?: VetAppointmentDetails,
  docVerificationDetails?: DocVerificationDetails,
  meetAndGreetDetails?: MeetAndGreetDetails,
  communicationDetails?: CommunicationDetails,
  emailDetails?: EmailDetails,
  adoptionDetails?: AdoptionDetails,
  newAnimalDetails?: NewAnimalDetails,
  newApplicationDetails?: NewApplicationDetails,
  socialPostDetails?: SocialPostDetails,
  petfinderInquiryDetails?: PetfinderInquiryDetails,
): CardData => ({
  id: `card-${id}`,
  category,
  title,
  subtitle,
  summary,
  details,
  urgency,
  tags,
  actions: [
    { label: 'Mark as Complete', action: () => alert(`Completed: ${title}`) },
    { label: 'View Details', action: () => {} },
  ],
  eventDetails,
  vetAppointmentDetails,
  docVerificationDetails,
  meetAndGreetDetails,
  communicationDetails,
  emailDetails,
  adoptionDetails,
  newAnimalDetails,
  newApplicationDetails,
  socialPostDetails,
  petfinderInquiryDetails,
});

const homeCards: CardData[] = [
  createCard(1, 'Event', 'Adoption Event at PetSmart', 'Saturday, 11 AM - 3 PM', 'Team, please confirm attendance. We need 3 handlers.', 'Full event details: PetSmart on 5th Ave. Setup starts at 10 AM. Bring adoption paperwork, leashes, and water bowls. Luna, Rocky, and Bella will be attending.', Urgency.High, ['Urgent', 'Action Needed'], undefined, undefined, undefined, undefined, undefined, undefined, undefined),
  createCard(2, 'Appointment', "Vet check for 'Max'", 'Today at 2:30 PM', 'Follow-up appointment for his leg injury.', 'Dr. Smith at VCA Animal Hospital. Please ensure his previous records are sent over. He is anxious in the car, so bring a comfort blanket.', Urgency.High, ['Appointment'], undefined, undefined, undefined, undefined, undefined, undefined, undefined),
  createCard(3, 'Medical', 'Vaccine Shipment Arrived', 'Received this morning', 'DHPP and Rabies vaccines are in.', 'The shipment is in the main fridge. Please log the inventory in the spreadsheet before end of day.', Urgency.Medium, ['Inventory'], undefined, undefined, undefined, undefined, undefined, undefined, undefined),
  createCard(4, 'Update', 'Foster Application: The Smiths', 'Received yesterday', 'Application for Daisy the beagle.', 'The Smith family has a fenced yard and two children over 10. Their vet reference has been contacted. Awaiting response.', Urgency.Low, ['Application'], undefined, undefined, undefined, undefined, undefined, undefined, undefined),
];

const fionaApplicants: Applicant[] = [
  {
    id: 'app-f-1',
    name: 'The Davis Family',
    submissionDate: '1 day ago',
    householdInfo: '2 adults, 1 child (age 10), fenced yard.',
    currentPetsInfo: '1 cat (5yo, female, spayed).',
    notes: 'Looking for a companion for our current cat. We have a quiet home and a lot of love to give.',
    summary: 'This is the detailed submission for Applicant 1. They have expressed strong interest in Fiona and seem like a great fit. Their home environment is suitable, and they have previous experience with this breed. All references have been checked and are positive.'
  },
  {
    id: 'app-f-2',
    name: 'Sarah Johnson',
    submissionDate: '3 days ago',
    householdInfo: 'Single adult, apartment with balcony.',
    currentPetsInfo: 'No other pets.',
    notes: 'I work from home and can provide a lot of attention. I\'m an experienced cat owner.',
    summary: 'Applicant 2 is a strong candidate who works from home, offering significant companionship. While living in an apartment, their experience with cats is a major plus. References confirm responsibility and care.'
  },
  {
    id: 'app-f-3',
    name: 'The Miller Family',
    submissionDate: '5 days ago',
    householdInfo: '2 adults, 2 teenagers.',
    currentPetsInfo: '2 dogs (Labrador, Beagle)',
    notes: 'Our dogs are very friendly and we have a large house. We are looking for a cat to complete our family.',
    summary: 'Applicant 3 has a lively household with two dogs. While the family is enthusiastic, a meet-and-greet with the dogs would be essential to ensure compatibility with Fiona. Their vet references are excellent.'
  }
];

const gusApplicants: Applicant[] = [
  {
    id: 'app-g-1',
    name: 'Mark Chen',
    submissionDate: '2 days ago',
    householdInfo: 'Single adult, townhouse.',
    currentPetsInfo: 'No other pets.',
    notes: 'First time dog owner, but I have done a lot of research and am prepared for the responsibility. My work schedule is flexible.',
    summary: 'A promising first-time owner who appears dedicated and prepared. Their flexible work schedule is a significant advantage for a new pet. Provided solid personal references.'
  },
  {
    id: 'app-g-2',
    name: 'The Rodriguez Family',
    submissionDate: '6 days ago',
    householdInfo: '2 adults, fenced yard.',
    currentPetsInfo: '1 senior dog (12yo).',
    notes: 'Our current dog is very calm and we\'re looking for a gentle friend for him in his golden years.',
    summary: 'Experienced dog owners with a calm home environment that could be a great fit for Gus. The presence of a senior dog is a good sign of their commitment. References are outstanding.'
  }
];

const penelopeApplicants: Applicant[] = [
  {
    id: 'app-p-1',
    name: 'Emily White',
    submissionDate: '4 days ago',
    householdInfo: 'Single adult, works as a vet tech.',
    currentPetsInfo: '2 cats.',
    notes: 'I have a lot of experience with shy animals and can offer a patient and understanding home. My cats are used to dogs.',
    summary: 'This applicant has an ideal background, working as a vet tech with experience in animal behavior. Their existing pets are socialized with dogs, making this a very strong application.'
  }
];

const buddyApplicants: Applicant[] = [
  {
    id: 'app-b-1',
    name: 'The Kim Family',
    submissionDate: '1 day ago',
    householdInfo: '2 adults, 2 children (ages 9, 14), large fenced yard.',
    currentPetsInfo: 'No other pets.',
    notes: 'We are a very active family and are looking for a dog to join us on hikes and adventures. We have been waiting for the right dog for a long time.',
    summary: 'This family offers an active lifestyle that matches Buddy\'s breed characteristics. Their large yard is a plus, and the children are old enough to interact responsibly. Strong application pending reference checks.'
  }
];

const mittensApplicants: Applicant[] = [
  {
    id: 'app-m-1',
    name: 'Jessica Williams',
    submissionDate: '3 days ago',
    householdInfo: 'Single adult, quiet apartment.',
    currentPetsInfo: 'No other pets.',
    notes: 'Looking for a calm companion. My apartment is small but I can provide a loving indoor home.',
    summary: 'A good candidate seeking a single companion animal. Her quiet home would be a good environment for a cat like Mittens. Landlord approval has been confirmed.'
  },
  {
    id: 'app-m-2',
    name: 'The Chen Family',
    submissionDate: '5 days ago',
    householdInfo: '2 adults, 1 senior citizen.',
    currentPetsInfo: '1 cat (8yo).',
    notes: 'My mother lives with us and would love a gentle cat to keep her company during the day.',
    summary: 'This multi-generational household offers constant companionship. The presence of another cat suggests they are experienced owners. The primary motivation to provide companionship for a senior is a positive indicator.'
  }
];

const daisyInquirers: Inquirer[] = [
  {
    id: 'inq-d-1',
    name: 'PF_User_12345',
    submissionDate: '2 days ago',
    emailBody: 'Hi, I saw Daisy on Petfinder. Is she potty trained? We have carpets so this is important. Thanks!',
  },
  {
    id: 'inq-d-2',
    name: 'John S.',
    submissionDate: '4 days ago',
    emailBody: 'Hello, I\'m interested in Daisy. The profile says she is good with other dogs. Is she good with small dogs specifically? I have a chihuahua.',
  },
];

const banditInquirers: Inquirer[] = [
  {
    id: 'inq-b-1',
    name: 'PF_User_67890',
    submissionDate: '1 day ago',
    emailBody: 'Does Bandit bark a lot? I live in an apartment and need a relatively quiet dog.',
  },
];


const workflowCards: CardData[] = [
    // Emails & Contact Form
    createCard(601, 'Emails & Contact Form', 'Email from info@example.com', 'Subject: Donation Inquiry', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, {
        sender: 'info@example.com',
        subject: 'Donation Inquiry',
        aiAction: 'Forwarded to fundraising team.',
        threadUrl: '#',
        status: EmailStatus.Resolved,
        thread: [
            {
                sender: 'info@example.com',
                timestamp: 'Yesterday at 10:30 AM',
                body: 'Hello, I was wondering if you accept donations of gently used pet supplies? I have some blankets and toys my dog no longer uses. Thanks!'
            },
            {
                sender: 'You (AI Assistant)',
                timestamp: 'Yesterday at 10:32 AM',
                body: 'Thank you for thinking of us! We do accept donations of new and gently used items. I have forwarded your message to our fundraising team, and someone will get back to you shortly with details on how to drop them off. We appreciate your support!'
            },
            {
                sender: 'Jane Doe (Fundraising)',
                timestamp: 'Today at 9:15 AM',
                body: 'Hi there, thanks so much for your generous offer! You can drop off donations any day between 10am and 4pm. Our address is 789 Paws Rd, Anytown, USA. Just come to the front desk. Thanks again!'
            }
        ]
    }, undefined),
    createCard(602, 'Emails & Contact Form', 'Email from sarah.p@email.com', 'Subject: Question about "Luna"', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, {
        sender: 'sarah.p@email.com',
        subject: 'Question about "Luna"',
        aiAction: 'Responded with standard info and linked foster coordinator.',
        threadUrl: '#',
        status: EmailStatus.Resolved,
        thread: [
          {
            sender: 'sarah.p@email.com',
            timestamp: 'Yesterday at 3:15 PM',
            body: 'Hi, I saw Luna on Petfinder. Is she good with kids?'
          },
          {
            sender: 'You (AI Assistant)',
            timestamp: 'Yesterday at 3:16 PM',
            body: 'Thanks for your interest in Luna! Based on her foster report, she is wonderful with children. I\'ve CC\'d her foster coordinator who can provide more details if you\'d like. Would you be interested in filling out an adoption application?'
          }
        ]
    }, undefined),
     createCard(603, 'Emails & Contact Form', 'Email from urgent@adopter.com', 'Subject: URGENT: Issue with recent adoption "Sparky"', '', null, Urgency.High, ['Action Needed'], undefined, undefined, undefined, undefined, undefined, {
      sender: 'urgent@adopter.com',
      subject: 'URGENT: Issue with recent adoption "Sparky"',
      aiAction: 'Flagged as urgent, needs immediate human review.',
      threadUrl: '#',
      status: EmailStatus.Urgent,
      thread: [
        {
          sender: 'urgent@adopter.com',
          timestamp: 'Today at 11:00 AM',
          body: 'We adopted Sparky two days ago and he has been coughing a lot and seems to have very low energy. We are very concerned. Is this something you were aware of? We are taking him to our vet this afternoon but wanted to let you know immediately.'
        }
      ]
    }, undefined),

    // Finalized Adoptions
    createCard(701, 'Finalized Adoptions', 'Bella (Dog)', '', '', null, Urgency.High, ['Action Needed'], undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Bella',
      animalType: 'Dog',
      adopterName: 'the Smith Family',
      adoptionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=400',
      paperworkScanned: false,
      agreementSent: true,
    }),
    createCard(702, 'Finalized Adoptions', 'Leo (Cat)', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Leo',
      animalType: 'Cat',
      adopterName: 'Jane Doe',
      adoptionDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69841006?q=80&w=400',
      paperworkScanned: true,
      agreementSent: true,
    }),
    createCard(703, 'Finalized Adoptions', 'Rocky (Dog)', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Rocky',
      animalType: 'Dog',
      adopterName: 'the Miller Family',
      adoptionDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=400',
      paperworkScanned: true,
      agreementSent: true,
    }),
    
    // New Animals
    createCard(801, 'New Animals', 'Buddy', '', '', null, Urgency.High, ['Action Needed'], undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      name: 'Buddy',
      breed: 'Golden Retriever Mix',
      age: '2 years',
      gender: 'Male',
      intakeDate: new Date('2024-07-29').toISOString(),
      images: [
        'https://images.unsplash.com/photo-1611252352589-404d7d1c3d0e?q=80&w=400',
        'https://images.unsplash.com/photo-1588022275635-4a8a2f1b4edc?q=80&w=400',
      ],
      compatibility: { cats: false, smallDogs: true, largeDogs: null },
      idealHousehold: { adults: true, children: true, seniors: null, infants: false },
      jotformLink: '#',
    }),
    createCard(802, 'New Animals', 'Mittens', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      name: 'Mittens',
      breed: 'Domestic Shorthair',
      age: '1 year',
      gender: 'Female',
      intakeDate: new Date('2024-07-28').toISOString(),
      images: [
        'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=400'
      ],
      compatibility: { cats: true, smallDogs: true, largeDogs: true },
      idealHousehold: { adults: true, children: true, seniors: true, infants: true },
      jotformLink: '#',
    }),
     createCard(803, 'New Animals', 'Bandit', '', '', null, Urgency.High, ['Action Needed'], undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      name: 'Bandit',
      breed: 'German Shepherd Mix',
      age: '1 year',
      gender: 'Male',
      intakeDate: new Date('2024-07-25').toISOString(),
      images: [
        'https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=400',
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400',
        'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=400',
      ],
      compatibility: { cats: false, smallDogs: true, largeDogs: true },
      idealHousehold: { adults: true, children: false, seniors: false, infants: false },
      jotformLink: '#',
    }),

    // New Applications
    createCard(901, 'New Applications', 'Fiona', '', '', null, Urgency.High, ['Action Needed'], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Fiona',
      animalImageUrl: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=400',
      applicationCount: 3,
      status: NewApplicationStatus.ACTION_NEEDED,
      reviewLink: '#',
      applicants: fionaApplicants,
    }),
    createCard(902, 'New Applications', 'Gus', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Gus',
      animalImageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=400',
      applicationCount: 2,
      status: NewApplicationStatus.AI_APPROVED,
      reviewLink: '#',
      applicants: gusApplicants,
    }),
    createCard(903, 'New Applications', 'Penelope', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Penelope',
      animalImageUrl: 'https://images.unsplash.com/photo-1605947343468-809b0a2a4b8b?q=80&w=400',
      applicationCount: 1,
      status: NewApplicationStatus.AI_APPROVED,
      reviewLink: '#',
      applicants: penelopeApplicants,
    }),
    createCard(904, 'New Applications', 'Buddy', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Buddy',
      animalImageUrl: 'https://images.unsplash.com/photo-1611252352589-404d7d1c3d0e?q=80&w=400',
      applicationCount: 1,
      status: NewApplicationStatus.AI_APPROVED,
      reviewLink: '#',
      applicants: buddyApplicants,
    }),
    createCard(905, 'New Applications', 'Mittens', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Mittens',
      animalImageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=400',
      applicationCount: 2,
      status: NewApplicationStatus.AI_APPROVED,
      reviewLink: '#',
      applicants: mittensApplicants,
    }),
    
    // Petfinder Inquiries
    createCard(1001, 'Petfinder Inquiries', 'Daisy', '', '', null, Urgency.Medium, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Daisy',
      animalImageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=400',
      inquiryCount: 2,
      inquirers: daisyInquirers,
    }),
    createCard(1002, 'Petfinder Inquiries', 'Bandit', '', '', null, Urgency.Medium, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
      animalName: 'Bandit',
      animalImageUrl: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=400',
      inquiryCount: 1,
      inquirers: banditInquirers,
    }),
    
    // Social Posts
    createCard(1101, 'Social Posts', 'Instagram Post', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
        platform: SocialPostPlatform.Instagram,
        mediaUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=400',
        mediaType: 'image',
        likes: 1200,
        comments: 88,
        shares: 112,
        postUrl: '#',
    }),
    createCard(1102, 'Social Posts', 'TikTok Post', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
        platform: SocialPostPlatform.TikTok,
        mediaUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=400',
        mediaType: 'video',
        likes: 2300,
        comments: 150,
        shares: 205,
        postUrl: '#',
    }),
     createCard(1103, 'Social Posts', 'Facebook Post', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
        platform: SocialPostPlatform.Facebook,
        mediaUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400',
        mediaType: 'image',
        likes: 125,
        comments: 12,
        shares: 8,
        postUrl: '#',
    }),
    createCard(1104, 'Social Posts', 'Facebook post', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
        platform: SocialPostPlatform.Facebook,
        mediaUrl: '',
        mediaType: 'image',
        likes: 0,
        comments: 23,
        shares: 15,
        postUrl: '#',
    }),
    
    // Upcoming Adoption Events
    createCard(109, 'Upcoming Adoption Events', 'Adoption Day @ Petco', 'Fri, 8/2 @ 11:00 AM', 'Join us at Petco in Sunnyvale for a fun adoption event!', 
        React.createElement('div', null, React.createElement('p', null, 'Full event details.')), 
        Urgency.Info, ['Event'], {
          locationName: 'Petco, Sunnyvale',
          address: '123 E El Camino Real, Sunnyvale, CA',
          date: 'Friday, August 2, 2024',
          time: '11:00 AM - 3:30 PM',
          description: 'Join us this Saturday for a chance to meet your new best friend! We will have over 15 adoptable dogs and cats.',
          participatingAnimals: [
            { name: 'Buddy', imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
            { name: 'Lucy', imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
            { name: 'Max', imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
          ],
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.242312948035!2d-122.0354123846949!3d37.3860519798315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb64f7c6e0c6f%3A0x3334ac135013054!2sSunnyvale%2C%2C%20CA%2094086!5e0!3m2!1sen!2sus!4v1628109653915!5m2!1sen!2sus'
        }, undefined, undefined, undefined, undefined, undefined, undefined),
    createCard(117, 'Upcoming Adoption Events', 'Clear the Shelters', 'Sat, 8/16 @ 10:00 AM', 'A huge event in partnership with the Humane Society.', 
        React.createElement('div', null, React.createElement('p', null, 'Full event details.')), 
        Urgency.Info, ['Event'], {
          locationName: 'Humane Society Silicon Valley',
          address: '901 Ames Ave, Milpitas, CA',
          date: 'Saturday, August 16, 2024',
          time: '10:00 AM - 4:00 PM',
          description: 'Clear the Shelters is a nationwide pet adoption drive. We are excited to participate and find homes for as many animals as possible. Adoption fees will be reduced for this special event.',
          participatingAnimals: [
            { name: 'Daisy', imageUrl: 'https://placekitten.com/104/104' },
            { name: 'Bandit', imageUrl: 'https://placekitten.com/105/105' },
          ],
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.807897184224!2d-121.9189!3d37.422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc9c0f0555555%3A0xcb7f2f7b8b4c7c8f!2sHumane%20Society%20Silicon%20Valley!5e0!3m2!1sen!2sus!4v1628109812154!5m2!1sen!2sus'
        }, undefined, undefined, undefined, undefined, undefined, undefined),

    // Vet Appointments
    createCard(201, 'Vet Appointments', 'Luna', 'Check-up', '', React.createElement('p', null, 'Needs scheduling'), Urgency.High, ['Action Needed'], undefined, {
        status: VetAppointmentStatus.Unscheduled,
        animalName: 'Luna',
        service: 'Check-up',
        clinicName: 'Anytown Animal Hospital',
        clinicAddress: '456 Pet Ave, Anytown',
        date: 'Needs Scheduling',
        dropOffTime: null,
        dropOffBy: null,
        pickUpTime: null,
        pickUpBy: null,
        scheduleLink: '#', // Placeholder Jotform link
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12692.799719875883!2d-122.03459039999999!3d37.3860517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb64f7c6e0c6f%3A0x3334ac135013054!2sSunnyvale%2C%20CA!5e0!3m2!1sen!2sus!4v1692812424921!5m2!1sen!2sus',
    }, undefined, undefined, undefined, undefined, undefined),
    createCard(202, 'Vet Appointments', 'Max', 'Vaccination Booster', '', React.createElement('p', null, 'Needs pick up volunteer'), Urgency.High, ['Action Needed'], undefined, {
        status: VetAppointmentStatus.NeedsTransport,
        animalName: 'Max',
        service: 'Vaccination Booster',
        clinicName: 'Happy Paws Vet Clinic',
        clinicAddress: '123 Vet Street, Anytown',
        date: 'Tomorrow',
        dropOffTime: '10:30 AM',
        dropOffBy: 'Alice Smith',
        pickUpTime: '11:00 AM',
        pickUpBy: null,
        signUpLink: '#', // Placeholder Jotform link
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12692.799719875883!2d-122.03459039999999!3d37.3860517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb64f7c6e0c6f%3A0x3334ac135013054!2sSunnyvale%2C%20CA!5e0!3m2!1sen!2sus!4v1692812424921!5m2!1sen!2sus',
    }, undefined, undefined, undefined, undefined, undefined),
    createCard(203, 'Vet Appointments', 'Charlie', 'Spay/Neuter', '', React.createElement('p', null, 'Needs drop off and pick up volunteers'), Urgency.High, ['Action Needed'], undefined, {
        status: VetAppointmentStatus.NeedsTransport,
        animalName: 'Charlie',
        service: 'Spay/Neuter',
        clinicName: 'Happy Paws Vet Clinic',
        clinicAddress: '123 Vet Street, Anytown',
        date: 'Tue, Oct 7',
        dropOffTime: '9:00 AM',
        dropOffBy: null,
        pickUpTime: '5:00 PM',
        pickUpBy: null,
        signUpLink: '#', // Placeholder Jotform link
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12692.799719875883!2d-122.03459039999999!3d37.3860517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb64f7c6e0c6f%3A0x3334ac135013054!2sSunnyvale%2C%20CA!5e0!3m2!1sen!2sus!4v1692812424921!5m2!1sen!2sus',
    }, undefined, undefined, undefined, undefined, undefined),
    createCard(204, 'Vet Appointments', 'Rocky', 'Dental Cleaning', '', React.createElement('p', null, 'Transport covered'), Urgency.Low, [], undefined, {
        status: VetAppointmentStatus.FullyStaffed,
        animalName: 'Rocky',
        service: 'Dental Cleaning',
        clinicName: 'Anytown Animal Hospital',
        clinicAddress: '456 Pet Ave, Anytown',
        date: 'Fri, Oct 10',
        dropOffTime: '8:00 AM',
        dropOffBy: 'Bob Johnson',
        pickUpTime: '4:00 PM',
        pickUpBy: 'Bob Johnson',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12692.799719875883!2d-122.03459039999999!3d37.3860517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb64f7c6e0c6f%3A0x3334ac135013054!2sSunnyvale%2C%20CA!5e0!3m2!1sen!2sus!4v1692812424921!5m2!1sen!2sus',
    }, undefined, undefined, undefined, undefined, undefined),

    // Document Verifications
    createCard(301, 'Document Verifications', 'Oscar', 'Maria Garcia - Submitted 10/04/25', '', null, Urgency.High, ['Action Needed'], undefined, undefined, {
        animalName: 'Oscar',
        applicantName: 'Maria Garcia',
        submissionDate: '10/04/25',
        residencyStatus: 'Documents uploaded',
        vetStatus: 'Information provided',
        reviewLink: '#',
        uploadedDocuments: [{ label: 'Residency Proof (Utility Bill)', url: '#' }],
        providedInfo: { title: 'Provided Vet Information', content: 'Vet Clinic: Happy Paws\nPhone: 555-123-4567\nContact: Dr. Smith' },
    }, undefined, undefined, undefined, undefined),
    createCard(302, 'Document Verifications', 'Nala', 'David Williams - Submitted 10/03/25', '', null, Urgency.High, ['Action Needed'], undefined, undefined, {
        animalName: 'Nala',
        applicantName: 'David Williams',
        submissionDate: '10/03/25',
        residencyStatus: 'Information provided',
        vetStatus: 'Documents uploaded',
        reviewLink: '#',
        uploadedDocuments: [{ label: 'Vet Records - Nala', url: '#' }],
        providedInfo: { title: 'Provided Residency Information', content: 'Landlord: Jane Doe\nPhone: 555-987-6543' },
    }, undefined, undefined, undefined, undefined),
    createCard(303, 'Document Verifications', 'Buddy', 'Sophia Chen - Submitted 10/02/25', '', null, Urgency.High, ['Action Needed'], undefined, undefined, {
        animalName: 'Buddy',
        applicantName: 'Sophia Chen',
        submissionDate: '10/02/25',
        residencyStatus: 'Documents uploaded',
        vetStatus: 'N/A',
        reviewLink: '#',
        uploadedDocuments: [
          { label: 'Residency Proof (Lease)', url: '#' },
          { label: 'Personal Reference Letter', url: '#' }
        ],
    }, undefined, undefined, undefined, undefined),
    
    // Meet & Greets / Follow-ups
    createCard(401, 'Meet & Greets / Follow-ups', 'Johnson Family & Rocky', '', '', null, Urgency.Low, [], undefined, undefined, undefined, {
        type: MeetAndGreetType.MeetAndGreet,
        familyName: 'Johnson Family',
        animalName: 'Rocky',
        dateTime: 'Aug 2, 2:00 PM',
        statusText: 'Meet & Greet Scheduled',
        householdInfo: '2 adults, 2 children (ages 8, 12)',
        currentPetsInfo: '1 dog (Golden Retriever, 5yo)',
        applicantNotes: 'We have a large fenced yard and are looking for an active companion for our dog, Daisy. We are experienced dog owners.',
    }, undefined, undefined, undefined),
    createCard(402, 'Meet & Greets / Follow-ups', 'Chen Family & Daisy', '', '', null, Urgency.Medium, [], undefined, undefined, undefined, {
        type: MeetAndGreetType.FollowUp,
        familyName: 'Chen Family',
        animalName: 'Daisy',
        statusText: 'Follow-up Sequence Active',
        timelineText: 'Meet & Greet was 4 days ago',
        followUpItems: [
            { title: 'Day 1 Text', status: FollowUpStatus.Sent },
            { title: 'Day 3 Text', status: FollowUpStatus.Sent },
            { title: 'Day 7 Text', status: FollowUpStatus.Scheduled },
        ],
        householdInfo: '2 adults, 1 child (age 10)',
        currentPetsInfo: 'No other pets.',
        applicantNotes: 'Looking for a calm companion. We have a quiet home and a lot of love to give.',
    }, undefined, undefined, undefined),

    // Calls & Texts
    createCard(501, 'Calls & Texts', 'Voicemail from (555) 123-4567', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Call,
        status: CommunicationStatus.Info,
        from: '(555) 123-4567',
        summary: 'Inquiry about volunteering opportunities.',
        aiAnalysis: 'AI suggested sending volunteer info link.',
        fullTranscript: "Hi, my name is John Smith. I was on your website and I'm interested in volunteering. I was hoping to get some more information about what kind of roles you have available and how to get started. My number is 555-123-4567. Thank you.",
    }, undefined, undefined),
    createCard(502, 'Calls & Texts', 'Missed Call from (555) 867-5309', '', '', null, Urgency.High, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Call,
        status: CommunicationStatus.ActionNeeded,
        from: '(555) 867-5309',
        summary: 'Caller hung up before speaking. No voicemail.',
        aiAnalysis: 'Suggest callback to inquire.',
    }, undefined, undefined),
    createCard(503, 'Calls & Texts', 'Call from Animal Control', '', '', null, Urgency.Info, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Call,
        status: CommunicationStatus.Resolved,
        from: 'Animal Control',
        summary: 'Confirmed intake of a stray beagle.',
        aiAnalysis: 'AI handled call, logged intake, and created a task to schedule a vet check-up. No action needed.',
    }, undefined, undefined),
    createCard(504, 'Calls & Texts', 'Call from (555) 555-1212', '', '', null, Urgency.High, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Call,
        status: CommunicationStatus.ActionNeeded,
        from: '(555) 555-1212',
        summary: 'Caller had detailed questions about the adoption process for special needs animals.',
        aiAnalysis: 'AI answered basic questions but suggests a senior adoption counselor call back to provide more nuanced information.',
    }, undefined, undefined),
    createCard(505, 'Calls & Texts', 'Text from (555) 222-3333', '', '', null, Urgency.High, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Text,
        status: CommunicationStatus.Urgent,
        from: '(555) 222-3333',
        summary: '',
        urgentText: '"I think the dog I adopted from you yesterday is sick, he is not eating and is very lethargic."',
        aiAnalysis: 'High urgency, potential medical issue.',
    }, undefined, undefined),
    createCard(506, 'Calls & Texts', 'Text from (555) 987-6543', '', '', null, Urgency.Medium, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Text,
        status: CommunicationStatus.ActionNeeded,
        from: '(555) 987-6543',
        summary: 'Question about temperament with cats.',
        aiAnalysis: 'Needs response from foster.',
        conversation: [
            { sender: 'user', text: "Hi, I saw Buddy on your website. Can you tell me if he gets along with cats?" },
            { sender: 'ai', text: "Thanks for asking about Buddy! That's a great question. I am flagging this for his foster coordinator to answer for you. They will get back to you shortly." },
        ],
    }, undefined, undefined),
    createCard(507, 'Calls & Texts', 'Text from The Miller Family', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Text,
        status: CommunicationStatus.Resolved,
        from: 'The Miller Family',
        summary: 'Sent a picture of Rocky in his new home saying "He\'s settling in great!"',
        aiAnalysis: 'AI responded with a thank you message. No action needed.',
    }, undefined, undefined),
    createCard(508, 'Calls & Texts', 'Text from (555) 444-5555', '', '', null, Urgency.Low, [], undefined, undefined, undefined, undefined, {
        type: CommunicationType.Text,
        status: CommunicationStatus.Resolved,
        from: '(555) 444-5555',
        summary: '"Hi are you guys open on Sundays?"',
        aiAnalysis: 'AI responded with store hours and a link to the website. No action needed.',
    }, undefined, undefined),
];

const resources: ResourceLink[] = [
    { id: 'res-1', title: 'Google Drive - Records', url: '#', description: 'Access all scanned vet records and adoption paperwork.' },
    { id: 'res-2', title: 'Google Calendar - Events', url: '#', description: 'View and manage all upcoming appointments and events.' },
    { id: 'res-3', title: 'Jotform - Applications', url: '#', description: 'Review new and existing adoption/foster applications.' },
    { id: 'res-4', title: 'Petfinder Portal', url: '#', description: 'Manage our public listings on Petfinder.' },
    { id: 'res-5', title: 'Social Media Schedule', url: '#', description: 'Content calendar for Instagram, Facebook, and TikTok.' },
];


export const fetchHomeData = (): Promise<CardData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(homeCards), 500));
};

export const fetchWorkflowData = (): Promise<CardData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(workflowCards), 500));
};

export const fetchResources = (): Promise<ResourceLink[]> => {
  return new Promise(resolve => setTimeout(() => resolve(resources), 500));
};

export const fetchAIChatResponse = (message: string): Promise<ChatMessage> => {
    const responses = [
        "That's a great question. Based on our records, the last heartworm prevention was administered on the 15th of last month.",
        "I can help with that. The adoption event is scheduled for this Saturday at the downtown PetCo from 11 AM to 2 PM.",
        "Let me check the calendar. Dr. Evans is available for appointments tomorrow afternoon.",
        "I've scanned the recent applications. The Miller family seems like a promising match for 'Rocky'. They have a large, fenced yard and experience with the breed."
    ];
    const responseText = responses[Math.floor(Math.random() * responses.length)];
    const response: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: responseText,
        sender: 'ai'
    };
    return new Promise(resolve => setTimeout(() => resolve(response), 1000));
}