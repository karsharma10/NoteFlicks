import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAUqrg-IXRPrAGuYIk3UHxXUXr4gbuK0MQ",
  authDomain: "noteflicks-2b7eb.firebaseapp.com",
  projectId: "noteflicks-2b7eb",
  storageBucket: "noteflicks-2b7eb.appspot.com",
  messagingSenderId: "595509252103",
  appId: "1:595509252103:web:4625da745198e379c79aa2"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(app);