// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBy0ZU3gTAtvPkvM_4Y7zelsa7TA_TjJy0",
    authDomain: "logotv2-a1ca2.firebaseapp.com",
    projectId: "logotv2-a1ca2",
    storageBucket: "logotv2-a1ca2.appspot.com",
    messagingSenderId: "127797547018",
    appId: "1:127797547018:web:df47ad9f2981035bc8cff3",
    measurementId: "G-SY4W1W5BCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

export { storage }