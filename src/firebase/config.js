// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrsCM0jo5DYFA_z4gRRtC7bnZ7eVje7OY",
  authDomain: "home-2318e.firebaseapp.com",
  projectId: "home-2318e",
  storageBucket: "home-2318e.appspot.com",
  messagingSenderId: "922846313999",
  appId: "1:922846313999:web:e1b95f756410848208ad7a",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication hizmetinin referansını al
export const auth = getAuth(app)

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veri tabanı hizmetinin referansını al

export const db = getFirestore(app);