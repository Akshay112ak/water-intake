import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "************************",
  authDomain: "************************",
  projectId: "************************",
  storageBucket: "************************",
  messagingSenderId: "************************",
  appId: "************************",
  measurementId: "************************"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };