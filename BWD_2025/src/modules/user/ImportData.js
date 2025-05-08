// ImportData.js
import { db } from "../../core/firebase.node.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Dữ liệu mẫu cần import
const users = [
    {
        name: "Phạm Minh D",
        email: "minhd@example.com",
        avatar: "",
        points: 650,
        streak: 15,
        posts: 24,
        followers: 156,
        createdAt: serverTimestamp()
    },
    {
        name: "Nguyễn Văn A",
        email: "vana@example.com",
        avatar: "",
        points: 320,
        streak: 7,
        posts: 10,
        followers: 45,
        createdAt: serverTimestamp()
    }
    // Thêm các user khác nếu muốn
];

// Hàm đẩy dữ liệu lên Firestore
export async function importUsers() {
    try {
        for (const user of users) {
            await addDoc(collection(db, "users"), user);
            console.log(`Đã thêm user: ${user.name}`);
        }
        console.log("Import dữ liệu thành công!");
    } catch (error) {
        console.error("Lỗi import dữ liệu:", error);
        console.error("Import thất bại: " + error.message);
    }
}

importUsers();

// Gọi hàm này khi cần import (có thể gọi từ console hoặc gắn vào nút)