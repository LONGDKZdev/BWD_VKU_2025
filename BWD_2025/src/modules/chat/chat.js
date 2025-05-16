// chat.js
import { db, auth, storage } from "../core/firebase-config.js";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

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

// 🔥 Gửi tin nhắn (text hoặc file)
export async function sendMessage(groupId, text = "", file = null) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        let fileUrl = null;
        if (file) {
            const fileRef = ref(storage, `chat_files/${groupId}/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            fileUrl = await getDownloadURL(fileRef);
        }

        const messageData = {
            sender: user.email,
            text: text,
            fileUrl: fileUrl,
            createdAt: serverTimestamp()
        };

        await addDoc(collection(db, "groups", groupId, "messages"), messageData);

        showToast("Đã gửi tin nhắn!");
    } catch (error) {
        console.error("Lỗi gửi tin nhắn:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Lắng nghe tin nhắn realtime
export function listenMessages(groupId, callback) {
    try {
        const messagesRef = collection(db, "groups", groupId, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = [];

            snapshot.forEach((docSnap) => {
                messages.push({
                    id: docSnap.id,
                    ...docSnap.data()
                });
            });

            callback(messages);
        });

        return unsubscribe; // để khi cần có thể stop listen
    } catch (error) {
        console.error("Lỗi lắng nghe tin nhắn:", error);
        showToast(error.message, "error");
    }
}
