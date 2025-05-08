// storage.js
import { storage } from "../core/firebase-config.js";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js";

// Hằng số giới hạn dung lượng file (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// ✅ Hiển thị thông báo toast
function showToast(message, type = "success") {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });
}

// ✅ Upload file (ảnh/video/audio)
export async function uploadFile(folder, file) {
    try {
        if (!file) throw new Error("Không có file!");

        if (!validateFile(file)) throw new Error("File không hợp lệ!");

        const optimizedFile = await optimizeFileIfNeeded(file);
        const filePath = generateFilePath(folder, optimizedFile.name);
        const fileRef = ref(storage, filePath);

        const uploadTask = uploadBytesResumable(fileRef, optimizedFile);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    updateUploadProgress(progress);
                },
                (error) => {
                    handleStorageError(error);
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(fileRef);
                    showToast("Tải file thành công!");
                    resolve(downloadURL);
                }
            );
        });
    } catch (error) {
        handleStorageError(error);
        return null;
    }
}

// ✅ Xoá file khỏi storage
export async function deleteFile(fileUrl) {
    try {
        if (!fileUrl) return;
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);
        showToast("Đã xoá file!");
    } catch (error) {
        console.error("Lỗi xoá file:", error);
        showToast(error.message, "error");
    }
}

// ✅ Kiểm tra file hợp lệ
export function validateFile(file) {
    const imageRegex = /^image\/(jpeg|png|webp)$/;
    return imageRegex.test(file.type) && file.size <= MAX_FILE_SIZE;
}

// ✅ Hàm tối ưu ảnh (có thể mở rộng sau)
export async function optimizeFileIfNeeded(file) {
    return file; // placeholder - có thể thêm nén sau
}

export function generateFilePath(folder, fileName) {
    return `${folder}/${Date.now()}_${fileName}`;
}

// ✅ Hiển thị lỗi rõ ràng
export function handleStorageError(error) {
    console.error("Lỗi upload file:", error);
    showToast(error.message || "Đã xảy ra lỗi!", "error");
}

// ✅ Cập nhật tiến trình upload
export function updateUploadProgress(progress) {
}
