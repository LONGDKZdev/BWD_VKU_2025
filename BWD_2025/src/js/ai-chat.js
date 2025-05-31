document.addEventListener('DOMContentLoaded', function () {

    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const surveyBtn = document.getElementById('healthSurveyBtn');
    const modal = document.getElementById('healthSurveyModal');
    const closeModal = document.querySelector('.close-modal');
    const surveyForm = document.getElementById('healthSurveyForm');
    const fileInput = document.getElementById('fileInput');
    const imageInput = document.getElementById('imageInput');
    let imageFiles = [];
    let documentFiles = [];

    imageInput.addEventListener('change', async function (e) {
        const file = e.target.files[0];
        if (!file) return;

        // Hiển thị preview ảnh
        const previewContainer = document.getElementById('filePreviewContainer');
        const preview = document.createElement('div');
        preview.className = 'file-preview';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        } else {
            const fileIcon = document.createElement('span');
            fileIcon.textContent = file.name;
            preview.appendChild(fileIcon);
        }

        // ✅ nút xoá
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.className = 'file-remove-btn';
        removeBtn.onclick = () => {
            preview.remove();
            files = files.filter(f => f !== file);
        };
        preview.appendChild(removeBtn);

        previewContainer.appendChild(preview);


        // Gửi thông báo đang xử lý
        addMessage("🖼 Đang đọc nội dung trong ảnh...", 'ai');

        // OCR và gửi Gemini
        try {
            addMessage("📄 Văn bản trong ảnh: " + text.trim(), 'user');
            typingIndicator.style.display = 'block';

            const aiResponse = await callAIAPI(`Đây là nội dung trích xuất từ ảnh:\n${text}\n\nHãy phân tích hoặc đưa ra phản hồi phù hợp.`);
            typingIndicator.style.display = 'none';

            addMessage(aiResponse, 'ai');
        } catch (err) {
            console.error("Lỗi OCR:", err);
            addMessage("❌ Không thể đọc nội dung từ ảnh.", 'ai');
        }

    });
    document.addEventListener('paste', function (e) {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const blob = item.getAsFile();
                handleFiles([blob]);
            }
        }
    });

    // Hàm để gọi API AI
    async function callAIAPI(message) {
        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDJ8iFbiFaeYB6Vbtpy-Q1Yr3GXo48dXME",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `Hãy chia câu trả lời thành các đoạn rõ ràng, dùng markdown như **in đậm**, *in nghiêng*, và xuống dòng nếu cần. Câu hỏi: ${message}`
                                    }
                                ]
                            }
                        ]
                    })
                }
            );

            if (!response.ok) throw new Error("Lỗi khi gọi API Gemini");

            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi chưa có câu trả lời phù hợp.";
        } catch (error) {
            console.error("Lỗi khi gọi Gemini API:", error);
            return "Xin lỗi, có lỗi xảy ra khi kết nối đến AI.";
        }
    }

    function formatText(text) {
        // Bôi đậm **text**
        text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        // In nghiêng *text*
        text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // Xuống dòng
        text = text.replace(/\n{2,}/g, "</p><p>");
        text = text.replace(/\n/g, "<br>");

        // Gói toàn bộ vào thẻ <p>
        return `<p>${text}</p>`;
    }



    // Xử lý sự kiện gửi tin nhắn
    //1
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message && imageFiles.length === 0 && documentFiles.length === 0) {
            showNotification("Vui lòng nhập nội dung hoặc chọn tệp!", "warning");
            return;
        }

        // Hiển thị user input
        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';
        }

        // Hiển thị preview đã gửi
        if (imageFiles.length > 0) {
            imageFiles.forEach(file => {
                addMessage(`📷 Đã gửi ảnh: ${file.name}`, "user");
            });
        }

        if (documentFiles.length > 0) {
            documentFiles.forEach(file => {
                addMessage(`📎 Đã gửi tệp: ${file.name}`, "user");
            });
        }

        typingIndicator.style.display = 'block';

        // Xử lý OCR ảnh và đọc file PDF
        const fileProcesses = [];

        // Ảnh
        for (const file of imageFiles) {
            fileProcesses.push(extractTextFromImageViaOCRSpace(file).then(text => {
                return `📷 ${file.name}\n${text}`;
            }));
        }

        // Tài liệu
        for (const file of documentFiles) {
            if (file.type === "application/pdf") {
                // xử lý PDF như đã làm
            }
        }


        // Ghép nội dung text + file
        try {
            const results = await Promise.all(fileProcesses);
            const fullPrompt = [message, ...results.filter(Boolean)].join('\n\n');

            const aiResponse = await callAIAPI(fullPrompt);
            addMessage(aiResponse, 'ai');
        } catch (err) {
            console.error("Chi tiết lỗi:", err);
            showNotification("❌ Có lỗi xảy ra khi gửi nội dung. Vui lòng thử lại sau.", "error");

        } finally {
            typingIndicator.style.display = 'none';
            imageFiles = [];
            documentFiles = [];
            document.getElementById('filePreviewContainer').innerHTML = '';
        }
    }



    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = formatText(text);

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeDiv.textContent = `${hours}:${minutes}`;

        // Tạo một div container để bọc nội dung và thời gian
        const containerDiv = document.createElement('div');
        containerDiv.className = 'message-container';
        containerDiv.appendChild(contentDiv);
        containerDiv.appendChild(timeDiv);

        messageDiv.appendChild(containerDiv);
        chatMessages.appendChild(messageDiv);

        // Cuộn xuống cuối khung chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }



    // Xử lý sự kiện click nút gửi
    sendMessageBtn.addEventListener('click', sendMessage);

    // Xử lý sự kiện nhấn Enter trong input
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Xử lý sự kiện click vào các nút gợi ý
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            messageInput.value = this.textContent;
            sendMessage();
        });
    });

    // Xử lý modal khảo sát sức khỏe
    surveyBtn.addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Xử lý form khảo sát
    surveyForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        modal.style.display = 'none';

        // Thu thập dữ liệu form
        const formData = new FormData(surveyForm);
        const surveyData = {};
        formData.forEach((value, key) => {
            surveyData[key] = value;
        });

        // Tạo prompt cho Gemini
        const surveyPrompt = `
    Tôi là trợ lý sức khỏe AI. Đây là thông tin của một người dùng:
    
    - Tập thể dục thường xuyên: ${surveyData.exercise}
    - Ngủ mỗi ngày: ${surveyData.sleep} giờ
    - Mức độ stress: ${surveyData.stress}
    - Vấn đề sức khỏe: ${surveyData["health-issues"] || "Không rõ"}
    - Chiều cao: ${surveyData.height} cm
    - Cân nặng: ${surveyData.weight} kg
    - Mục tiêu: ${surveyData.goal}
    - Thói quen: ${surveyData.habits || "Không ghi rõ"}
    
    Hãy đánh giá tình trạng hiện tại và đưa ra lời khuyên cá nhân hóa phù hợp. Trình bày rõ ràng bằng markdown có **bôi đậm**, *in nghiêng*, gạch đầu dòng nếu cần.
    `;

        // Hiển thị tin nhắn của người dùng
        addMessage("Tôi đã gửi khảo sát sức khỏe của mình.", "user");

        // Gọi AI với prompt
        typingIndicator.style.display = 'block';
        const aiResponse = await callAIAPI(surveyPrompt);
        typingIndicator.style.display = 'none';
        addMessage(aiResponse, 'ai');
    });



});

// Xử lý sự kiện chọn tệp
fileInput.addEventListener('change', handleFileSelect);





// Xử lý kéo thả
chatMessages.addEventListener('dragover', (e) => {
    e.preventDefault();
    chatMessages.classList.add('drag-over');
});

chatMessages.addEventListener('dragleave', () => {
    chatMessages.classList.remove('drag-over');
});

chatMessages.addEventListener('drop', (e) => {
    e.preventDefault();
    chatMessages.classList.remove('drag-over');
    handleFiles(Array.from(e.dataTransfer.files)); // Đảm bảo hàm này hoạt động đúng
});


function handleFileSelect(e) {
    handleFiles(e.target.files);
}

function handleFiles(fileList) {
    const previewContainer = document.getElementById('filePreviewContainer');

    Array.from(fileList).forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'webp', 'ico'].includes(ext);
        const isDoc = ['pdf', 'doc', 'docx'].includes(ext);

        if (!isImage && isDoc) {
            documentFiles.push(file);
            const icon = document.createElement("img");
            icon.src = "https://cdn-icons-png.flaticon.com/512/337/337946.png";
            icon.className = "doc-icon";
            const label = document.createElement("div");
            label.className = "file-name-label";
            label.textContent = file.name;

            preview.appendChild(icon);
            preview.appendChild(label);
        }


        const preview = document.createElement('div');
        preview.className = 'file-preview';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'file-remove-btn';
        removeBtn.textContent = '×';
        removeBtn.onclick = () => {
            preview.remove();
            if (isImage) imageFiles = imageFiles.filter(f => f !== file);
            else documentFiles = documentFiles.filter(f => f !== file);
        };

        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = () => URL.revokeObjectURL(img.src); // tránh rò rỉ bộ nhớ
        preview.appendChild(img);

        const icon = document.createElement("img");
        icon.src = "https://cdn-icons-png.flaticon.com/512/337/337946.png"; // icon file
        icon.style.width = "48px";
        icon.style.marginBottom = "6px";


        if (isImage) {
            imageFiles.push(file);
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        } else {
            documentFiles.push(file);
            const icon = document.createElement("img");
            icon.src = "https://cdn-icons-png.flaticon.com/512/337/337946.png"; // icon PDF
            icon.style.width = "50px";
            icon.style.marginBottom = "6px";
            const label = document.createElement("div");
            label.className = "file-name-label";
            label.textContent = file.name;
            preview.appendChild(icon);
            preview.appendChild(label);
        }

        if (!isImage && !isDoc) {
            showNotification(`❌ Tệp "${file.name}" không được hỗ trợ!`, "warning");
            return;
        }


        preview.appendChild(removeBtn);
        previewContainer.appendChild(preview);
    });
}




function displayFileMessage(file) {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-message';
    fileDiv.innerHTML = `
            <i class="fas fa-file"></i>
            <span class="file-name">${file.name}</span>
            <i class="fas fa-times remove-file"></i>
        `;

    const removeBtn = fileDiv.querySelector('.remove-file');
    removeBtn.onclick = () => {
        files = files.filter(f => f !== file);
        fileDiv.remove();
    };
    preview.appendChild(removeBtn);
    chatMessages.appendChild(fileDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


async function extractTextFromImageViaOCRSpace(file) {
    const formData = new FormData();
    formData.append("apikey", "K83282963988957");
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("file", file);

    try {
        const response = await fetch("https://api.ocr.space/parse/image", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        const extracted = result.ParsedResults?.[0]?.ParsedText?.trim();
        return extracted || "❌ Không thể trích xuất nội dung từ ảnh.";
    } catch (err) {
        console.error("OCR.space error:", err);
        return "❌ Lỗi khi gọi OCR.space.";
    }
}





function showNotification(message, type = 'warning', duration = 3000) {
    const noti = document.getElementById('notification');
    noti.textContent = message;
    noti.className = `notification show ${type}`;

    setTimeout(() => {
        noti.classList.remove('show');
        setTimeout(() => {
            noti.textContent = '';
            noti.className = 'notification';
        }, 400);
    }, duration);
}

;