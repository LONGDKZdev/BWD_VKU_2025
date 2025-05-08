// ... existing code ...
import { signInWithGoogle, signInWithGithub, checkRedirectResult } from "../modules/auth/social-auth.js";

// Kiểm tra kết quả redirect khi trang tải
document.addEventListener("DOMContentLoaded", async () => {
    // ... existing code ...
    
    // Kiểm tra kết quả redirect (cho mobile)
    const user = await checkRedirectResult();
    if (user) {
        window.location.href = "index.html";
    }
    
    // Thêm sự kiện cho nút đăng nhập Google
    document.getElementById("google-login")?.addEventListener("click", async () => {
        const user = await signInWithGoogle();
        if (user) {
            window.location.href = "index.html";
        }
    });
    
    // Thêm sự kiện cho nút đăng nhập GitHub
    document.getElementById("github-login")?.addEventListener("click", async () => {
        const user = await signInWithGithub();
        if (user) {
            window.location.href = "index.html";
        }
    });
});
// ... existing code ...