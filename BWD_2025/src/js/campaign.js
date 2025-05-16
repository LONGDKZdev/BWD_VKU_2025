document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử lọc
    const searchInput = document.getElementById('campaignSearch');
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Lấy tất cả các thẻ chiến dịch
    const campaignCards = document.querySelectorAll('.campaign-card');
    
    // Hàm lọc chiến dịch
    function filterCampaigns() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        const categoryValue = categoryFilter.value;
        
        // Đếm số lượng thẻ hiển thị để duy trì bố cục grid
        let visibleCount = 0;
        
        campaignCards.forEach(card => {
            // Lấy thông tin từ thẻ
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const status = card.querySelector('.campaign-status').classList.contains('active') ? 'active' : 
                          card.querySelector('.campaign-status').classList.contains('upcoming') ? 'upcoming' : 'completed';
            const category = card.getAttribute('data-category');
            
            // Kiểm tra điều kiện lọc
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesStatus = statusValue === 'all' || status === statusValue;
            const matchesCategory = categoryValue === 'all' || category === categoryValue;
            
            // Hiển thị hoặc ẩn thẻ dựa trên kết quả lọc
            if (matchesSearch && matchesStatus && matchesCategory) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Thêm các thẻ giả để duy trì bố cục grid
        const campaignGrid = document.querySelector('.campaign-grid');
        
        // Xóa các thẻ giả cũ nếu có
        const existingPlaceholders = document.querySelectorAll('.campaign-placeholder');
        existingPlaceholders.forEach(placeholder => placeholder.remove());
        
        // Thêm các thẻ giả mới để duy trì bố cục
        // Số lượng thẻ giả = số lượng cột - (số lượng thẻ hiển thị % số lượng cột)
        // Chỉ thêm khi số lượng thẻ hiển thị không chia hết cho số lượng cột
        if (visibleCount > 0 && visibleCount % 3 !== 0) {
            const placeholdersNeeded = 3 - (visibleCount % 3);
            for (let i = 0; i < placeholdersNeeded; i++) {
                const placeholder = document.createElement('div');
                placeholder.className = 'campaign-placeholder';
                placeholder.style.visibility = 'hidden';
                campaignGrid.appendChild(placeholder);
            }
        }
    }
    
    // Thêm sự kiện lắng nghe cho các bộ lọc
    searchInput.addEventListener('input', filterCampaigns);
    statusFilter.addEventListener('change', filterCampaigns);
    categoryFilter.addEventListener('change', filterCampaigns);
    
    // Thêm CSS cho các thẻ giả
    const style = document.createElement('style');
    style.textContent = `
        .campaign-placeholder {
            width: 100%;
            height: 0;
            margin: 0;
            padding: 0;
            border: none;
        }
        
        .campaign-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }
    `;
    document.head.appendChild(style);
    
    // Xử lý nút tham gia chiến dịch
    const joinButtons = document.querySelectorAll('.join-campaign-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const campaignTitle = this.closest('.campaign-content').querySelector('h3').textContent;

        });
    });
});

// Hàm hỗ trợ
async function joinCampaign(campaignTitle) {
    // Giả lập API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            if (success) {
                resolve();
            } else {
                reject(new Error('Failed to join campaign'));
            }
        }, 1000);
    });
}



function showModal(message, type) {
    // Xóa hàm showModal cũ vì không cần thiết nữa
}

// Thêm event listener cho tất cả các nút tham gia/đăng ký
document.addEventListener('DOMContentLoaded', function() {
    const campaignButtons = document.querySelectorAll('.join-campaign-btn');
    campaignButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const campaignCard = button.closest('.campaign-card');
            const campaignTitle = campaignCard.querySelector('h3').textContent;
            const isUpcoming = campaignCard.querySelector('.campaign-status').classList.contains('upcoming');

            try {
                button.disabled = true;
                button.classList.add('loading');
                await joinCampaign(campaignTitle);
                
                // Cập nhật text nút
                if (isUpcoming) {
                    button.textContent = 'Đã đăng ký';
                } else {
                    button.textContent = 'Đã tham gia';
                }
                
                // Thêm class để đổi style
                button.classList.remove('loading');
                button.classList.add('joined');

                // Cập nhật số người tham gia
                updateCampaignStats(campaignCard);
            } catch (error) {
                button.disabled = false;
                button.classList.remove('loading');
                button.classList.add('error');
                button.textContent = 'Thử lại';
                
                setTimeout(() => {
                    button.classList.remove('error');
                    button.textContent = isUpcoming ? 'Đăng ký trước' : 'Tham gia ngay';
                }, 2000);
            }
        });
    });
});

function updateCampaignStats(campaignCard) {
    const statsElement = campaignCard.querySelector('.campaign-stats span:first-child');
    const currentParticipants = parseInt(statsElement.textContent.match(/\d+/)[0]);
    statsElement.innerHTML = `<i class="fas fa-users"></i> ${currentParticipants + 1} người tham gia`;
}

function animateNumber(element) {
    const finalNumber = parseInt(element.textContent);
    let currentNumber = 0;
    const duration = 2000;
    const steps = 60;
    const increment = finalNumber / steps;
    const stepTime = duration / steps;

    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = `${finalNumber.toLocaleString()}+`;
            clearInterval(counter);
        } else {
            element.textContent = `${Math.floor(currentNumber).toLocaleString()}+`;
        }
    }, stepTime);
}

function checkLoginStatus() {
    // Giả lập kiểm tra đăng nhập
    return localStorage.getItem('isLoggedIn') === 'true';
}

