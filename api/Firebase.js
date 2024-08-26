// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcDtFPfHczHOtav9UqWY7gSKR3N_19DtU",
  authDomain: "insightia-a0a78.firebaseapp.com",
  projectId: "insightia-a0a78",
  storageBucket: "insightia-a0a78.appspot.com",
  messagingSenderId: "509321646917",
  appId: "1:509321646917:web:1a863567a5be782145e42c",
  measurementId: "G-5VMEG2PQNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
