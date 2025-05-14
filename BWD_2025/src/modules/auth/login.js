import { login } from '../auth/auth.js';
import { showToast, showLoading, hideLoading } from '../core/common.js';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('login-btn');
  const form = document.getElementById('login-form');

  if (!form || !button) {
    showToast("Thiếu phần tử giao diện!", "error");
    return;
  }

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      showToast("Vui lòng nhập email và mật khẩu.", "error");
      return;
    }

    showLoading("Đang đăng nhập...");

    try {
      await login(email, password);
      hideLoading();
      showToast("✅​Đăng nhập thành công!", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } catch (err) {
      hideLoading();
      showToast(err.message || "Đăng nhập thất bại.", "error");
    }
  });
});
