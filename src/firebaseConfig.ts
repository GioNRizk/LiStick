// src/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL as string,
};

// Optional: quick sanity check so you don’t run with missing vars
for (const [k, v] of Object.entries(cfg)) {
  if (!v) {
    console.warn(`[firebaseConfig] Missing env var: ${k}`);
  }
}

// Initialize only once
const app = getApps().length ? getApps()[0] : initializeApp(cfg);

// Exports
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
