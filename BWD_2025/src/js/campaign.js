const provinceStats = {
    "Hà Nội": {
        title: "Tổng quan - Hà Nội",
        image: "src/images/MapVietNam/hanoi.png",
        stats: {
            campaigns: 20,
            budget: "500.000.000 ₫",
            ongoing: 8,
            upcoming: 6,
            finished: 6,
            participants: "80.000"
        }
    },
    "Thừa Thiên - Huế": {
        title: "Tổng quan - Huế",
        image: "src/images/MapVietNam/hue.png",
        stats: {
            campaigns: 12,
            budget: "150.000.000 ₫",
            ongoing: 4,
            upcoming: 3,
            finished: 5,
            participants: "25.000"
        }
    },
    "Đà Nẵng": {
        title: "Tổng quan - Đà Nẵng",
        image: "src/images/MapVietNam/danang.png",
        stats: {
            campaigns: 15,
            budget: "270.000.000 ₫",
            ongoing: 6,
            upcoming: 5,
            finished: 4,
            participants: "50.000"
        }
    },
    "TP. Hồ Chí Minh": {
        title: "Tổng quan - TP. Hồ Chí Minh",
        image: "src/images/MapVietNam/hcm.png",
        stats: {
            campaigns: 25,
            budget: "800.000.000 ₫",
            ongoing: 10,
            upcoming: 8,
            finished: 7,
            participants: "120.000"
        }
    }
};
function updateOverview(name, data){
    document.querySelector('.overview-title').innerText = data.title;
    document.querySelector('.province-image').src = data.image;

    const statEls = document.querySelectorAll('.stat-item .stat-number');
    const values = [
        data.stats.campaigns,
        data.stats.budget,
        data.stats.ongoing,
        data.stats.upcoming,
        data.stats.finished,
        data.stats.participants
    ];
    statEls.forEach((el, i) => el.textContent = values[i]);
}



document.addEventListener('DOMContentLoaded', function(){

    function updateOverview(provinceName, data){
        document.querySelector('.overview-title').innerText = data.title;
        document.querySelector('.province-image').src = data.image;

        const items = document.querySelectorAll('.stat-item .stat-number');
        const values = [
            data.stats.campaigns,
            data.stats.budget,
            data.stats.ongoing,
            data.stats.upcoming,
            data.stats.finished,
            data.stats.participants
        ];

        items.forEach((el, idx) => {
            el.textContent = values[idx];
        });
    }



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


    // Xử lý nút tham gia chiến dịch
    const joinButtons = document.querySelectorAll('.join-campaign-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', function () {
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



function checkLoginStatus() {
    // Giả lập kiểm tra đăng nhập
    return localStorage.getItem('isLoggedIn') === 'true';
}


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


document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('createCampaignModal');
    const btn = document.getElementById('createCampaignBtn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('campaignForm');
    const campaignGrid = document.querySelector('.campaign-grid');

    // Mảng lưu trữ các chiến dịch
    let campaigns = [];

    btn.onclick = function () {
        modal.style.display = 'block';
    }

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function createCampaignCard(campaign) {
        const card = document.createElement('div');
        card.className = 'campaign-card';
        card.setAttribute('data-category', campaign.category);
        card.setAttribute('data-creator', 'true');

        // Tính toán thời gian
        const today = new Date();
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);

        let statusClass = '';
        let statusText = '';
        let timeText = '';
        let cancelButton = '';

        if (startDate > today) {
            statusClass = 'upcoming';
            statusText = 'Sắp diễn ra';
            const daysUntilStart = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
            timeText = `Bắt đầu sau ${daysUntilStart} ngày`;
        } else if (endDate > today) {
            statusClass = 'active';
            statusText = 'Đang diễn ra';
            const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
            timeText = `${daysRemaining} ngày còn lại`;
        } else {
            statusClass = 'completed';
            statusText = 'Đã kết thúc';
            timeText = 'Đã hoàn thành';
        }

        if (card.getAttribute('data-creator') === 'true') {
            cancelButton = '<button class="cancel-campaign-btn">Hủy chiến dịch</button>';
        }

        card.innerHTML = `
            <div class="campaign-image">
                <img src="${campaign.imageUrl}" alt="${campaign.title}">
                <div class="campaign-status ${statusClass}">${statusText}</div>
                ${card.getAttribute('data-creator') ? '<div class="creator-badge">Chiến dịch của bạn</div>' : ''}
            </div>
            <div class="campaign-content">
                <h3>${campaign.title}</h3>
                <p>${campaign.description}</p>
                <div class="campaign-stats">
                    <span><i class="fas fa-users"></i> 0 người tham gia</span>
                    <span><i class="fas fa-calendar"></i> ${timeText}</span>
                </div>
                ${cancelButton}
            </div>
        `;

        if (card.getAttribute('data-creator') === 'true') {
            const cancelBtn = card.querySelector('.cancel-campaign-btn');
            cancelBtn.addEventListener('click', function () {
                if (confirm('Bạn có chắc chắn muốn hủy chiến dịch này?')) {
                    card.remove();
                    const index = campaigns.findIndex(c => c.title === campaign.title);
                    if (index > -1) {
                        campaigns.splice(index, 1);
                    }
                }
            });
        }

        return card;
    }

    // Xử lý xem trước ảnh
    const imageInput = document.getElementById('campaignImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('previewContainer');

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            previewContainer.style.display = 'none';
            imagePreview.style.display = 'none';
        }
    });


    form.onsubmit = function (e) {
        e.preventDefault();

        // Lấy dữ liệu từ form
        const formData = new FormData(form);
        const campaign = {
            title: formData.get('campaignTitle'),
            description: formData.get('campaignDescription'),
            category: formData.get('campaignCategory'),
            startDate: formData.get('campaignStartDate'),
            endDate: formData.get('campaignEndDate'),
            imageUrl: URL.createObjectURL(formData.get('campaignImage'))
        };

        // Thêm chiến dịch vào mảng
        campaigns.push(campaign);

        // Tạo và thêm card mới vào grid
        const card = createCampaignCard(campaign);
        campaignGrid.insertBefore(card, campaignGrid.firstChild);

        // Đóng modal và reset form
        modal.style.display = 'none';
        form.reset();
    }
});

// Đóng modal và reset form
modal.style.display = 'none';
form.reset();

// Xử lý xem trước ảnh
const imageInput = document.getElementById('campaignImage');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
});

// Kiểm tra ngày kết thúc phải sau ngày bắt đầu
const startDate = document.getElementById('campaignStartDate');
const endDate = document.getElementById('campaignEndDate');

startDate.addEventListener('change', function () {
    endDate.min = this.value;
});

endDate.addEventListener('change', function () {
    if (this.value < startDate.value) {
        alert('Ngày kết thúc phải sau ngày bắt đầu!');
        this.value = '';
    }
});

// Xử lý hiển thị tên tỉnh trên bản đồ
document.addEventListener('DOMContentLoaded', function () {
    // [Các đoạn mã lọc chiến dịch, tham gia chiến dịch, tạo chiến dịch mới...]

    // Xử lý bản đồ
    const mapContainer = document.querySelector('.map-container');
    const mapObject = mapContainer.querySelector('object');
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    mapContainer.appendChild(tooltip);

    const provinceInfo = document.createElement('div');
    provinceInfo.className = 'province-info';
    provinceInfo.style.padding = '10px';
    provinceInfo.style.border = '1px solid #ccc';
    provinceInfo.style.marginTop = '10px';
    provinceInfo.style.display = 'none';
    mapContainer.appendChild(provinceInfo);

    const provinceData = {
        'Hà Nội': {
            name: 'Hà Nội',
            population: '8,053,663 (2023)',
            area: '3,358.6 km²',
            description: 'Thủ đô của Việt Nam, trung tâm chính trị và văn hóa.'
        },
        'Hồ Chí Minh': {
            name: 'Hồ Chí Minh',
            population: '9,320,866 (2023)',
            area: '2,061 km²',
            description: 'Thành phố lớn nhất, trung tâm kinh tế của Việt Nam.'
        },
        'Đà Nẵng': {
            name: 'Đà Nẵng',
            population: '1,141,000 (2023)',
            area: '1,285 km²',
            description: 'Thành phố biển nổi tiếng với du lịch và phát triển công nghệ.'
        },
        // Thêm dữ liệu cho các tỉnh khác nếu cần
    };

    mapObject.addEventListener('load', function () {
        const svgDoc = mapObject.contentDocument;
        if (!svgDoc) {
            console.error('Không thể tải file SVG');
            return;
        }

        const paths = svgDoc.querySelectorAll('path');
        if (paths.length === 0) {
            console.error('Không tìm thấy path trong SVG');
            return;
        }

        paths.forEach(path => {
            const provinceName = path.getAttribute('title') || path.getAttribute('id');
            if (!provinceName) {
                console.warn('Path không có thuộc tính title hoặc id:', path);
                return;
            }

            path.style.fill = '#e0e0e0';
            path.style.stroke = '#fff';
            path.style.strokeWidth = '1';
            path.style.cursor = 'pointer';
            path.style.transition = 'fill 0.3s ease';

            path.addEventListener('mouseenter', function () {
                this.style.fill = '#4CAF50';
                tooltip.textContent = provinceName;
                tooltip.style.display = 'block';
            });

            path.addEventListener('mouseleave', function () {
                if (!this.classList.contains('selected')) {
                    this.style.fill = '#e0e0e0';
                }
                tooltip.style.display = 'none';
            });

            path.addEventListener('mousemove', function (e) {
                const rect = mapObject.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                tooltip.style.left = (x + 10) + 'px';
                tooltip.style.top = (y + 10) + 'px';
            });

            path.addEventListener('click', function () {
                const info = provinceData[provinceName] || {
                    name: provinceName,
                    population: 'Chưa có dữ liệu',
                    area: 'Chưa có dữ liệu',
                    description: 'Chưa có thông tin chi tiết.'
                };

                provinceInfo.innerHTML = `
                    <h3>${info.name}</h3>
                    <p><strong>Dân số:</strong> ${info.population}</p>
                    <p><strong>Diện tích:</strong> ${info.area}</p>
                    <p><strong>Mô tả:</strong> ${info.description}</p>
                `;
                provinceInfo.style.display = 'block';

                paths.forEach(p => p.classList.remove('selected'));
                this.classList.add('selected');
                this.style.fill = '#2196F3';
            });
        });

        path.addEventListener('click', function () {
            const name = provinceName;
            const stats = provinceStats[name];

            if (stats) {
                updateOverview(name, stats);
            }

            provinceInfo.innerHTML = `
                <h3>${provinceData[name]?.name || name}</h3>
                <p><strong>Dân số:</strong> ${provinceData[name]?.population || 'Chưa có dữ liệu'}</p>
                <p><strong>Diện tích:</strong> ${provinceData[name]?.area || 'Chưa có dữ liệu'}</p>
                <p><strong>Mô tả:</strong> ${provinceData[name]?.description || 'Chưa có thông tin chi tiết.'}</p>
            `;
            provinceInfo.style.display = 'block';

            paths.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
            this.style.fill = '#2196F3';
        });


    });
});
document.querySelectorAll('svg path').forEach(function (el) {
    el.addEventListener('click', function () {
        const province = this.id;
        showReport(province);
    });
});
function showReport(province) {
    const reports = {
        'Hanoi': {
            population: '8.3 triệu',
            cases: 1340,
            recovered: 1250,
        },
        'Danang': {
            population: '1.1 triệu',
            cases: 480,
            recovered: 470,
        },
    };

    const data = reports[province];
    if (data) {
        document.getElementById('report-panel').innerHTML = `
        <h3>Báo cáo: ${province}</h3>
        <p>Dân số: ${data.population}</p>
        <p>Ca nhiễm: ${data.cases}</p>
        <p>Hồi phục: ${data.recovered}</p>
      `;
    } else {
        document.getElementById('report-panel').innerHTML = 'Không có dữ liệu.';
    }
}

simplemaps_countrymap.hooks.click_state = function (id) {
    const name = simplemaps_countrymap_mapdata.state_specific[id].name;

    if (provinceStats[name]) {
        updateOverview(name, provinceStats[name]);

        // Xoá vị trí cũ nếu có
        if (simplemaps_countrymap_mapdata.locations["3"]) {
            delete simplemaps_countrymap_mapdata.locations["3"];
        }

        // Tạo vị trí icon mới tại state được chọn
        const state = simplemaps_countrymap.state_info[id];
        simplemaps_countrymap_mapdata.locations["3"] = {
            name: "Chọn",
            lat: state.lat,
            lng: state.lng,
            type: "image",
            image_source: "src/images/MapVietNam/location-marker.png",
            location_size: 40,
            description: ""
        };

        simplemaps_countrymap.refresh();
    }
};


