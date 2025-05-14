document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('campaignSearch');
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const campaignCards = document.querySelectorAll('.campaign-card');

    // Hàm tìm kiếm và lọc
    function filterCampaigns() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const statusValue = statusFilter.value;
        const categoryValue = categoryFilter.value;

        campaignCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const status = card.querySelector('.campaign-status').textContent.toLowerCase();
            const category = card.getAttribute('data-category') || 'all';

            // Kiểm tra điều kiện tìm kiếm
            const matchesSearch = searchTerm === '' || 
                                title.includes(searchTerm) || 
                                description.includes(searchTerm);
            const matchesStatus = statusValue === 'all' || 
                                (statusValue === 'active' && status.includes('đang diễn ra')) ||
                                (statusValue === 'upcoming' && status.includes('sắp diễn ra')) ||
                                (statusValue === 'completed' && status.includes('đã kết thúc'));
            const matchesCategory = categoryValue === 'all' || category === categoryValue;

            // Hiển thị hoặc ẩn card dựa trên kết quả tìm kiếm
            if (matchesSearch && matchesStatus && matchesCategory) {
                card.style.display = '';
                if (searchTerm) {
                    highlightText(card, searchTerm);
                } else {
                    removeHighlight(card);
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Hiển thị thông báo khi không có kết quả
        const visibleCards = document.querySelectorAll('.campaign-card[style=""]').length;
        showNoResultsMessage(visibleCards === 0);
    }

    // Hàm highlight text tìm kiếm
    function highlightText(card, searchTerm) {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        title.innerHTML = highlightMatch(title.textContent, searchTerm);
        description.innerHTML = highlightMatch(description.textContent, searchTerm);
    }

    function highlightMatch(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function removeHighlight(card) {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        title.innerHTML = title.textContent;
        description.innerHTML = description.textContent;
    }

    // Hàm hiển thị thông báo không có kết quả
    function showNoResultsMessage(show) {
        let messageEl = document.querySelector('.no-results-message');
        if (show) {
            if (!messageEl) {
                messageEl = document.createElement('div');
                messageEl.className = 'no-results-message';
                messageEl.textContent = 'Không tìm thấy chiến dịch phù hợp';
                document.querySelector('.campaign-grid').appendChild(messageEl);
            }
            messageEl.style.display = 'block';
        } else if (messageEl) {
            messageEl.style.display = 'none';
        }
    }

    // Thêm event listeners
    searchInput.addEventListener('input', filterCampaigns);
    statusFilter.addEventListener('change', filterCampaigns);
    categoryFilter.addEventListener('change', filterCampaigns);

    // Thêm debounce để tối ưu hiệu suất tìm kiếm
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterCampaigns, 300);
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

