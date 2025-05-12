import { auth } from '../core/firebase.js';
import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import { showToast, showLoading, hideLoading } from '../core/common.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgot-password-form');

    if (!form) {
        showToast("Không tìm thấy form khôi phục!", "error");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById("forgot-email").value.trim();


        if (!email) {
            showToast("Vui lòng nhập email.", "error");
            return;
        }

        showLoading("Đang gửi email khôi phục...");

        try {
            await sendPasswordResetEmail(auth, email);
            hideLoading();
            showToast("Email khôi phục đã được gửi!", "success");
            // Chuyển hướng đến trang đặt lại mật khẩu
            window.location.href = 'reset-password.html';
        } catch (err) {
            hideLoading();
            showToast(err.message || "Gửi email thất bại.", "error");
        }
    });
});
