// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAAId6z9Z_dUZwVYKpXVK4VbFxgNZRnoNI',
  authDomain: 'admin-cbff9.firebaseapp.com',
  projectId: 'admin-cbff9',
  storageBucket: 'admin-cbff9.appspot.com',
  messagingSenderId: '513518469707',
  appId: '1:513518469707:web:193664175a3541986883ce',
  measurementId: 'G-QHCCXLHZ2Z'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
