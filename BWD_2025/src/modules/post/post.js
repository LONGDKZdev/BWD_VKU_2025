// posts.js
import { db, auth } from "../core/firebase-config.js";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
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

// 🔥 Tạo bài viết mới
export async function createPost({ title, content, category, groupId = null, groupName = null, mediaUrl = null }) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const postRef = await addDoc(collection(db, "posts"), {
            title,
            content,
            category,
            groupId,
            groupName,
            mediaUrl,
            author: user.email,
            createdAt: serverTimestamp()
        });

        showToast("Đăng bài thành công!");
        return postRef.id;
    } catch (error) {
        console.error("Lỗi tạo bài viết:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Cập nhật bài viết
export async function updatePost(postId, { title, content, category }) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const postDoc = doc(db, "posts", postId);
        const postSnap = await getDoc(postDoc);

        if (!postSnap.exists()) {
            throw new Error("Bài viết không tồn tại!");
        }

        const postData = postSnap.data();
        if (postData.author !== user.email) {
            throw new Error("Bạn không có quyền sửa bài viết này!");
        }

        await updateDoc(postDoc, { title, content, category });

        showToast("Cập nhật bài viết thành công!");
    } catch (error) {
        console.error("Lỗi cập nhật bài viết:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Xóa bài viết
export async function deletePost(postId) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Bạn chưa đăng nhập!");

        const postDoc = doc(db, "posts", postId);
        const postSnap = await getDoc(postDoc);

        if (!postSnap.exists()) {
            throw new Error("Bài viết không tồn tại!");
        }

        const postData = postSnap.data();
        if (postData.author !== user.email) {
            throw new Error("Bạn không có quyền xóa bài viết này!");
        }

        await deleteDoc(postDoc);

        showToast("Đã xóa bài viết!");
    } catch (error) {
        console.error("Lỗi xóa bài:", error);
        showToast(error.message, "error");
    }
}

// 🔥 Lấy tất cả bài viết
export async function fetchAllPosts(categoryFilter = "all") {
    try {
        const postsRef = collection(db, "posts");
        let postsQuery = postsRef;

        if (categoryFilter !== "all") {
            postsQuery = query(postsRef, where("category", "==", categoryFilter));
        } else {
            postsQuery = query(postsRef, orderBy("createdAt", "desc"));
        }

        const snapshot = await getDocs(postsQuery);
        const posts = [];

        snapshot.forEach((docSnap) => {
            posts.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        return posts;
    } catch (error) {
        console.error("Lỗi tải bài viết:", error);
        showToast(error.message, "error");
        return [];
    }
}

// 🔥 Tìm kiếm bài viết theo từ khóa
export async function searchPosts(keyword) {
    try {
        if (!keyword) return [];

        const postsRef = collection(db, "posts");
        const snapshot = await getDocs(postsRef);
        const lowerKeyword = keyword.toLowerCase();

        const matchedPosts = [];

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const title = data.title?.toLowerCase() || "";
            const content = data.content?.toLowerCase() || "";

            if (title.includes(lowerKeyword) || content.includes(lowerKeyword)) {
                matchedPosts.push({
                    id: docSnap.id,
                    ...data
                });
            }
        });

        return matchedPosts;
    } catch (error) {
        console.error("Lỗi tìm kiếm bài viết:", error);
        showToast(error.message, "error");
        return [];
    }
}
