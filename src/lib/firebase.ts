import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCpNsEJA7vh5NCmzWHjeMVLBYXgqG77ups",
  authDomain: "growthatlas-2d272.firebaseapp.com",
  projectId: "growthatlas-2d272",
  storageBucket: "growthatlas-2d272.firebasestorage.app",
  messagingSenderId: "850491888708",
  appId: "1:850491888708:web:f894c8973f7df3c4409811",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
