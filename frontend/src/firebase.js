import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT7ezVmD_H20xk3_jJ8Q0Jr_hdfWvTWls",
  authDomain: "borrow-fe83e.firebaseapp.com",
  projectId: "borrow-fe83e",
  storageBucket: "borrow-fe83e.firebasestorage.app",
  messagingSenderId: "963278460539",
  appId: "1:963278460539:web:bd80e07715d1565bc234de"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);