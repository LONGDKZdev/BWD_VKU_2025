document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const surveyBtn = document.getElementById('healthSurveyBtn');
    const modal = document.getElementById('healthSurveyModal');
    const closeModal = document.querySelector('.close-modal');
    const surveyForm = document.getElementById('healthSurveyForm');

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
                                        text:`Hãy chia câu trả lời thành các đoạn rõ ràng, dùng markdown như **in đậm**, *in nghiêng*, và xuống dòng nếu cần. Câu hỏi: ${message}`
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
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        // Thêm tin nhắn của người dùng vào khung chat
        addMessage(message, 'user');
        messageInput.value = '';

        // Hiển thị typing indicator
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Gọi API AI và nhận phản hồi
        const aiResponse = await callAIAPI(message);
        typingIndicator.style.display = 'none';
        addMessage(aiResponse, 'ai');
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
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Xử lý sự kiện click vào các nút gợi ý
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            messageInput.value = this.textContent;
            sendMessage();
        });
    });

    // Xử lý modal khảo sát sức khỏe
    surveyBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Xử lý form khảo sát
    surveyForm.addEventListener('submit', async function(e) {
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