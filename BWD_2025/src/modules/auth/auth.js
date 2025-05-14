import { auth, db } from "../../core/firebase.js";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

export async function register({ email, password, name }) {
  try {
    console.log("🔐 Đang tạo tài khoản Firebase...");

    // Kiểm tra xem email đã tồn tại chưa
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      console.error("❌ Email đã tồn tại trong hệ thống.");
      throw new Error("Email đã tồn tại trong hệ thống.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ Firebase Auth tạo xong:", user.uid);

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name,
      email,
      createdAt: new Date().toISOString()
    });

    console.log("✅ Đã lưu user vào Firestore");
  } catch (error) {
    console.error("❌ Đăng ký lỗi:", error);
    throw error; // để hiển thị alert ở register.js
  }
}
