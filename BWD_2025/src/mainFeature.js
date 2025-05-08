// Core imports
import { auth, db } from "./core/firebase.js";
import { showToast, showLoading, hideLoading } from "./core/common.js";

// Auth modules
import { 
    checkAuthState,
    initSessionPersistence,
    logoutUser 
} from "./modules/auth/auth.js";
import { signInWithGoogle, signInWithGithub } from "./modules/auth/social-auth.js";
import { resetPassword } from "./modules/auth/forgot-password.js";

// User modules
import {
    getUserProfile,
    updateUserProfile,
    addUserPoints,
    fetchLeaderboard
} from "./modules/user/user.js";

// Post modules
import {
    createPost,
    updatePost,
    deletePost,
    fetchPosts
} from "./modules/post/post.js";
import { uploadMedia } from "./modules/post/storage.js";
import { fetchExploreData } from "./modules/post/explore.js";

// Chat modules
import {
    sendMessage,
    fetchMessages,
    createChatGroup
} from "./modules/chat/chat.js";
import { 
    fetchCommunityPosts,
    createCommunityPost 
} from "./modules/chat/community.js";

// Export tất cả các functions cần thiết
export {
    // Auth exports
    checkAuthState,
    initSessionPersistence,
    logoutUser,
    signInWithGoogle,
    signInWithGithub,
    resetPassword,

    // User exports
    getUserProfile,
    updateUserProfile,
    addUserPoints,
    fetchLeaderboard,

    // Post exports
    createPost,
    updatePost,
    deletePost,
    fetchPosts,
    uploadMedia,
    fetchExploreData,

    // Chat exports
    sendMessage,
    fetchMessages,
    createChatGroup,
    fetchCommunityPosts,
    createCommunityPost
};
import { handleRegister } from "./modules/auth/register.js";
import { loadPosts, filterPosts } from "./modules/post/post-list.js";
import { setupChat } from "./modules/chat/chat.js";
import { setupGroups } from "./modules/chat/groups.js";

// Khởi tạo ứng dụng
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    // Xử lý theo từng trang
    if (path.includes("register")) {
        handleRegisterPage();
    } else if (path.includes("explore")) {
        handleExplorePage();
    } else if (path.includes("community")) {
        handleCommunityPage();
    } else if (path.includes("account")) {
        handleAccountPage();
    }
});

// Xử lý các trang riêng biệt
function handleRegisterPage() {
    const form = document.getElementById("register-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            handleRegister();
        });
    }
}

function handleExplorePage() {
    // Khởi tạo trang Explore
    loadPosts();
    setupExploreEvents();
}

function handleCommunityPage() {
    // Khởi tạo trang Community
    setupChat();
    setupGroups();
}

function handleAccountPage() {
    // Khởi tạo trang Account
    setupAccountEvents();
}

// Các hàm helper
function setupExploreEvents() {
    // Gắn các sự kiện cho trang Explore
    document.querySelectorAll(".category-filter a").forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.category;
            filterPosts(category);
        });
    });
}

function setupAccountEvents() {
    // Gắn các sự kiện cho trang Account
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.dataset.tab;
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("google-login")?.addEventListener("click", signInWithGoogle);
    document.getElementById("github-login")?.addEventListener("click", signInWithGithub);
    document.getElementById("google-register")?.addEventListener("click", signInWithGoogle);
    document.getElementById("github-register")?.addEventListener("click", signInWithGithub);
});
