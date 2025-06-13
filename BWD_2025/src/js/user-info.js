// src/js/user-info.js
import { auth, db } from "../core/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

export function loadUserInfo(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.error("❌ Không tìm thấy dữ liệu người dùng.");
            return;
        }

        const userData = userSnap.data();
        userData.uid = user.uid;
        callback(userData);
    });
}
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  
