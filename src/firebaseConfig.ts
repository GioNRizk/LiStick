// src/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ✅ Use your existing Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDu3aQ-o13QCFVbM1vcIiH1pTiKdfeKs5g",
  authDomain: "fyp2app-597.firebaseapp.com",
  projectId: "fyp2app-597",
  storageBucket: "fyp2app-597.appspot.com",
  messagingSenderId: "987587665234",
  appId: "1:987587665234:web:b0d42886ada23ee5e82e8b",
  measurementId: "G-RJLFNML3M3",
  databaseURL: "https://fyp2app-597-default-rtdb.firebaseio.com",
};

// ✅ Initialize only once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ✅ Export the Firestore + Realtime DB + Auth
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
