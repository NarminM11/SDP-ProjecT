import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDq-hdrpfyPmE9teOyyCIILmLVS8RDvD-Y",
    authDomain: "sdp-porject.firebaseapp.com",
    projectId: "sdp-porject",
    storageBucket: "sdp-porject.appspot.com",
    messagingSenderId: "186913651108",
    appId: "1:186913651108:web:488c71863f18b719d0a931",
    measurementId: "G-VJER5NQJY6"
  };
  
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };