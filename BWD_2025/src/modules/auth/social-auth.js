import { auth, db } from "../../core/firebase.js";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

let notificationTimeout1, notificationTimeout2;

function showNotification(message, type = 'success', duration = 2500) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    clearTimeout(notificationTimeout1);
    clearTimeout(notificationTimeout2);

    notification.textContent = message;
    notification.className = `notification show ${type}`;

    notificationTimeout1 = setTimeout(() => {
        notification.classList.remove('show');
        notificationTimeout2 = setTimeout(() => {
            notification.textContent = '';
            notification.className = 'notification';
        }, 500);
    }, duration);
}

// Sử dụng hàm showNotification với các thông báo đơn giản hơn
async function handleSocialLogin(user, provider) {
    try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(userRef, {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL || "",
                createdAt: serverTimestamp(),
                points: 0,
                streak: 0,
                postCount: 0,
                followers: 0,
                category: "",
                achievements: [""],
                provider: provider
            });
        }

        showNotification("✅ Đăng ký thành công!", 'success', 2000);
                    setTimeout(() => {
                        showNotification("👍 Đang điều hướng tới trang khám phá...", 'info', 2500);
                        setTimeout(() => {
                            window.location.href = "explore.html";
                        }, 2500);
                    }, 2200);

    } catch (error) {
        showNotification("Lỗi: " + error.message, "error");
    }
}

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        await handleSocialLogin(result.user, "google");
    } catch (error) {
        console.error("Google sign-in error:", error);
        if (error.code === 'auth/popup-closed-by-user') {
            showNotification("❌ Đăng nhập bị hủy bởi người dùng", "error");
        } else if (error.code === 'auth/unauthorized-domain') {
            showNotification("❌ Domain chưa được cấu hình trong Firebase", "error");
        } else {
            showNotification("❌ Lỗi đăng nhập: " + error.message, "error");
        }
    }
}

export async function signInWithGithub() {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        await handleSocialLogin(result.user, "github");
    } catch (error) {
        console.error("GitHub sign-in error:", error);
        if (error.code === 'auth/popup-closed-by-user') {
            showNotification("❌ Đăng nhập bị hủy bởi người dùng", "error");
        } else if (error.code === 'auth/unauthorized-domain') {
            showNotification("❌ Domain chưa được cấu hình trong Firebase", "error");
        } else {
            showNotification("❌ Lỗi đăng nhập: " + error.message, "error");
        }
    }
}
