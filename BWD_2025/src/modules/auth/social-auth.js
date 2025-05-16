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
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
    allow_signup: 'false' // hoặc bạn có thể sử dụng prompt nếu GitHub hỗ trợ
});

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

async function checkAccountExists(user) {
    try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        return userDoc.exists();
    } catch (error) {
        console.error("Error checking account existence:", error);
        return false;
    }
}

async function handleSocialLogin(user, provider) {
    try {
        const accountExists = await checkAccountExists(user);
        if (accountExists) {
            showNotification("✅ Đăng nhập thành công!", 'success', 2000);
            setTimeout(() => {
                showNotification("👍 Đang điều hướng tới trang chủ...", 'info', 2500);
                setTimeout(() => {
                    window.location.href = "campaign.html";
                }, 2500);
            }, 2200);
        } else {
            await setDoc(doc(db, "users", user.uid), {
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
            showNotification("✅ Đăng ký thành công!", 'success', 2000);
            setTimeout(() => {
                window.location.href = "campaign.html";
            }, 2500);
        }
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
        if (error.code === '❌tài khoản tồn tại với thông tin xác thực khác') {
            showNotification("❌ Tài khoản đã tồn tại với phương thức đăng nhập khác. Vui lòng sử dụng phương thức đăng nhập ban đầu.", "error");
        } else if (error.code === 'auth/popup-closed-by-user') {
            showNotification("❌ Đăng nhập bị hủy bởi người dùng", "error");
        } else if (error.code === 'auth/unauthorized-domain') {
            showNotification("❌ Domain chưa được cấu hình trong Firebase", "error");
        } else {
            showNotification("❌ Lỗi đăng nhập: " + error.message, "error");
        }
    }
}

export async function registerWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        await handleSocialRegister(result.user, "google");
    } catch (error) {
        console.error("Google registration error:", error);
        showNotification("❌ Lỗi đăng ký: " + error.message, "error");
    }
}

export async function registerWithGithub() {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        await handleSocialRegister(result.user, "github");
    } catch (error) {
        console.error("GitHub registration error:", error);
        showNotification("❌ Lỗi đăng ký: " + error.message, "error");
    }
}

// Hàm xử lý đăng ký xã hội
async function handleSocialRegister(user, provider) {
    try {
        const accountExists = await checkAccountExists(user);
        if (accountExists) {
            showNotification("❌ Tài khoản đã tồn tại. Vui lòng đăng nhập.", "error");
        } else {
            await setDoc(doc(db, "users", user.uid), {
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
            showNotification("✅ Đăng ký thành công!", 'success', 2000);
            setTimeout(() => {
                window.location.href = "campaign.html";
            }, 2500);
        }
    } catch (error) {
        showNotification("Lỗi: " + error.message, "error");
    }
}
