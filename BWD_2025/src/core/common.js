// common.js
// Imports
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js";

// Utilities chung
export const utils = {
    formatDate: (date) => {
        return new Intl.DateTimeFormat('vi-VN').format(date);
    },
    validateEmail: (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

// 🧠 Hiển thị Toast notification
export function showToast(message, type = "success") {
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

// 🧠 Hiển thị Loading overlay
export function showLoading(message = "Đang xử lý...", timeout = 10000) {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            setTimeout(() => Swal.close(), timeout);
        }
    });
}

// 🧠 Ẩn Loading overlay
export function hideLoading() {
    Swal.close();
}

// 🧠 Hiển thị Confirm Dialog
export async function showConfirm(message = "Bạn chắc chắn chưa?") {
    const result = await Swal.fire({
        title: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
    });

    return result.isConfirmed;
}

// 🧠 Hiển thị Alert đơn giản
export async function showAlert(message, type = "info") {
    await Swal.fire({
        icon: type,
        title: message,
        confirmButtonText: 'OK'
    });
}

// 🧠 Load bài viết từ PHP API
async function loadPosts() {
    try {
        showLoading("Đang tải dữ liệu...");

        const res = await fetch("/src/core/get-posts.php");
        const result = await res.json();
        hideLoading();

        if (!result.documents) {
            showAlert("Không tìm thấy dữ liệu nào!", "warning");
            return;
        }

        const html = result.documents.map(doc => {
            const data = doc.fields;
            return `
                <div class="post">
                    <h3>${data.title?.stringValue || 'Không tiêu đề'}</h3>
                    <p>${data.content?.stringValue || 'Không nội dung'}</p>
                </div>
            `;
        }).join('');

        document.getElementById('post-list').innerHTML = html;
    } catch (err) {
        hideLoading();
        console.error("Lỗi tải dữ liệu:", err);
        showToast("Lỗi khi tải dữ liệu", "error");
    }
}

// Gọi hàm khi trang tải xong
window.addEventListener("DOMContentLoaded", loadPosts);
