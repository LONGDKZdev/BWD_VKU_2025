// Hàm xử lý tìm kiếm
function searchContent() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        showNotification('Vui lòng nhập từ khóa tìm kiếm', 'warning');
        return;
    }
    
    // Lọc bài đăng theo từ khóa
    filteredPosts = posts.filter(post => {
        return post.content.toLowerCase().includes(searchTerm) ||
               post.user.name.toLowerCase().includes(searchTerm) ||
               (post.category && post.category.toLowerCase().includes(searchTerm));
    });
    
    // Hiển thị kết quả
    renderPosts();
    
    // Thông báo kết quả
    showNotification(`Đã tìm thấy ${filteredPosts.length} kết quả`, 'success');
}

// Thiết lập sự kiện cho chức năng tìm kiếm
function setupSearchEvents() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', searchContent);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchContent();
            }
        });
    }
}

// Khởi tạo sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', setupSearchEvents);