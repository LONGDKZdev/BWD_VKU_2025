document.addEventListener('DOMContentLoaded', function () {
    // Xử lý chuyển tab
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Bỏ qua xử lý tab cho nút đăng xuất
            if (button.id === 'logoutButton') return;

            const tabId = button.getAttribute('data-tab');

            // Xóa active class
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Thêm active class cho tab được chọn
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Xử lý upload ảnh đại diện
    const uploadImage = document.getElementById('uploadImage');
    const profileImage = document.getElementById('profileImage');

    uploadImage.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                // Ở đây bạn có thể thêm code để upload ảnh lên server
            }
            reader.readAsDataURL(file);
        }
    });

    // Xử lý form thông tin cá nhân
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthdate: document.getElementById('birthdate').value,
            gender: document.getElementById('gender').value
        };

        // Hiển thị thông báo thành công
        showNotification('Đã lưu thông tin thành công!');
        // Ở đây bạn có thể thêm code để gửi dữ liệu lên server
    });

    // Xử lý form cài đặt
    const settingsForm = document.getElementById('settingsForm');
    settingsForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            showNotification('Mật khẩu mới không khớp!', 'error');
            return;
        }

        // Hiển thị thông báo thành công
        showNotification('Đã lưu cài đặt thành công!');
        // Ở đây bạn có thể thêm code để cập nhật cài đặt lên server
    });

    // Hàm hiển thị thông báo
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Thêm hiệu ứng hover cho các thẻ thành tích
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Xử lý validation form
    function validateForm(formData) {
        const errors = [];

        if (!formData.fullName.trim()) {
            errors.push('Vui lòng nhập họ tên');
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Email không hợp lệ');
        }

        if (!formData.phone.match(/^[0-9]{10}$/)) {
            errors.push('Số điện thoại không hợp lệ');
        }

        return errors;
    }

    // Thêm animation cho progress bar
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease-in-out';
        }, 100);
    });

    // Xử lý nút đăng xuất với thông báo
    let notificationTimeout1, notificationTimeout2;

    function showNotification(message, type = 'success', duration = 2500) {
        const notification = document.getElementById('notification');

        clearTimeout(notificationTimeout1);
        clearTimeout(notificationTimeout2);

        notification.textContent = message;
        notification.className = `notification show ${type}`;

        notificationTimeout1 = setTimeout(() => {
            notification.classList.remove('show');
            notificationTimeout2 = setTimeout(() => {
                notification.textContent = '';
                notification.className = 'notification';
            }, 500);
        }, duration);
    }

    // Xử lý nút đăng xuất
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Tạo icon cảnh báo
            const icon = document.createElement('i');
            icon.className = 'fas fa-question-circle';
            icon.style.fontSize = '24px';
            icon.style.color = '#FFD700';

            // Tạo container cho nội dung
            const messageDiv = document.createElement('div');
            messageDiv.style.flex = '1';

            // Tạo tiêu đề thông báo
            const messageTitle = document.createElement('div');
            messageTitle.textContent = 'Bạn có chắc chắn muốn đăng xuất không?';
            messageTitle.style.fontWeight = 'bold';
            messageTitle.style.marginBottom = '8px';

            // Tạo container cho các nút
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'notification-buttons';

            // Tạo nút xác nhận
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'notification-button confirm';
            confirmBtn.innerHTML = '<i class="fas fa-check"></i> Xác nhận';

            // Tạo nút hủy
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'notification-button cancel';
            cancelBtn.innerHTML = '<i class="fas fa-times"></i> Hủy';

            // Ghép các phần tử lại với nhau
            buttonsDiv.appendChild(confirmBtn);
            buttonsDiv.appendChild(cancelBtn);

            messageDiv.appendChild(messageTitle);
            messageDiv.appendChild(buttonsDiv);

            // Thêm vào thông báo
            const notification = document.getElementById('notification');
            notification.innerHTML = '';
            notification.appendChild(icon);
            notification.appendChild(messageDiv);

            // Hiển thị thông báo với lớp warning
            notification.className = 'notification show warning';

            // Xử lý sự kiện nút xác nhận
            confirmBtn.addEventListener('click', function () {
                notification.innerHTML = '';
                notification.appendChild(document.createTextNode("✅ Đang đăng xuất..."));
                notification.className = 'notification show success';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            });

            // Xử lý sự kiện nút hủy
            cancelBtn.addEventListener('click', function () {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.textContent = '';
                    notification.className = 'notification';
                }, 500);
            });
        });
    }
});
