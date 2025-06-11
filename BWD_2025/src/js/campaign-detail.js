

// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    // Thêm logic kiểm tra đăng nhập ở đây
    return false; // Tạm thời return false
}

// Hàm xử lý đăng ký tham gia chiến dịch
function handleCampaignRegistration(campaignId) {
    // Thêm logic xử lý đăng ký tham gia chiến dịch
    console.log('Đăng ký tham gia chiến dịch:', campaignId);
    alert('Đăng ký tham gia thành công!');
}

// Hàm để định dạng số với dấu phẩy ngăn cách hàng nghìn
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const participantsCountElement = document.getElementById('participantsCount');
    
    // Lấy số người tham gia ban đầu và chuyển đổi thành số
    let currentCount = parseInt(participantsCountElement.textContent.replace(/,/g, ''));
    
    registerButton.addEventListener('click', function() {
        // Tăng số người tham gia lên 1
        currentCount += 1;
        
        // Cập nhật hiển thị số người tham gia với định dạng có dấu phẩy
        participantsCountElement.textContent = formatNumber(currentCount);
        
        // Cập nhật trạng thái nút
        this.textContent = 'Bạn đã là thành viên của chiến dịch';
        this.disabled = true;
        this.classList.add('registered');
    });
});