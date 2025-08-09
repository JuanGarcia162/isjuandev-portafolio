import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDe2aRlpmf0sPIiyn4KhvEj_WTlbsaDV3s",
  authDomain: "isjuandev-portafolio.firebaseapp.com",
  projectId: "isjuandev-portafolio",
  storageBucket: "isjuandev-portafolio.firebasestorage.app",
  messagingSenderId: "300034305453",
  appId: "1:300034305453:web:44d46c84a2b47909700524",
  measurementId: "G-Y2TE0JJHYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, 'us-central1');

// Si estamos en desarrollo, conectar al emulador de funciones
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { auth, db, functions };