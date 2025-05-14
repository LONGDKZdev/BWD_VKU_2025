// post-list.js
import { db } from "../core/firebase-config.js";
import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import { showToast } from "../core/common.js"; // sử dụng nếu cần báo lỗi đẹp

// 🧠 Hàm load toàn bộ bài viết
export async function loadPosts(category = "all") {
    try {
        const postList = document.getElementById("postList");
        postList.innerHTML = "<li>⏳ Đang tải bài viết...</li>";

        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);

        let posts = [];
        snapshot.forEach((docSnap) => {
            posts.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        // Lọc bài viết theo chuyên mục nếu cần
        if (category !== "all") {
            posts = posts.filter(post => (post.category || "").toLowerCase() === category.toLowerCase());
        }

        // Render ra UI
        postList.innerHTML = "";
        if (posts.length === 0) {
            postList.innerHTML = "<li>😢 Không có bài viết trong chuyên mục này.</li>";
            return;
        }

        posts.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${post.title}</strong> - 
                <em>[${post.category || "Không có chuyên mục"}]</em><br/>
                ${post.content}<br/>
                <hr/>
            `;
            postList.appendChild(li);
        });

    } catch (error) {
        console.error("Lỗi tải bài viết:", error);
        showToast(error.message, "error");
    }
}

// 🧠 Hàm filter khi chọn chuyên mục
export function filterPosts() {
    const selected = document.getElementById("filterCategory").value;
    loadPosts(selected);
}

// 🧠 Khi vào trang, mặc định load hết
window.onload = () => {
    loadPosts();
};
