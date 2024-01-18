import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'todolist-drv98.firebaseapp.com',
  projectId: 'todolist-drv98',
  storageBucket: 'todolist-drv98.appspot.com',
  messagingSenderId: '496208153776',
  appId: '1:496208153776:web:2ab44b390e59c18f0dff75',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// 파이어스토어 db
export const db = getFirestore();
