// FIX: Import React to use React.ReactNode type.
import type React from 'react';

export type Page = 'home' | 'workflow' | 'resources' | 'chat';

export enum Urgency {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  Info = 'info',
}

export enum VetAppointmentStatus {
  Unscheduled = 'UNSCHEDULED',
  NeedsTransport = 'NEEDS_TRANSPORT',
  FullyStaffed = 'FULLY_STAFFED',
}

export interface VetAppointmentDetails {
  status: VetAppointmentStatus;
  animalName: string;
  service: string;
  clinicName: string;
  clinicAddress: string;
  date: string;
  dropOffTime: string | null;
  dropOffBy: string | null;
  pickUpTime: string | null;
  pickUpBy: string | null;
  scheduleLink?: string;
  signUpLink?: string;
  mapUrl?: string;
}

export interface UploadedDocument {
  label: string;
  url: string;
}

export interface ProvidedInfo {
  title: string;
  content: string;
}

export interface DocVerificationDetails {
  animalName: string;
  applicantName: string;
  submissionDate: string;
  residencyStatus: string;
  vetStatus: string;
  reviewLink: string;
  uploadedDocuments?: UploadedDocument[];
  providedInfo?: ProvidedInfo;
}

export interface EventAnimal {
  name: string;
  imageUrl: string;
}

export interface EventDetails {
  locationName: string;
  address: string;
  date: string;
  time: string;
  description: string;
  participatingAnimals: EventAnimal[];
  mapUrl: string;
}

export enum MeetAndGreetType {
  MeetAndGreet = 'MEET_AND_GREET',
  FollowUp = 'FOLLOW_UP',
}

export enum FollowUpStatus {
  Sent = 'SENT',
  Scheduled = 'SCHEDULED',
}

export interface FollowUpItem {
  status: FollowUpStatus;
  title: string;
}

export interface MeetAndGreetDetails {
  type: MeetAndGreetType;
  familyName: string;
  animalName: string;
  statusText: string;
  // For Meet & Greet
  dateTime?: string;
  householdInfo?: string;
  currentPetsInfo?: string;
  applicantNotes?: string;
  // For Follow-up
  timelineText?: string;
  followUpItems?: FollowUpItem[];
}

export enum CommunicationType {
  Call = 'CALL',
  Text = 'TEXT',
}

export enum CommunicationStatus {
  Urgent = 'URGENT',
  ActionNeeded = 'ACTION_NEEDED',
  Resolved = 'RESOLVED',
  Info = 'INFO',
}

export interface CommunicationDetails {
  type: CommunicationType;
  status: CommunicationStatus;
  from: string;
  summary: string;
  urgentText?: string;
  aiAnalysis: string;
  fullTranscript?: string;
  conversation?: { sender: 'user' | 'ai'; text: string }[];
}

export enum EmailStatus {
  Urgent = 'URGENT',
  Resolved = 'RESOLVED',
}

export interface EmailMessage {
  sender: string;
  timestamp: string;
  body: string;
}

export interface EmailDetails {
  sender: string;
  subject: string;
  aiAction: string;
  threadUrl: string;
  status: EmailStatus;
  thread?: EmailMessage[];
}

export interface AdoptionDetails {
  animalName: string;
  animalType: string;
  adopterName: string;
  adoptionDate: string; // ISO string date
  imageUrl: string;
  paperworkScanned: boolean;
  agreementSent: boolean;
}

export interface NewAnimalDetails {
  name: string;
  breed: string;
  age: string;
  gender: string;
  intakeDate: string; // ISO string
  images: string[];
  compatibility: {
    cats: boolean | null;
    smallDogs: boolean | null;
    largeDogs: boolean | null;
  };
  idealHousehold: {
    adults: boolean | null;
    children: boolean | null;
    seniors: boolean | null;
    infants: boolean | null;
  };
  jotformLink: string;
}

export enum NewApplicationStatus {
  AI_APPROVED = 'AI_APPROVED',
  ACTION_NEEDED = 'ACTION_NEEDED',
}

export interface Applicant {
  id: string;
  name: string;
  submissionDate: string;
  householdInfo: string;
  currentPetsInfo: string;
  notes: string;
  summary: string;
}

export interface NewApplicationDetails {
  animalName: string;
  animalImageUrl: string;
  applicationCount: number;
  status: NewApplicationStatus;
  reviewLink: string;
  applicants: Applicant[];
}

export interface Inquirer {
  id: string;
  name: string;
  submissionDate: string;
  emailBody: string;
}

export interface PetfinderInquiryDetails {
  animalName: string;
  animalImageUrl: string;
  inquiryCount: number;
  inquirers: Inquirer[];
}

export enum SocialPostPlatform {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  TikTok = 'TIKTOK',
}

export interface SocialPostDetails {
  platform: SocialPostPlatform;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  likes: number;
  comments: number;
  shares: number;
  postUrl: string;
}

export interface CardData {
  id: string;
  // FIX: Add missing 'category' property to resolve type errors.
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  details: React.ReactNode;
  urgency: Urgency;
  tags: string[];
  actions?: { label: string; action: () => void }[];
  eventDetails?: EventDetails;
  vetAppointmentDetails?: VetAppointmentDetails;
  docVerificationDetails?: DocVerificationDetails;
  meetAndGreetDetails?: MeetAndGreetDetails;
  communicationDetails?: CommunicationDetails;
  emailDetails?: EmailDetails;
  adoptionDetails?: AdoptionDetails;
  newAnimalDetails?: NewAnimalDetails;
  newApplicationDetails?: NewApplicationDetails;
  petfinderInquiryDetails?: PetfinderInquiryDetails;
  socialPostDetails?: SocialPostDetails;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}