// groups.js
import { db, auth } from "../core/firebase-config.js";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    query,
    where,
    serverTimestamp,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js";

// 🧠 Toast notification
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

// 🔥 Tạo nhóm mới
export async function createGroup(name, description) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        await addDoc(collection(db, "groups"), {
            name,
            description,
            creator: user.email,
            members: [user.uid],
            createdAt: serverTimestamp()
        });

        showToast("Tạo nhóm thành công!");
    } catch (error) {
        console.error("Lỗi tạo nhóm:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Tham gia nhóm
export async function joinGroup(groupId) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const groupDoc = doc(db, "groups", groupId);
        await updateDoc(groupDoc, {
            members: arrayUnion(user.uid)
        });

        showToast("Tham gia nhóm thành công!");
    } catch (error) {
        console.error("Lỗi tham gia nhóm:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Lấy tất cả nhóm
export async function fetchAllGroups() {
    try {
        const snapshot = await getDocs(collection(db, "groups"));
        const groups = [];

        snapshot.forEach((docSnap) => {
            groups.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        return groups;
    } catch (error) {
        console.error("Lỗi tải nhóm:", error);
        showToast(error.message, "error");
        return [];
    }
}

// 🔥 Lấy nhóm mà người dùng đã tham gia
export async function fetchMyGroups() {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const q = query(collection(db, "groups"), where("members", "array-contains", user.uid));
        const snapshot = await getDocs(q);
        const groups = [];

        snapshot.forEach((docSnap) => {
            groups.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        return groups;
    } catch (error) {
        console.error("Lỗi tải nhóm của tôi:", error);
        showToast(error.message, "error");
        return [];
    }
}

// 🔥 Lấy chi tiết 1 nhóm
export async function fetchGroupDetail(groupId) {
    try {
        const groupDoc = doc(db, "groups", groupId);
        const groupSnap = await getDoc(groupDoc);

        if (!groupSnap.exists()) {
            throw new Error("Nhóm không tồn tại!");
        }

        return {
            id: groupSnap.id,
            ...groupSnap.data()
        };
    } catch (error) {
        console.error("Lỗi lấy chi tiết nhóm:", error);
        showToast(error.message, "error");
        return null;
    }
}
