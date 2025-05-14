// src/modules/auth/register.js

import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { auth, db } from "../../core/firebase.js";
import { showToast } from "../../core/common.js";

export async function handleRegister() {
    try {
        const formData = validateRegisterForm();
        if (!formData) return;

        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            formData.email, 
            formData.password
        );

        await setupNewUser(userCredential.user, formData);
        
        showToast(`Đăng ký thành công cho ${formData.name}`, "success");
        redirectToLogin();

    } catch (error) {
        handleAuthError(error);
    }
}

function validateRegisterForm() {
    const formData = {
        name: document.getElementById("name")?.value.trim(),
        email: document.getElementById("email")?.value.trim(),
        password: document.getElementById("password")?.value,
        confirmPassword: document.getElementById("confirm-password")?.value,
        agreed: document.getElementById("terms")?.checked
    };

    if (!formData.name || !formData.email || !formData.password) {
        showToast("Vui lòng điền đầy đủ thông tin", "error");
        return null;
    }

    if (formData.password !== formData.confirmPassword) {
        showToast("Mật khẩu không khớp", "error");
        return null;
    }

    if (!formData.agreed) {
        showToast("Bạn phải đồng ý với điều khoản.", "error");
        return null;
    }

    return formData;
}

async function setupNewUser(user, formData) {
    await updateProfile(user, { displayName: formData.name });
    
    await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        avatar: "",
        createdAt: serverTimestamp(),
        points: 0
    });
}

function redirectToLogin() {
    setTimeout(() => window.location.href = "login.html", 2000);
}

function handleAuthError(error) {
    console.error("Lỗi đăng ký:", error);
    showToast(error.message, "error");
}
