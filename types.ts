import { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  text: string;
  createdAt: Timestamp;
  room: string;
  uid: string;
  displayName: string;
  photoURL: string | null;
}