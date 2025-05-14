import { uploadFile } from "./storage.js";
import { createPost } from "./post.js";
import { loadPosts } from "./post-list.js";
import { renderLeaderboard } from "../user/user.js";

document.getElementById("publish-btn").addEventListener("click", async () => {
    const content = document.getElementById("post-text").value.trim();
    const category = document.getElementById("post-category").value;
    const fileInput = document.getElementById("file-upload").files[0];



    if (!content) return alert("Hãy nhập nội dung bài viết!");

    let fileUrl = "";
    if (fileInput) fileUrl = await uploadFile("posts", fileInput);

    await createPost({ content, category, media: fileUrl });
    // làm mới danh sách bài viết
});
document.querySelectorAll(".category-filter a").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        loadPosts({ category });
    });
});
document.querySelectorAll(".attachment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("file-upload").click();
    });
});


document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        loadPosts({ filter }); // gọi hàm từ post.js hoặc post-list.js
    });
});


document.getElementById("time-filter").addEventListener("change", () => {
    renderLeaderboard();
});
