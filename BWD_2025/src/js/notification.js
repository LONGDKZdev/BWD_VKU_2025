// src/js/notification.js

const notificationQueue = [];
let isShowing = false;

/**
 * Hiển thị thông báo có queue
 * @param {string} message - Nội dung hiển thị
 * @param {'success'|'error'|'info'|'warning'} type - Loại thông báo
 * @param {number} duration - Thời gian hiển thị (ms)
 */
export function showNotification(message, type = 'info', duration = 2500) {
    notificationQueue.push({ message, type, duration });
    if (!isShowing) processQueue();
}

function processQueue() {
    if (notificationQueue.length === 0) {
        isShowing = false;
        return;
    }

    isShowing = true;
    const { message, type, duration } = notificationQueue.shift();
    const noti = document.getElementById('notification');
    if (!noti) {
        console.warn("⚠️ Không tìm thấy phần tử #notification trong DOM.");
        isShowing = false;
        return;
    }

    noti.textContent = message;
    noti.className = `notification show ${type}`;

    setTimeout(() => {
        noti.classList.remove('show');
        setTimeout(() => {
            noti.textContent = '';
            noti.className = 'notification';
            processQueue();
        }, 400);
    }, duration);
}
