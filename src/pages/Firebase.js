// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "@firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDPOefG-386hpjk1sTtl9jiyJOuoelhUjs",
//   authDomain: "e-comm-8a8c3.firebaseapp.com",
//   projectId: "e-comm-8a8c3",
//   storageBucket: "e-comm-8a8c3.firebasestorage.app",
//   messagingSenderId: "67506605906",
//   appId: "1:67506605906:web:d1d795e4b96ac4bfb2748b",
//   measurementId: "G-LRMQ3STNK4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//  export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db= getFirestore(app);






// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPOefG-386hpjk1sTtl9jiyJOuoelhUjs",
  authDomain: "e-comm-8a8c3.firebaseapp.com",
  projectId: "e-comm-8a8c3",
  storageBucket: "e-comm-8a8c3.firebasestorage.app",
  messagingSenderId: "67506605906",
  appId: "1:67506605906:web:d1d795e4b96ac4bfb2748b",
  measurementId: "G-LRMQ3STNK4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
