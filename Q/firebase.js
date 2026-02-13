import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDeEQaosUe8qnpLa6V42ZVJmRupzjS0d8k",
    authDomain: "predictq-6fe2e.firebaseapp.com",
    projectId: "predictq-6fe2e",
    storageBucket: "predictq-6fe2e.firebasestorage.app",
    messagingSenderId: "793921116537",
    appId: "1:793921116537:web:561b8fff831e258c6a37a8"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

