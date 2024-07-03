// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Skkun1AoS3n7WR1qd55CsALq3Cb0OEo",
  authDomain: "pascal-niri-portfolio.firebaseapp.com",
  projectId: "pascal-niri-portfolio",
  storageBucket: "pascal-niri-portfolio",
  messagingSenderId: "891360305625",
  appId: "1:891360305625:web:6af190b8eed19873bdb9c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
