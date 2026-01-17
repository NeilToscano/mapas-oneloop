// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDWgCplQpzw0COz16yYw69jdbd5x7FId08',
  authDomain: 'aloja-9b832.firebaseapp.com',
  projectId: 'aloja-9b832',
  storageBucket: 'aloja-9b832.appspot.com',
  messagingSenderId: '335354221138',
  appId: '1:335354221138:web:dbd263482963789660858b',
  measurementId: 'G-R88RZC311T'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)
