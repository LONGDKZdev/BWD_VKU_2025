// src/JS/community.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { app } from "../core/firebase-config.js";
import { showToast } from "../core/common.js";
import { loadGroups } from "./groups.js";
import { loadMessages, handleSendMessage } from "./chat.js";

const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Hiển thị tên người dùng
    const displayName = document.getElementById("display-name");
    if (displayName && user.displayName) {
        displayName.textContent = user.displayName;
    }

    await loadGroups();         // Load danh sách nhóm
    await loadMessages();       // Load tin nhắn nhóm
    handleSendMessage();        // Gửi tin nhắn
});

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "login.html";
        } catch (err) {
            showToast("Lỗi đăng xuất: " + err.message, "error");
        }
    });
}
