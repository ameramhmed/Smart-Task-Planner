import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH6M9qcjBALqQ32aCarHhNOWp8A9PpIQQ",
  authDomain: "smart-task-planner-bbb08.firebaseapp.com",
  projectId: "smart-task-planner-bbb08",
  storageBucket: "smart-task-planner-bbb08.firebasestorage.app",
  messagingSenderId: "187311477019",
  appId: "1:187311477019:web:4b82a6924dcafc22de83be"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);