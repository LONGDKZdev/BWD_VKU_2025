// Dữ liệu mẫu cho bài đăng
const posts = [
    {
        id: 1,
        user: {
            id: 1,
            name: "Trần Thị A",
            avatar: "images/avatar-1.jpg",
            rank: 1
        },
        category: "fitness",
        content: "Hoàn thành buổi chạy sáng nay! Cảm thấy tuyệt vời khi bắt đầu ngày mới với năng lượng tích cực. #RunningMotivation #SelfRise",
        media: {
            type: "image",
            url: "images/running-activity.jpg"
        },
        activity: {
            type: "running",
            distance: 5.2,
            time: "28:45",
            pace: "5:32",
            calories: 320
        },
        likes: 42,
        comments: 8,
        saved: false,
        liked: false,
        time: "2 giờ trước",
        commentsList: [
            {
                id: 1,
                user: {
                    id: 2,
                    name: "Nguyễn Văn B",
                    avatar: "images/avatar-2.jpg"
                },
                text: "Tuyệt vời! Tôi cũng đang cố gắng duy trình chạy bộ mỗi sáng.",
                time: "1 giờ trước",
                likes: 3
            },
            {
                id: 2,
                user: {
                    id: 3,
                    name: "Lê Văn C",
                    avatar: "images/avatar-3.jpg"
                },
                text: "Bạn có thể chia sẻ lịch trình chạy bộ của mình không?",
                time: "45 phút trước",
                likes: 1
            }
        ]
    },
    {
        id: 2,
        user: {
            id: 2,
            name: "Nguyễn Văn B",
            avatar: "images/avatar-2.jpg",
            rank: 2
        },
        category: "nutrition",
        content: "Hôm nay mình đã chuẩn bị bữa sáng lành mạnh với yến mạch, hạt chia và trái cây tươi. Bắt đầu ngày mới với nguồn năng lượng tốt nhất! #HealthyBreakfast #NutritionGoals",
        media: {
            type: "image",
            url: "images/healthy-breakfast.jpg"
        },
        likes: 35,
        comments: 5,
        saved: true,
        liked: true,
        time: "5 giờ trước",
        commentsList: [
            {
                id: 3,
                user: {
                    id: 1,
                    name: "Trần Thị A",
                    avatar: "images/avatar-1.jpg"
                },
                text: "Trông ngon quá! Bạn có thể chia sẻ công thức không?",
                time: "4 giờ trước",
                likes: 2
            }
        ]
    },
    {
        id: 3,
        user: {
            id: 5,
            name: "Đỗ Văn E",
            avatar: "images/avatar-5.jpg",
            rank: 5
        },
        category: "podcast",
        content: "Mới ra mắt tập podcast mới về cách quản lý thời gian hiệu quả. Hãy lắng nghe và chia sẻ cảm nhận của bạn nhé! #TimeManagement #ProductivityTips",
        media: {
            type: "audio",
            url: "audio/time-management-podcast.mp3",
            thumbnail: "images/podcast-thumbnail.jpg"
        },
        likes: 28,
        comments: 7,
        saved: false,
        liked: false,
        time: "1 ngày trước",
        commentsList: [
            {
                id: 4,
                user: {
                    id: 3,
                    name: "Lê Văn C",
                    avatar: "images/avatar-3.jpg"
                },
                text: "Tập podcast rất hay! Tôi đã học được nhiều kỹ thuật quản lý thời gian mới.",
                time: "20 giờ trước",
                likes: 4
            }
        ]
    },
    {
        id: 4,
        user: {
            id: 3,
            name: "Lê Văn C",
            avatar: "images/avatar-3.jpg",
            rank: 3
        },
        category: "meditation",
        content: "Vừa hoàn thành buổi thiền 30 phút. Cảm thấy tâm trí thật tĩnh lặng và tập trung. Thiền định thực sự giúp mình giảm căng thẳng rất nhiều. #MeditationPractice #MindfulLiving",
        media: {
            type: "image",
            url: "images/meditation-session.jpg"
        },
        activity: {
            type: "meditation",
            time: "30:00",
            focus: "85%",
            mood: "Bình an"
        },
        likes: 31,
        comments: 4,
        saved: false,
        liked: true,
        time: "1 ngày trước",
        commentsList: []
    },
    {
        id: 5,
        user: {
            id: 4,
            name: "Hoàng Thị D",
            avatar: "images/avatar-4.jpg",
            rank: 4
        },
        category: "study",
        content: "Vừa hoàn thành khóa học về Machine Learning trên Coursera! Đây là dự án cuối khóa của mình. Rất vui vì đã kiên trì học xong khóa học này. #MachineLearning #OnlineLearning #SelfImprovement",
        media: {
            type: "video",
            url: "videos/ml-project-demo.mp4",
            thumbnail: "images/ml-project-thumbnail.jpg"
        },
        likes: 45,
        comments: 12,
        saved: false,
        liked: false,
        time: "2 ngày trước",
        commentsList: []
    }
];

// Dữ liệu mẫu cho bảng xếp hạng
let rankData = [
    {
        id: 1,
        name: "Trần Thị A",
        avatar: "images/avatar-1.jpg",
        category: "fitness",
        posts: 42,
        streak: 45,
        score: 1250,
        trend: "up"
    },
    {
        id: 2,
        name: "Nguyễn Văn B",
        avatar: "images/avatar-2.jpg",
        category: "nutrition",
        posts: 38,
        streak: 38,
        score: 950,
        trend: "up"
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "images/avatar-3.jpg",
        category: "meditation",
        posts: 35,
        streak: 30,
        score: 820,
        trend: "down"
    },
    {
        id: 4,
        name: "Hoàng Thị D",
        avatar: "images/avatar-4.jpg",
        category: "study",
        posts: 32,
        streak: 25,
        score: 780,
        trend: "up"
    },
    {
        id: 5,
        name: "Đỗ Văn E",
        avatar: "images/avatar-5.jpg",
        category: "podcast",
        posts: 28,
        streak: 20,
        score: 750,
        trend: "neutral"
    },
    {
        id: 6,
        name: "Ngô Thị F",
        avatar: "images/avatar-6.jpg",
        category: "nutrition",
        posts: 25,
        streak: 18,
        score: 720,
        trend: "up"
    },
    {
        id: 7,
        name: "Vũ Văn G",
        avatar: "images/avatar-7.jpg",
        category: "fitness",
        posts: 22,
        streak: 15,
        score: 700,
        trend: "down"
    },
    {
        id: 8,
        name: "Đinh Thị H",
        avatar: "images/avatar-8.jpg",
        category: "meditation",
        posts: 20,
        streak: 12,
        score: 680,
        trend: "up"
    },
    {
        id: 9,
        name: "Bùi Văn I",
        avatar: "images/avatar-9.jpg",
        category: "study",
        posts: 18,
        streak: 10,
        score: 660,
        trend: "neutral"
    },
    {
        id: 10,
        name: "Phạm Minh D",
        avatar: "images/your-avatar.jpg",
        category: "fitness",
        posts: 24,
        streak: 15,
        score: 650,
        trend: "up"
    },
    // Thêm nhiều dữ liệu hơn cho phân trang
    {
        id: 11,
        name: "Trần Văn K",
        avatar: "images/avatar-11.jpg",
        category: "nutrition",
        posts: 15,
        streak: 8,
        score: 630,
        trend: "down"
    },
    {
        id: 12,
        name: "Lý Thị L",
        avatar: "images/avatar-12.jpg",
        category: "fitness",
        posts: 12,
        streak: 7,
        score: 610,
        trend: "up"
    }
];

// Dữ liệu mẫu cho thành tích
const achievements = [
    {
        id: 1,
        title: "Chuỗi ngày liên tiếp",
        description: "Hoàn thành mục tiêu 15 ngày liên tiếp",
        icon: "fas fa-fire",
        progress: 100,
        completed: true
    },
    {
        id: 2,
        title: "Vận động viên",
        description: "Hoàn thành 50 bài tập thể dục",
        icon: "fas fa-dumbbell",
        progress: 60,
        completed: false
    },
    {
        id: 3,
        title: "Dinh dưỡng cân bằng",
        description: "Theo dõi chế độ ăn 30 ngày liên tiếp",
        icon: "fas fa-carrot",
        progress: 80,
        completed: false
    },
    {
        id: 4,
        title: "Thiền định",
        description: "Hoàn thành 20 phiên thiền",
        icon: "fas fa-brain",
        progress: 40,
        completed: false
    },
    {
        id: 5,
        title: "Top 10",
        description: "Đạt thứ hạng trong top 10",
        icon: "fas fa-medal",
        progress: 100,
        completed: true
    },
    {
        id: 6,
        title: "Người truyền cảm hứng",
        description: "Có 50 người theo dõi",
        icon: "fas fa-users",
        progress: 70,
        completed: false
    },
    {
        id: 7,
        title: "Học giả",
        description: "Hoàn thành 10 khóa học trực tuyến",
        icon: "fas fa-graduation-cap",
        progress: 30,
        completed: false
    },
    {
        id: 8,
        title: "Podcaster",
        description: "Đăng 5 podcast về phát triển bản thân",
        icon: "fas fa-microphone",
        progress: 20,
        completed: false
    }
];

// Thêm dữ liệu mới
const additionalUsers = [
    {
        id: 13,
        name: "Mai Thị M",
        avatar: "images/avatar-13.jpg",
        category: "meditation",
        posts: 10,
        streak: 5,
        score: 590,
        trend: "up"
    },
    {
        id: 14,
        name: "Hoàng Văn N",
        avatar: "images/avatar-14.jpg",
        category: "fitness",
        posts: 8,
        streak: 4,
        score: 570,
        trend: "neutral"
    },
    {
        id: 15,
        name: "Đặng Thị P",
        avatar: "images/avatar-15.jpg",
        category: "nutrition",
        posts: 6,
        streak: 3,
        score: 550,
        trend: "down"
    }
];

// Thêm dữ liệu mới vào rankData
rankData = [...rankData, ...additionalUsers];

// Biến toàn cục
let currentPage = 1;
const itemsPerPage = 10;
let totalPages = Math.ceil(rankData.length / itemsPerPage);
let filteredRankData = [...rankData];
let filteredPosts = [...posts];
let currentFilter = 'trending';
let currentCategory = 'all';

// Các phần tử DOM
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo trang
    initializePage();
    
    // Thiết lập sự kiện
    setupEventListeners();
    
    // Hiệu ứng animation
    animateElements();
    
    // Tăng cường UI
    enhanceUIElements();
});

// Khởi tạo trang
function initializePage() {
    // Hiển thị bài đăng
    renderPosts();
    
    // Hiển thị bảng xếp hạng
    renderRankTable();
    
    // Hiển thị thành tích
    renderAchievements();
    
    // Hiển thị loading spinner ban đầu
    document.getElementById('feed-spinner').style.display = 'none';
    document.getElementById('table-spinner').style.display = 'none';
}

// Thiết lập sự kiện
function setupEventListeners() {
    // Sự kiện cho bộ lọc danh mục
    document.querySelectorAll('.category-filter a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cập nhật trạng thái active
            document.querySelectorAll('.category-filter li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Lọc bài đăng theo danh mục
            currentCategory = this.getAttribute('data-category');
            filterPosts();
        });
    });
    
    // Sự kiện cho bộ lọc feed
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Cập nhật trạng thái active
            document.querySelectorAll('.filter-btn').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Lọc bài đăng theo loại
            currentFilter = this.getAttribute('data-filter');
            filterPosts();
        });
    });
    
    // Sự kiện cho nút đăng bài
    document.getElementById('publish-btn').addEventListener('click', publishPost);
    
    // Sự kiện cho các nút đính kèm
    document.getElementById('photo-btn').addEventListener('click', () => showAttachmentDialog('photo'));
    document.getElementById('video-btn').addEventListener('click', () => showAttachmentDialog('video'));
    document.getElementById('podcast-btn').addEventListener('click', () => showAttachmentDialog('podcast'));
    document.getElementById('activity-btn').addEventListener('click', () => showAttachmentDialog('activity'));
    
    // Sự kiện cho nút tìm kiếm
    document.getElementById('search-button').addEventListener('click', searchContent);
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchContent();
        }
    });
    
    // Sự kiện cho nút theo dõi
    document.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Theo dõi') {
                this.textContent = 'Đang theo dõi';
                this.classList.add('following');
            } else {
                this.textContent = 'Theo dõi';
                this.classList.remove('following');
            }
        });
    });
    
    // Sự kiện cho bộ lọc bảng xếp hạng
    document.getElementById('time-filter').addEventListener('change', renderRankTable);
    document.getElementById('category-leaderboard').addEventListener('change', renderRankTable);
    
    
    // Sự kiện cho nút xem thêm
    document.getElementById('load-more').addEventListener('click', loadMorePosts);
    
    // Sự kiện đóng modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('post-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Hiệu ứng animation
function animateElements() {
    // Hiệu ứng cho thanh tiến trình
    animateProgressBars();
    
    // Hiệu ứng cho bài đăng
    animatePostCards();
}

// Hiệu ứng cho thanh tiến trình
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Hiệu ứng cho bài đăng
function animatePostCards() {
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Hiển thị bài đăng
function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) {
        console.error('Posts container not found');
        return;
    }
    
    postsContainer.innerHTML = '';
    const spinner = document.getElementById('feed-spinner');
    
    if (spinner) {
        spinner.style.display = 'flex';
    }
    
    // Sử dụng Promise để xử lý bất đồng bộ tốt hơn
    return new Promise((resolve) => {
        setTimeout(() => {
            filteredPosts.forEach(post => {
                const postCard = createPostCard(post);
                if (postCard) {
                    postsContainer.appendChild(postCard);
                }
            });
            
            animatePostCards();
            
            if (spinner) {
                spinner.style.display = 'none';
            }
            resolve();
        }, 800);
    });
}

// Tạo thẻ bài đăng
function createPostCard(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.setAttribute('data-post-id', post.id);
    
    // Tạo header bài đăng
    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';
    postHeader.innerHTML = `
        <div class="user-avatar">
            <img src="${post.user.avatar}" alt="${post.user.name}">
        </div>
        <div class="user-info">
            <h4>${post.user.name}</h4>
            <span class="post-time">${post.time}</span>
        </div>
        <span class="post-category-badge category-${post.category}">${getCategoryName(post.category)}</span>
    `;
    
    // Tạo nội dung bài đăng
    const postContent = document.createElement('div');
    postContent.className = 'post-content';
    
    // Thêm văn bản
    const postText = document.createElement('p');
    postText.className = 'post-text';
    postText.textContent = post.content;
    postContent.appendChild(postText);
    
    // Thêm media
    if (post.media) {
        const postMedia = document.createElement('div');
        postMedia.className = 'post-media';
        
        switch (post.media.type) {
            case 'image':
                postMedia.innerHTML = `<img src="${post.media.url}" alt="Hình ảnh bài đăng">`;
                break;
            case 'video':
                postMedia.innerHTML = `
                    <video controls poster="${post.media.thumbnail}">
                        <source src="${post.media.url}" type="video/mp4">
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                `;
                break;
            case 'audio':
                postMedia.innerHTML = `
                    <img src="${post.media.thumbnail}" alt="Thumbnail podcast">
                    <audio controls>
                        <source src="${post.media.url}" type="audio/mpeg">
                        Trình duyệt của bạn không hỗ trợ audio.
                    </audio>
                `;
                break;
        }
        
        postContent.appendChild(postMedia);
    }
    
    // Thêm dữ liệu hoạt động
    if (post.activity) {
        const activityData = document.createElement('div');
        activityData.className = 'activity-data';
        
        let activityIcon = '';
        let activityTitle = '';
        
        switch (post.activity.type) {
            case 'running':
                activityIcon = 'fa-running';
                activityTitle = 'Hoạt động chạy bộ';
                break;
            case 'meditation':
                activityIcon = 'fa-brain';
                activityTitle = 'Phiên thiền';
                break;
            default:
                activityIcon = 'fa-chart-line';
                activityTitle = 'Hoạt động';
        }
        
        activityData.innerHTML = `
            <h4><i class="fas ${activityIcon}"></i> ${activityTitle}</h4>
        `;
        
        const activityStats = document.createElement('div');
        activityStats.className = 'activity-stats';
        
        // Thêm các thông số hoạt động
        if (post.activity.type === 'running') {
            activityStats.innerHTML = `
                <div class="activity-stat">
                    <div class="activity-value">${post.activity.distance} km</div>
                    <div class="activity-label">Quãng đường</div>
                </div>
                <div class="activity-stat">
                    <div class="activity-value">${post.activity.time}</div>
                    <div class="activity-label">Thời gian</div>
                </div>
                <div class="activity-stat">
                    <div class="activity-value">${post.activity.pace}</div>
                    <div class="activity-label">Pace</div>
                </div>
                <div class="activity-stat">
                    <div class="activity-value">${post.activity.calories}</div>
                    <div class="activity-label">Calories</div>
                </div>
            `;
     // ... existing code ...
    } else if (post.activity.type === 'meditation') {
        activityStats.innerHTML = `
            <div class="activity-stat">
                <div class="activity-value">${post.activity.time}</div>
                <div class="activity-label">Thời gian</div>
            </div>
            <div class="activity-stat">
                <div class="activity-value">${post.activity.focus}</div>
                <div class="activity-label">Tập trung</div>
            </div>
            <div class="activity-stat">
                <div class="activity-value">${post.activity.mood}</div>
                <div class="activity-label">Tâm trạng</div>
            </div>
        `;
    }
    
    activityData.appendChild(activityStats);
    postContent.appendChild(activityData);
}

postCard.appendChild(postHeader);
postCard.appendChild(postContent);

// Tạo phần tương tác
const postActions = document.createElement('div');
postActions.className = 'post-actions';

const actionButtons = document.createElement('div');
actionButtons.className = 'action-buttons';

// Nút like
const likeBtn = document.createElement('button');
likeBtn.className = `action-btn ${post.liked ? 'liked' : ''}`;
likeBtn.innerHTML = `
    <i class="fas fa-heart"></i>
    <span class="action-count">${post.likes}</span>
`;
likeBtn.addEventListener('click', () => toggleLike(post.id));

// Nút comment
const commentBtn = document.createElement('button');
commentBtn.className = 'action-btn';
commentBtn.innerHTML = `
    <i class="fas fa-comment"></i>
    <span class="action-count">${post.comments}</span>
`;
commentBtn.addEventListener('click', () => showComments(post.id));

// Nút save
const saveBtn = document.createElement('button');
saveBtn.className = `action-btn ${post.saved ? 'saved' : ''}`;
saveBtn.innerHTML = `
    <i class="fas fa-bookmark"></i>
`;
saveBtn.addEventListener('click', () => toggleSave(post.id));

// Nút share
const shareBtn = document.createElement('button');
shareBtn.className = 'action-btn';
shareBtn.innerHTML = `
    <i class="fas fa-share"></i>
`;
shareBtn.addEventListener('click', () => sharePost(post.id));

// Thêm các nút vào action buttons
actionButtons.appendChild(likeBtn);
actionButtons.appendChild(commentBtn);
actionButtons.appendChild(saveBtn);
actionButtons.appendChild(shareBtn);

postActions.appendChild(actionButtons);
postCard.appendChild(postActions);

return postCard;
}

// Lọc bài đăng
function filterPosts() {
// Hiển thị loading spinner
document.getElementById('feed-spinner').style.display = 'flex';

// Giả lập thời gian tải
setTimeout(() => {
    // Lọc theo danh mục
    if (currentCategory === 'all') {
        filteredPosts = [...posts];
    } else {
        filteredPosts = posts.filter(post => post.category === currentCategory);
    }
    
    // Lọc theo loại
    switch (currentFilter) {
        case 'trending':
            filteredPosts.sort((a, b) => b.likes - a.likes);
            break;
        case 'latest':
            // Giả định rằng thời gian đã được sắp xếp
            break;
        case 'following':
            // Giả định rằng người dùng đang theo dõi một số người dùng
            filteredPosts = filteredPosts.filter(post => [1, 2, 5].includes(post.user.id));
            break;
    }
    
    // Hiển thị bài đăng đã lọc
    renderPosts();
}, 500);
}

// Đăng bài
function publishPost() {
const postText = document.getElementById('post-text').value;
const category = document.getElementById('post-category').value;

if (!postText || !category) {
    showNotification('Vui lòng nhập nội dung và chọn danh mục', 'error');
    return;
}

// Tạo bài đăng mới
const newPost = {
    id: posts.length + 1,
    user: {
        id: 10,
        name: "Phạm Minh D",
        avatar: "images/your-avatar.jpg",
        rank: 10
    },
    category: category,
    content: postText,
    likes: 10,
    comments: 0,
    saved: false,
    liked: false,
    time: "Vừa xong",
    commentsList: []
};

// Thêm media nếu có
if (currentAttachment) {
    newPost.media = currentAttachment;
}

// Thêm hoạt động nếu có
if (currentActivity) {
    newPost.activity = currentActivity;
}

// Thêm bài đăng mới vào đầu danh sách
posts.unshift(newPost);
filteredPosts.unshift(newPost);

// Hiển thị lại bài đăng
renderPosts();

// Xóa form
document.getElementById('post-text').value = '';
document.getElementById('post-category').value = '';
currentAttachment = null;
currentActivity = null;

// Hiển thị thông báo
showNotification('Đăng bài thành công!', 'success');
}

// Hiển thị dialog đính kèm
function showAttachmentDialog(type) {
const modal = document.getElementById('post-modal');
const modalTitle = document.querySelector('.modal-title');
const modalContent = document.querySelector('.modal-content-inner');

// Thiết lập tiêu đề
switch (type) {
    case 'photo':
        modalTitle.textContent = 'Thêm hình ảnh';
        break;
    case 'video':
        modalTitle.textContent = 'Thêm video';
        break;
    case 'podcast':
        modalTitle.textContent = 'Thêm podcast';
        break;
    case 'activity':
        modalTitle.textContent = 'Thêm hoạt động';
        break;
}

// Thiết lập nội dung
modalContent.innerHTML = '';

if (type === 'activity') {
    // Form cho hoạt động
    modalContent.innerHTML = `
        <div class="form-group">
            <label for="activity-type">Loại hoạt động</label>
            <select id="activity-type" class="form-control">
                <option value="running">Chạy bộ</option>
                <option value="meditation">Thiền</option>
            </select>
        </div>
        <div id="running-fields">
            <div class="form-group">
                <label for="activity-distance">Quãng đường (km)</label>
                <input type="number" id="activity-distance" class="form-control" step="0.1" min="0">
            </div>
            <div class="form-group">
                <label for="activity-time">Thời gian</label>
                <input type="text" id="activity-time" class="form-control" placeholder="HH:MM:SS">
            </div>
            <div class="form-group">
                <label for="activity-pace">Pace</label>
                <input type="text" id="activity-pace" class="form-control" placeholder="MM:SS">
            </div>
            <div class="form-group">
                <label for="activity-calories">Calories</label>
                <input type="number" id="activity-calories" class="form-control" min="0">
            </div>
        </div>
        <div id="meditation-fields" style="display: none;">
            <div class="form-group">
                <label for="meditation-time">Thời gian</label>
                <input type="text" id="meditation-time" class="form-control" placeholder="HH:MM:SS">
            </div>
            <div class="form-group">
                <label for="meditation-focus">Tập trung</label>
                <input type="text" id="meditation-focus" class="form-control" placeholder="85%">
            </div>
            <div class="form-group">
                <label for="meditation-mood">Tâm trạng</label>
                <input type="text" id="meditation-mood" class="form-control" placeholder="Bình an">
            </div>
        </div>
        <button id="save-activity" class="btn-primary">Lưu hoạt động</button>
    `;
    
    // Sự kiện cho loại hoạt động
    setTimeout(() => {
        document.getElementById('activity-type').addEventListener('change', function() {
            if (this.value === 'running') {
                document.getElementById('running-fields').style.display = 'block';
                document.getElementById('meditation-fields').style.display = 'none';
            } else {
                document.getElementById('running-fields').style.display = 'none';
                document.getElementById('meditation-fields').style.display = 'block';
            }
        });
        
        // Sự kiện cho nút lưu
        document.getElementById('save-activity').addEventListener('click', function() {
            const activityType = document.getElementById('activity-type').value;
            
            if (activityType === 'running') {
                currentActivity = {
                    type: 'running',
                    distance: document.getElementById('activity-distance').value || 0,
                    time: document.getElementById('activity-time').value || '00:00:00',
                    pace: document.getElementById('activity-pace').value || '00:00',
                    calories: document.getElementById('activity-calories').value || 0
                };
            } else {
                currentActivity = {
                    type: 'meditation',
                    time: document.getElementById('meditation-time').value || '00:00:00',
                    focus: document.getElementById('meditation-focus').value || '0%',
                    mood: document.getElementById('meditation-mood').value || 'Bình thường'
                };
            }
            
            showNotification('Đã thêm hoạt động', 'success');
            closeModal();
        });
    }, 100);
} else {
    // Form cho media
    modalContent.innerHTML = `
        <div class="form-group">
            <label for="file-upload">Chọn file</label>
            <input type="file" id="file-upload" class="form-control">
        </div>
        <div class="preview-container">
            <p>Xem trước sẽ hiển thị ở đây</p>
        </div>
        <button id="save-media" class="btn-primary">Lưu</button>
    `;
    
    // Sự kiện cho file upload
    setTimeout(() => {
        document.getElementById('file-upload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const previewContainer = document.querySelector('.preview-container');
                
                if (type === 'photo') {
                    previewContainer.innerHTML = `<img src="${event.target.result}" alt="Preview" style="max-width: 100%;">`;
                } else if (type === 'video') {
                    previewContainer.innerHTML = `
                        <video controls style="max-width: 100%;">
                            <source src="${event.target.result}" type="${file.type}">
                            Trình duyệt của bạn không hỗ trợ video.
                        </video>
                    `;
                } else if (type === 'podcast') {
                    previewContainer.innerHTML = `
                        <audio controls style="width: 100%;">
                            <source src="${event.target.result}" type="${file.type}">
                            Trình duyệt của bạn không hỗ trợ audio.
                        </audio>
                    `;
                }
            };
            
            reader.readAsDataURL(file);
        });
        
        // Sự kiện cho nút lưu
        document.getElementById('save-media').addEventListener('click', function() {
            // Trong thực tế, bạn sẽ tải file lên server
            // Ở đây chúng ta giả định file đã được tải lên
            
            if (type === 'photo') {
                currentAttachment = {
                    type: 'image',
                    url: 'images/user-upload.jpg'
                };
            } else if (type === 'video') {
                currentAttachment = {
                    type: 'video',
                    url: 'videos/user-upload.mp4',
                    thumbnail: 'images/video-thumbnail.jpg'
                };
            } else if (type === 'podcast') {
                currentAttachment = {
                    type: 'audio',
                    url: 'audio/user-upload.mp3',
                    thumbnail: 'images/podcast-thumbnail.jpg'
                };
            }
            
            showNotification('Đã thêm media', 'success');
            closeModal();
        });
    }, 100);
}

// Hiển thị modal
modal.style.display = 'block';
}

// Đóng modal
function closeModal() {
const modal = document.getElementById('post-modal');
modal.style.display = 'none';
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
const notification = document.createElement('div');
notification.className = `notification ${type}`;
notification.textContent = message;

document.body.appendChild(notification);

// Hiệu ứng hiển thị
setTimeout(() => {
    notification.classList.add('show');
}, 10);

// Tự động ẩn sau 3 giây
setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 300);
}, 3000);
}

// Tương tác với bài đăng
function toggleLike(postId) {
const post = posts.find(p => p.id === postId);
if (!post) return;

if (post.liked) {
    post.likes--;
    post.liked = false;
} else {
    post.likes++;
    post.liked = true;
}

// Cập nhật UI
const likeBtn = document.querySelector(`.post-card[data-post-id="${postId}"] .action-btn:first-child`);
if (post.liked) {
    likeBtn.classList.add('liked');
} else {
    likeBtn.classList.remove('liked');
}

likeBtn.querySelector('.action-count').textContent = post.likes;
}

function toggleSave(postId) {
const post = posts.find(p => p.id === postId);
if (!post) return;

post.saved = !post.saved;

// Cập nhật UI
const saveBtn = document.querySelector(`.post-card[data-post-id="${postId}"] .action-btn:nth-child(3)`);
if (post.saved) {
    saveBtn.classList.add('saved');
} else {
    saveBtn.classList.remove('saved');
}
}

function showComments(postId) {
const post = posts.find(p => p.id === postId);
if (!post) return;

// Hiển thị modal comments
const modal = document.getElementById('post-modal');
const modalTitle = document.querySelector('.modal-title');
const modalContent = document.querySelector('.modal-content-inner');

modalTitle.textContent = 'Bình luận';

// Hiển thị danh sách bình luận
modalContent.innerHTML = `
    <div class="comments-list">
        ${post.commentsList.length > 0 ? 
            post.commentsList.map(comment => `
                <div class="comment-item">
                    <div class="user-avatar">
                        <img src="${comment.user.avatar}" alt="${comment.user.name}">
                    </div>
                    <div class="comment-content">
                        <h4>${comment.user.name}</h4>
                        <p>${comment.text}</p>
                        <div class="comment-meta">
                            <span>${comment.time}</span>
                            <button class="like-comment">
                                <i class="fas fa-heart"></i> ${comment.likes}
                            </button>
                        </div>
                    </div>
                </div>
            `).join('') : 
            '<p class="no-comments">Chưa có bình luận nào.</p>'
        }
    </div>
    <div class="comment-form">
        <div class="user-avatar">
            <img src="images/your-avatar.jpg" alt="Avatar của bạn">
        </div>
        <input type="text" id="comment-input" placeholder="Viết bình luận...">
        <button id="submit-comment" class="btn-primary">Gửi</button>
    </div>
`;

// Sự kiện cho nút gửi bình luận
setTimeout(() => {
    document.getElementById('submit-comment').addEventListener('click', function() {
        const commentText = document.getElementById('comment-input').value;
        if (!commentText) return;
        
        // Thêm bình luận mới
        const newComment = {
            id: post.commentsList.length + 1,
            user: {
                id: 10,
                name: "Phạm Minh D",
                avatar: "images/your-avatar.jpg"
            },
            text: commentText,
            time: "Vừa xong",
            likes: 0
        };
        
        post.commentsList.push(newComment);
        post.comments++;
        
        // Cập nhật UI
        document.querySelector(`.post-card[data-post-id="${postId}"] .action-btn:nth-child(2) .action-count`).textContent = post.comments;
        
        // Hiển thị lại bình luận
        showComments(postId);
    });
}, 100);

// Hiển thị modal
modal.style.display = 'block';
}

function sharePost(postId) {
// Trong thực tế, bạn sẽ hiển thị dialog chia sẻ
showNotification('Đã sao chép liên kết bài đăng vào clipboard', 'success');
}

// Tìm kiếm nội dung
function searchContent() {
const searchTerm = document.getElementById('search-input').value.toLowerCase();
if (!searchTerm) return;

// Tìm kiếm trong bài đăng
filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm) || 
    post.user.name.toLowerCase().includes(searchTerm) ||
    getCategoryName(post.category).toLowerCase().includes(searchTerm)
);

// Hiển thị kết quả
renderPosts();

// Hiển thị thông báo
showNotification(`Tìm thấy ${filteredPosts.length} kết quả cho "${searchTerm}"`, 'info');
}

// Hiển thị bảng xếp hạng
function renderRankTable() {
    const tableBody = document.getElementById('rank-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Hiển thị loading spinner
    document.getElementById('table-spinner').style.display = 'flex';
    
    // Lọc dữ liệu theo bộ lọc
    filterRankData();
    
    // Tính toán phân trang
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredRankData.slice(startIndex, endIndex);
    
    // Giả lập thời gian tải
    setTimeout(() => {
        // Hiển thị dữ liệu theo trang
        currentData.forEach((user, index) => {
            const actualRank = startIndex + index + 1; // Tính toán thứ hạng thực tế
            const row = document.createElement('tr');
            
            // Thêm lớp cho hàng của người dùng hiện tại
            if (user.id === 10) {
                row.classList.add('current-user');
            }
            
            // Thêm lớp cho top 3
            if (actualRank <= 3) {
                row.classList.add('top-rank');
            }
            
            // Tạo biểu tượng xu hướng
            let trendIcon = '';
            let trendClass = '';
            
            switch (user.trend) {
                case 'up':
                    trendIcon = '<i class="fas fa-arrow-up"></i>';
                    trendClass = 'trend-up';
                    break;
                case 'down':
                    trendIcon = '<i class="fas fa-arrow-down"></i>';
                    trendClass = 'trend-down';
                    break;
                default:
                    trendIcon = '<i class="fas fa-minus"></i>';
                    trendClass = 'trend-neutral';
            }
            
            // Tạo nội dung hàng
            row.innerHTML = `
                <td class="rank-column">
                    <span class="rank-number">${actualRank}</span>
                </td>
                <td class="user-column">
                    <div class="user-info">
                        <div class="user-avatar">
                            <img src="${user.avatar}" alt="${user.name}">
                        </div>
                        <div class="user-name">${user.name}</div>
                    </div>
                </td>
                <td class="category-column">
                    <span class="category-badge category-${user.category}">${getCategoryName(user.category)}</span>
                </td>
                <td class="posts-column">${user.posts}</td>
                <td class="streak-column">${user.streak}</td>
                <td class="score-column">${user.score}</td>
                <td class="trend-column">
                    <span class="trend ${trendClass}">${trendIcon}</span>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Ẩn loading spinner
        document.getElementById('table-spinner').style.display = 'none';
        
        // Cập nhật phân trang sau khi render bảng
        updatePagination();
        animatePaginationButtons();
    }, 800);
}
// Lọc dữ liệu bảng xếp hạng
function filterRankData() {
    const timeFilter = document.getElementById('time-filter').value;
    const categoryFilter = document.getElementById('category-leaderboard').value;
    
    // Lọc theo thời gian và danh mục
    filteredRankData = rankData.filter(user => {
        // Lọc theo danh mục
        if (categoryFilter !== 'all' && user.category !== categoryFilter) {
            return false;
        }
        
        // Trong thực tế, bạn sẽ lọc theo thời gian ở đây
        // Hiện tại chúng ta chỉ giả lập
        return true;
    });
    
    // Sắp xếp theo điểm số
    filteredRankData.sort((a, b) => b.score - a.score);
    
    // Không cần reset currentPage vì đã bỏ phân trang
}
// Hiển thị thành tích
function renderAchievements() {
const achievementsList = document.querySelector('.achievement-list');
if (!achievementsList) return;

// Chỉ hiển thị 3 thành tích đầu tiên
const topAchievements = achievements.slice(0, 3);

achievementsList.innerHTML = '';

topAchievements.forEach(achievement => {
    const achievementItem = document.createElement('div');
    achievementItem.className = 'achievement-item';
    
    achievementItem.innerHTML = `
        <div class="achievement-icon">
            <i class="${achievement.icon}"></i>
        </div>
        <div class="achievement-info">
            <h4>${achievement.title}</h4>
            <div class="progress-bar">
                <div class="progress" style="width: ${achievement.progress}%"></div>
            </div>
        </div>
    `;
    
    achievementsList.appendChild(achievementItem);
});
}

// Cập nhật thông tin phân trang
function updatePagination() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderRankTable();
            animatePaginationButtons();
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderRankTable();
            animatePaginationButtons();
        }
    };
    
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageSpan = document.createElement('span');
        pageSpan.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageSpan.textContent = i;
        pageSpan.onclick = () => {
            currentPage = i;
            renderRankTable();
            animatePaginationButtons();
        };
        pageNumbers.appendChild(pageSpan);
    }
}

// Hiệu ứng cho các nút phân trang
function animatePaginationButtons() {
    const buttons = document.querySelectorAll('.page-number, .pagination-btn');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.8)';
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        }, 50 * index);
    });
}

// Tải thêm bài đăng
function loadMorePosts() {
// Trong thực tế, bạn sẽ tải thêm bài đăng từ server
// Ở đây chúng ta giả định đã tải thêm bài đăng

document.getElementById('load-more').textContent = 'Đang tải...';

setTimeout(() => {
    // Giả định đã tải thêm bài đăng
    showNotification('Đã tải tất cả bài đăng', 'info');
    document.getElementById('load-more').textContent = 'Xem thêm';
    document.getElementById('load-more').disabled = true;
}, 1500);
}

// Lấy tên danh mục
function getCategoryName(category) {
switch (category) {
    case 'fitness':
        return 'Thể dục';
    case 'nutrition':
        return 'Dinh dưỡng';
    case 'meditation':
        return 'Thiền';
    case 'study':
        return 'Học tập';
    case 'podcast':
        return 'Podcast';
    default:
        return 'Khác';
}
}

// Thêm hiệu ứng cho ô tìm kiếm và nút xem thêm
function enhanceUIElements() {
    // Hiệu ứng cho ô tìm kiếm
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        // Thêm hiệu ứng khi focus vào ô tìm kiếm
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Thêm hiệu ứng khi hover vào nút tìm kiếm
        searchButton.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('fa-spin');
            setTimeout(() => {
                this.querySelector('i').classList.remove('fa-spin');
            }, 500);
        });
    }
    
    // Hiệu ứng cho nút xem thêm
    const loadMoreBtn = document.getElementById('load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Thêm hiệu ứng loading khi click
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
            
            // Giả lập thời gian tải
            setTimeout(() => {
                this.innerHTML = 'Xem thêm';
                loadMorePosts();
            }, 800);
        });
        
        // Thêm hiệu ứng hover
        loadMoreBtn.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '1px';
        });
        
        loadMoreBtn.addEventListener('mouseleave', function() {
            this.style.letterSpacing = 'normal';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var leaderboardSection = document.getElementById('leaderboard');
    var closeBtn = document.querySelector('.close-leaderboard');
    var viewAllLinks = document.querySelectorAll('.view-all');

    if (viewAllLinks && leaderboardSection && closeBtn) {
viewAllLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        leaderboardSection.style.display = 'block';
        leaderboardSection.classList.remove('hide');
        leaderboardSection.classList.add('show');
        leaderboardSection.scrollIntoView({behavior: 'smooth'});
        document.body.style.overflow = 'auto'; // Cho phép cuộn khi mở bảng
    });
});


closeBtn.addEventListener('click', function() {
    leaderboardSection.classList.remove('show');
    leaderboardSection.classList.add('hide');
    setTimeout(function() {
        leaderboardSection.style.display = 'none';
        leaderboardSection.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // Khóa cuộn khi đóng bảng
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn về đầu trang
    }, 400);
});

    }
    
});
document.getElementById('view-detail-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('leaderboard').style.display = 'block';
    setTimeout(function() {
        // Tìm tất cả các dòng trong bảng xếp hạng
        var rows = document.querySelectorAll('#rank-table-body tr');
        for (var i = 0; i < rows.length; i++) {
            // Kiểm tra nếu dòng này chứa tên "Phạm Minh D"
            if (rows[i].textContent.includes('Phạm Minh D')) {
                rows[i].scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    }, 300);
});
let currentAttachment = null;
let currentActivity = null;