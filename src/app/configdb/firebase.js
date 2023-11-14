import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCqQJ54vRdaqTCs85gvX-FCfdmNfbO2e8c",
  authDomain: "v-controle-estoque.firebaseapp.com",
  projectId: "v-controle-estoque",
  storageBucket: "v-controle-estoque.appspot.com",
  messagingSenderId: "918752170853",
  appId: "1:918752170853:web:29cca4278ebeb407ccc78c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };