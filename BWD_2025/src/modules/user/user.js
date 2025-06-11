// user.js
import { db, auth } from "../core/firebase-config.js";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js";

// 🧠 Toast helper
function showToast(message, type = "success") {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });
}

// 🔥 Khởi tạo hồ sơ người dùng lần đầu
export async function initUserProfile() {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName || "",
                avatarUrl: "",
                points: 0,
                createdAt: serverTimestamp()
            });
            console.log("✅ Hồ sơ người dùng đã khởi tạo.");
        }
    } catch (error) {
        console.error("Lỗi khởi tạo hồ sơ:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Lấy thông tin hồ sơ người dùng
export async function fetchUserProfile() {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            throw new Error("Hồ sơ không tồn tại!");
        }

        return {
            id: snap.id,
            ...snap.data()
        };
    } catch (error) {
        console.error("Lỗi lấy hồ sơ:", error);
        showToast(error.message, "error");
        return null;
    }
}

// 🔥 Cập nhật hồ sơ cá nhân
export async function updateUserProfile({ displayName, avatarUrl }) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            displayName,
            avatarUrl
        });

        showToast("Đã cập nhật hồ sơ!");
    } catch (error) {
        console.error("Lỗi cập nhật hồ sơ:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Cộng điểm khi hoàn thành hoạt động
export async function addUserPoints(points) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) return;

        const currentPoints = snap.data().points || 0;
        await updateDoc(userRef, {
            points: currentPoints + points
        });

        showToast(`+${points} điểm!`);
    } catch (error) {
        console.error("Lỗi cộng điểm:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Lấy bảng xếp hạng top người dùng
export async function fetchLeaderboard(top = 20) {
    try {
        const q = query(
            collection(db, "users"),
            orderBy("points", "desc"),
            limit(top)
        );
        const snapshot = await getDocs(q);

        const users = [];
        snapshot.forEach((docSnap) => {
            users.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        return users;
    } catch (error) {
        console.error("Lỗi tải bảng xếp hạng:", error);
        showToast(error.message, "error");
        return [];
    }
}

export async function createUser(uid, data) {
    await setDoc(doc(db, "users", uid), {
        ...data
    });
}

export async function createEmptyUserProfile(user, provider = "email") {
    await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "",
        email: user.email,
        avatar: user.photoURL || "",
        phone: "",
        birthdate: "",
        gender: "",
        createdAt: serverTimestamp(),
        points: 0,
        streak: 0,
        postCount: 0,
        followers: 0,
        category: "",
        achievements: [],
        provider: provider
    });
}


