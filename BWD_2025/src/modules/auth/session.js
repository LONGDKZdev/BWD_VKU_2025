// session.js
import { auth, db } from "../core/firebase-config.js";
import { 
    onAuthStateChanged, 
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { showToast } from "../../core/common.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Thiết lập persistence cho session
export async function setPersistenceType(rememberMe = true) {
    try {
        const persistenceType = rememberMe 
            ? browserLocalPersistence  // Lưu phiên đăng nhập lâu dài
            : browserSessionPersistence; // Chỉ lưu trong tab hiện tại
            
        await setPersistence(auth, persistenceType);
        
        // Lưu lựa chọn vào localStorage
        localStorage.setItem("rememberMe", rememberMe);
        
        return true;
    } catch (error) {
        console.error("Lỗi thiết lập persistence:", error);
        return false;
    }
}

// Kiểm tra trạng thái đăng nhập
export function checkAuthState(callback) {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Người dùng đã đăng nhập
            try {
                // Cập nhật trạng thái online
                await updateUserStatus(user.uid, true);
                
                // Thiết lập timer để cập nhật lastActive
                startActivityTimer(user.uid);
            } catch (error) {
                console.error("Lỗi cập nhật trạng thái:", error);
            }
        } else {
            // Người dùng chưa đăng nhập
            stopActivityTimer();
        }
        
        // Gọi callback với thông tin người dùng
        callback(user);
    });
}

// Đăng xuất
export async function logoutUser() {
    try {
        const user = auth.currentUser;
        if (user) {
            // Cập nhật trạng thái offline
            await updateUserStatus(user.uid, false);
        }
        
        // Dừng timer
        stopActivityTimer();
        
        // Đăng xuất
        await signOut(auth);
        
        // Xóa dữ liệu session
        clearSessionData();
        
        showToast("Đã đăng xuất thành công!", "success");
        return true;
    } catch (error) {
        console.error("Lỗi đăng xuất:", error);
        showToast(error.message, "error");
        return false;
    }
}

// Cập nhật trạng thái online/offline
async function updateUserStatus(uid, isOnline) {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            isOnline: isOnline,
            lastActive: serverTimestamp()
        });
    } catch (error) {
        console.error("Lỗi cập nhật trạng thái:", error);
    }
}

// Biến lưu timer
let activityTimer = null;

// Bắt đầu timer cập nhật trạng thái hoạt động
function startActivityTimer(uid) {
    // Dừng timer cũ nếu có
    stopActivityTimer();
    
    // Cập nhật mỗi 5 phút
    activityTimer = setInterval(async () => {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                lastActive: serverTimestamp()
            });
        } catch (error) {
            console.error("Lỗi cập nhật thời gian hoạt động:", error);
        }
    }, 5 * 60 * 1000); // 5 phút
}

// Dừng timer
function stopActivityTimer() {
    if (activityTimer) {
        clearInterval(activityTimer);
        activityTimer = null;
    }
}

// Xóa dữ liệu session
function clearSessionData() {
    // Xóa dữ liệu session trong localStorage (nếu có)
    // Lưu ý: không xóa rememberMe để giữ tùy chọn của người dùng
    const rememberMe = localStorage.getItem("rememberMe");
    
    // Xóa các dữ liệu khác
    localStorage.removeItem("userData");
    localStorage.removeItem("lastRoute");
    
    // Khôi phục rememberMe
    if (rememberMe !== null) {
        localStorage.setItem("rememberMe", rememberMe);
    }
}

// Kiểm tra và áp dụng persistence từ localStorage
export function initSessionPersistence() {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    setPersistenceType(rememberMe);
}


// Gọi hàm này khi tài khoản bị xóa
export async function deleteUserData(uid) {
    try {
        await deleteDoc(doc(db, "users", uid));
        console.log("🗑️ Đã xoá dữ liệu Firestore của user:", uid);
    } catch (error) {
        console.error("❌ Lỗi khi xoá dữ liệu Firestore:", error);
    }
}
