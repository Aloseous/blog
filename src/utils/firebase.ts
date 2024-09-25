// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE,
    authDomain: "blog-53290.firebaseapp.com",
    projectId: "blog-53290",
    storageBucket: "blog-53290.appspot.com",
    messagingSenderId: "492072686516",
    appId: "1:492072686516:web:4ea661b978066ee48198e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);