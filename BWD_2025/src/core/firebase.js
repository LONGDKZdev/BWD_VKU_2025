// src/core/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

// CHÍNH XÁC config này từ Firebase Console:
const firebaseConfig = {
    apiKey: "AIzaSyD1CdKAIxsJn22ien9cINkbH7S46gzBM0w",
    authDomain: "song-lanh-manh.firebaseapp.com",
    projectId: "song-lanh-manh",
    storageBucket: "song-lanh-manh.appspot.com",
    messagingSenderId: "554080166260",
    appId: "1:554080166260:web:9b54af3ba7e94437b04c21",
    measurementId: "G-7FRW0DCXWP"
};

//  Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

//  Export services để dùng lại
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
