
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDffPXG088wKh3m4F9L_sXomuWlBzJQFjA",
  authDomain: "proyecto-avance-dps-1-81c85.firebaseapp.com",
  projectId: "proyecto-avance-dps-1-81c85",
  storageBucket: "proyecto-avance-dps-1-81c85.firebasestorage.app",
  messagingSenderId: "301594441068",
  appId: "1:301594441068:web:00ffc67e8faaa18b25af49",
  measurementId: "G-P46MJVNJ1N"
};

// Inicializar app
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar
export{auth,db};