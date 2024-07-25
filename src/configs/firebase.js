import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVhlJDwX60K0_AxSDcYDMRwfs2zfFWiV4',
  authDomain: 'codeco-shop.firebaseapp.com',
  projectId: 'codeco-shop',
  storageBucket: 'codeco-shop.appspot.com',
  messagingSenderId: '139250199107',
  appId: '1:139250199107:web:58c273e9caaacddc6b42f6',
  measurementId: 'G-X6QQ18QYDT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
