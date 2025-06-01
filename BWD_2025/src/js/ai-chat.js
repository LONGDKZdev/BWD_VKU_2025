let imageFiles = [];
let documentFiles = [];

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


    imageInput.addEventListener('change', function (e) {
        if (!e.target.files.length) return;
        handleFiles(e.target.files);
    });
    document.addEventListener('paste', function (e) {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const blob = item.getAsFile();
                if (!blob.name) blob.name = `image-${Date.now()}.png`;
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

        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';
        }

        // Hiển thị ảnh thực tế lên chat
        for (const file of imageFiles) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '200px';
            img.alt = file.name;

            const wrapper = document.createElement('div');
            wrapper.className = 'message user';
            wrapper.innerHTML = `<div class="message-container"><div class="message-content"></div></div>`;
            wrapper.querySelector('.message-content').appendChild(img);
            chatMessages.appendChild(wrapper);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Hiển thị tài liệu
        for (const file of documentFiles) {
            addMessage(`📎 Đã gửi tệp: ${file.name}`, 'user');
        }

        // if (imageFiles.length > 0) {
        //     imageFiles.forEach(file => {
        //         addMessage(`📷 Đã gửi ảnh: ${file.name}`, "user");
        //     });
        // }

        if (documentFiles.length > 0) {
            documentFiles.forEach(file => {
                addMessage(`📎 Đã gửi tệp: ${file.name}`, "user");
            });
        }

        typingIndicator.style.display = 'block';

        const fileProcesses = [];

        for (const file of imageFiles) {
            fileProcesses.push(
                extractTextFromImageViaOCRSpace(file).then(text => {
                    if (!text || text.trim() === "" || text.startsWith("❌")) return "";
                    return `🖼 ${file.name}\n${text}`;
                })
            );
        }


        for (const file of documentFiles) {
            if (file.type === "application/pdf") {
                fileProcesses.push(readPDFFile(file));
            } else {
                fileProcesses.push(Promise.resolve(`📎 ${file.name}`));
            }
        }

        try {
            const results = await Promise.all(fileProcesses);
            const fullPrompt = [message, ...results.filter(Boolean)].join('\n\n');
            const aiResponse = await callAIAPI(fullPrompt);
            addMessage(aiResponse, 'ai');
        } catch (err) {
            showNotification("❌ Lỗi xử lý file hoặc AI", "error");
        } finally {
            typingIndicator.style.display = 'none';
            imageFiles = [];
            documentFiles = [];
            const previews = document.querySelectorAll('.file-preview');
            previews.forEach(p => p.remove());
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

        const containerDiv = document.createElement('div');
        containerDiv.className = 'message-container';
        containerDiv.appendChild(contentDiv);
        containerDiv.appendChild(timeDiv);

        messageDiv.appendChild(containerDiv);
        chatMessages.appendChild(messageDiv);

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

        if (!isImage && !isDoc) {
            showNotification(`❌ Tệp "${file.name}" không được hỗ trợ!`, "warning");
            return;
        }

        if (previewContainer.childNodes.length >= 5) {
            showNotification("Chỉ gửi tối đa 5 tệp!", "warning");
            return;
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

        if (isImage) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src);
            preview.appendChild(img);
            imageFiles.push(file);
        } else {
            const icon = document.createElement("img");
            icon.src = "https://cdn-icons-png.flaticon.com/512/337/337946.png";
            icon.style.width = "40px";
            const label = document.createElement("div");
            label.className = "file-name-label";
            label.textContent = file.name;
            preview.appendChild(icon);
            preview.appendChild(label);
            documentFiles.push(file);
        }

        preview.appendChild(removeBtn);
        previewContainer.appendChild(preview);

        addFileMessage(file, isImage ? 'image' : 'doc');
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


function readPDFFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const typedarray = new Uint8Array(reader.result);
                const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                let text = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join(' ');
                    text += pageText + '\n';
                }
                resolve(`📄 Nội dung từ ${file.name}:\n${text.trim().slice(0, 1000)}`);
            } catch (err) {
                resolve(`❌ Lỗi đọc PDF: ${file.name}`);
            }
        };
        reader.readAsArrayBuffer(file);
    });
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