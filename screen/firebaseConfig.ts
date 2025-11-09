// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAigV_NbzYhK1eELN225iGbv0g1p0fFxFM",
  authDomain: "oxecomprei-15bf4.firebaseapp.com",
  projectId: "oxecomprei-15bf4",
  storageBucket: "oxecomprei-15bf4.firebasestorage.app",
  messagingSenderId: "209944661279",
  appId: "1:209944661279:web:a9d3e19d98af1f8dddb42a",
  measurementId: "G-404XHMZJMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;