document.addEventListener('DOMContentLoaded', function() {
    // Xử lý chuyển tab
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
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

    uploadImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                // Ở đây bạn có thể thêm code để upload ảnh lên server
            }
            reader.readAsDataURL(file);
        }
    });

    // Xử lý form thông tin cá nhân
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function(e) {
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
    settingsForm.addEventListener('submit', function(e) {
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
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
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

    // Xử lý chức năng đăng xuất
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('Bạn có muốn đăng xuất không?')) {
                window.location.href = 'login.html';
            }
        });
    }
});