import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN!
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID!
const FIREBASE_STORAGE_BUCKET =  process.env.FIREBASE_STORAGE_BUCKET!
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID!
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID!


export default function initializeFirebaseClient(): {
  db: Firestore;
  auth: Auth;
} {
  const firebaseApp = initializeApp({
    apiKey: `${FIREBASE_API_KEY}`,
    authDomain: `${FIREBASE_AUTH_DOMAIN}`,
    projectId: `${FIREBASE_PROJECT_ID}`,
    storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${FIREBASE_APP_ID}`,
  });

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  return {
    db,
    auth,
  };
}