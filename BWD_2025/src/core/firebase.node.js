import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD1CdKAIxsJn22ien9cINkbH7S46gzBM0w",
    authDomain: "song-lanh-manh.firebaseapp.com",
    projectId: "song-lanh-manh",
    storageBucket: "song-lanh-manh.appspot.com",
    messagingSenderId: "554080166260",
    appId: "1:554080166260:web:9b54af3ba7e94437b04c21",
    measurementId: "G-7FRW0DCXWP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);