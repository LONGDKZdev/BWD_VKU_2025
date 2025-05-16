// Lưu trữ dữ liệu chat cho mỗi phòng
const chatRooms = {
    'web-dev': {
        name: 'Sức khỏe là nền tảng của cuộc sống',
        avatar: 'src/images/Taptheduc.webp',
        memberCount: '1,2k thành viên',
        messages: '' // Sẽ được cập nhật khi trang tải
    },
    'ml-community': {
        name: 'Ăn mạnh sống khỏe',
        avatar: 'src/images/Healthy.jpg',
        memberCount: '2.4k thành viên',
        messages: `
            <div class="date-divider">
                <span>Hôm nay</span>
            </div>
                                
                    <div class="message-container">
                        <div class="message-avatar">
                            <img src="src/images/NgocHuyen.jpg" alt="Huyen">
                        </div>
                        <div class="message-content">
                            <div class="message-header">
                                <h4>Huyền</h4>
                                <span class="message-time">14:15</span>
                            </div>
                            <div class="message-body">
                                <p>Mọi người có thể chia sẻ thêm kinh nghiệm tập luyện không ạ?</p>
                            </div>
                            <div class="message-actions">
                                <button class="reaction-btn"><i class="far fa-thumbs-up"></i></button>
                                <button class="reaction-btn"><i class="far fa-heart"></i></button>
                                <button class="reaction-btn"><i class="far fa-share-square"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="message-container">
                        <div class="message-avatar">
                            <img src="src/images/ThanhHai.jpg" alt="ThanhHai">
                        </div>
                        <div class="message-content">
                            <div class="message-header">
                                <h4>Thanh Hải</h4>
                                <span class="message-time">14:20</span>
                            </div>
                            <div class="message-body">
                                <p>Theo kinh nghiệm của mình, nên tập thể dục vào buổi sáng sớm hoặc chiều tối. Tránh tập vào buổi trưa vì thời tiết nóng bức có thể ảnh hưởng đến sức khỏe.</p>
                            </div>
                            <div class="message-actions">
                                <button class="reaction-btn"><i class="far fa-thumbs-up"></i> 3</button>
                                <button class="reaction-btn"><i class="far fa-heart"></i> 1</button>
                                <button class="reaction-btn"><i class="far fa-share-square"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="message-container">
                        <div class="message-avatar">
                            <img src="src/images/TuanAnh.jpg" alt="TuanAnh">
                        </div>
                        <div class="message-content">
                            <div class="message-header">
                                <h4>Tuấn Anh</h4>
                                <span class="message-time">14:25</span>
                            </div>
                            <div class="message-body">
                                <p>Đúng vậy, và nên uống đủ nước trước, trong và sau khi tập để cơ thể không bị mất nước. Mọi người có thể tham khảo thêm lịch tập của mình:</p>
                                <div class="message-attachment file">
                                    <i class="fas fa-file-pdf"></i>
                                    <div class="file-info">
                                        <a href="src/images/Lich_tap-moi-ngay.pdf" target="_blank" class="file-name">Lich_tap-moi-ngay.pdf</a>
                                    </div>
                                </div>
                            </div>
                            <div class="message-actions">
                                <button class="reaction-btn"><i class="far fa-thumbs-up"></i> 5</button>
                                <button class="reaction-btn"><i class="far fa-heart"></i> 2</button>
                                <button class="reaction-btn"><i class="far fa-share-square"></i></button>
                            </div>
                        </div>
                    </div>
              
            <div class="message-container">
                <div class="message-avatar">
                    <img src="src/images/HuyLong.jpg" alt="Alice">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <h4>Huy Long</h4>
                        <span class="message-time">10:15</span>
                    </div>
                                 <div class="message-body">
                                    <p>Các bạn xem qua bài này nhé. Rất hay về thể dục mỗi ngày </p>
                                    <div class="message-attachment file">
                                        <i class="fas fa-file-pdf"></i>
                                        <div class="file-info">
                                            <a href="src/images/Thuc-don-moi-ngay.pdf" target="_blank" class="file-name">Thuc-don-moi-ngay.pdf</a>
                                        </div>
                                    </div>
                                </div>
                                
                    <div class="message-actions">
                        <button class="reaction-btn"><i class="far fa-thumbs-up"></i> 3</button>
                        <button class="reaction-btn"><i class="far fa-heart"></i> 1</button>
                        <button class="reaction-btn"><i class="far fa-share-square"></i></button>
                    </div>
                </div>
            </div>`
            
    }
};

// Các biến DOM
let chatMessages;
let messageInput;
let sendBtn;
let emojiBtn;
let emojiPanel;
let closeEmojiPanel;
let attachmentBtn;
let fileUploadPreview;
let closePreview;
let cancelUpload;
let sendFiles;
let selectedFiles = [];

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    chatMessages = document.querySelector('.chat-messages');
    messageInput = document.querySelector('.input-field input');
    sendBtn = document.querySelector('.send-btn');
    emojiBtn = document.getElementById('emoji-btn');
    emojiPanel = document.querySelector('.emoji-panel');
    closeEmojiPanel = document.querySelector('.close-emoji-panel');
    attachmentBtn = document.getElementById('attachment-btn');
    fileUploadPreview = document.querySelector('.file-upload-preview');
    closePreview = document.querySelector('.close-preview');
    cancelUpload = document.querySelector('.cancel-upload');
    sendFiles = document.querySelector('.send-files');
    
    // Lưu nội dung chat ban đầu cho web-dev
    if (chatMessages) {
        chatRooms['web-dev'].messages = chatMessages.innerHTML;
    }
    
    // Thiết lập sự kiện chuyển đổi phòng chat
    setupChatSwitching();
    
    // Thiết lập sự kiện gửi tin nhắn
    setupMessageSending();
    
    // Thiết lập emoji panel
    setupEmojiPanel();
    
    // Thiết lập tải file
    setupFileUpload();
});

// Thiết lập chuyển đổi phòng chat
function setupChatSwitching() {
    document.querySelectorAll('.group-item').forEach(item => {
        item.addEventListener('click', function() {
            // Lưu nội dung chat hiện tại trước khi chuyển
            const currentActiveItem = document.querySelector('.group-item.active');
            if (currentActiveItem) {
                const currentChatId = currentActiveItem.getAttribute('data-chat-id');
                if (chatMessages) {
                    chatRooms[currentChatId].messages = chatMessages.innerHTML;
                }
            }
            
            // Bỏ active tất cả các nhóm
            document.querySelectorAll('.group-item').forEach(i => i.classList.remove('active'));
            
            // Thêm active cho nhóm được click
            this.classList.add('active');
            
            // Lấy dữ liệu phòng chat
            const chatId = this.getAttribute('data-chat-id');
            const chatRoom = chatRooms[chatId];
            
            // Cập nhật tiêu đề chat
            updateChatHeader(chatRoom);
            
            // Tải tin nhắn đã lưu cho phòng chat này
            chatMessages.innerHTML = chatRoom.messages;
            
            // Xóa nội dung input
            messageInput.value = '';
            
            // Ẩn badge thông báo
            const badge = this.querySelector('.group-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    });
}

// Cập nhật tiêu đề chat
function updateChatHeader(chatRoom) {
    const chatTitle = document.querySelector('.chat-title');
    chatTitle.querySelector('.group-avatar img').src = chatRoom.avatar;
    chatTitle.querySelector('.group-info h3').textContent = chatRoom.name;
    chatTitle.querySelector('.group-info p').textContent = chatRoom.memberCount;
}

// Thiết lập gửi tin nhắn
function setupMessageSending() {
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = '';
        }
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = messageInput.value.trim();
            if (message) {
                sendMessage(message);
                messageInput.value = '';
            }
        }
    });

    // Thêm xử lý cho nút video call
const videoCallBtn = document.getElementById('video-call-btn');
videoCallBtn.addEventListener('click', () => {
    // Tạo iframe cho cuộc gọi video
    const videoFrame = document.createElement('iframe');
    videoFrame.src = 'https://meet.jit.si/your-room-name'; // Sử dụng Jitsi Meet
    videoFrame.allow = "camera; microphone; fullscreen; display-capture";
    videoFrame.style = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border: 0; z-index: 9999;";
    
    // Thêm iframe vào body
    document.body.appendChild(videoFrame);
    
    // Thêm nút thoát
        // Thêm nút thoát
  // ... existing code ...
  const exitBtn = document.createElement('button');
  exitBtn.innerHTML = '×';  // Sử dụng dấu × thay vì chữ X
  exitBtn.style = `
      position: fixed;
      top: 15px;
      right: 15px;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      border: none;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      border-radius: 50%;
      transition: all 0.2s ease;
      padding: 0;
  `;

  exitBtn.onmouseover = () => {
      exitBtn.style.background = 'rgba(0, 0, 0, 0.5)';
      exitBtn.style.transform = 'scale(1.1)';
  };

  exitBtn.onmouseout = () => {
      exitBtn.style.background = 'rgba(0, 0, 0, 0.3)';
      exitBtn.style.transform = 'scale(1)';
  };
    exitBtn.onclick = () => {
        videoFrame.remove();
        exitBtn.remove();
    };
    document.body.appendChild(exitBtn);
});
}

// Gửi tin nhắn
function sendMessage(text, files = []) {
    const activeGroup = document.querySelector('.group-item.active');
    const chatId = activeGroup.getAttribute('data-chat-id');
    
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', 'outgoing');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    
    const messageTime = document.createElement('span');
    messageTime.classList.add('message-time');
    messageTime.textContent = getCurrentTime();
    
    messageHeader.appendChild(messageTime);
    
    const messageBody = document.createElement('div');
    messageBody.classList.add('message-body');
    
    if (text) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = text;
        messageBody.appendChild(messageParagraph);
    }
    
    if (files.length > 0) {
        const attachmentsDiv = document.createElement('div');
        attachmentsDiv.classList.add('message-attachments');
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const attachmentDiv = document.createElement('div');
                attachmentDiv.classList.add('message-attachment', 'image');
                
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = 'Attachment';
                
                attachmentDiv.appendChild(img);
                attachmentsDiv.appendChild(attachmentDiv);
            } else {
                const attachmentDiv = document.createElement('div');
                attachmentDiv.classList.add('message-attachment', 'file');
                
                const icon = document.createElement('i');
                if (file.name.endsWith('.pdf')) {
                    icon.className = 'fas fa-file-pdf';
                } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                    icon.className = 'fas fa-file-word';
                } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                    icon.className = 'fas fa-file-excel';
                } else {
                    icon.className = 'fas fa-file';
                }
                
                const fileInfo = document.createElement('div');
                fileInfo.classList.add('file-info');
                
                const fileName = document.createElement('span');
                fileName.classList.add('file-name');
                fileName.textContent = file.name;
                
                fileInfo.appendChild(fileName);
                attachmentDiv.appendChild(icon);
                attachmentDiv.appendChild(fileInfo);
                attachmentsDiv.appendChild(attachmentDiv);
            }
        });
        
        messageBody.appendChild(attachmentsDiv);
    }
    
    const messageActions = document.createElement('div');
    messageActions.classList.add('message-actions');
    
    const reactionBtns = [
        { icon: 'far fa-thumbs-up', text: '' },
        { icon: 'far fa-heart', text: '' },
        { icon: 'far fa-share-square', text: '' }
    ];
    
    reactionBtns.forEach(btn => {
        const button = document.createElement('button');
        button.classList.add('reaction-btn');
        
        const icon = document.createElement('i');
        icon.className = btn.icon;
        
        button.appendChild(icon);
        if (btn.text) {
            button.appendChild(document.createTextNode(' ' + btn.text));
        }
        
        messageActions.appendChild(button);
    });
    
    messageContent.appendChild(messageHeader);
    messageContent.appendChild(messageBody);
    messageContent.appendChild(messageActions);
    
    messageContainer.appendChild(messageContent);
    
    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Lưu tin nhắn vào chatRooms
    chatRooms[chatId].messages = chatMessages.innerHTML;
}

// Thiết lập emoji panel
function setupEmojiPanel() {
    emojiBtn.addEventListener('click', () => {
        emojiPanel.style.display = 'block';
    });
    
    closeEmojiPanel.addEventListener('click', () => {
        emojiPanel.style.display = 'none';
    });
    
    // Tạo emoji grid
    const emojiGrid = document.querySelector('.emoji-grid');
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😚', '😂', '🤣', '😊', '😇', 
                    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
                    '👍', '👎', '❤️', '🔥', '🎉', '🤔', '👏', '🙏', '👋', '🤝'];
    
    emojis.forEach(emoji => {
        const emojiBtn = document.createElement('button');
        emojiBtn.classList.add('emoji');
        emojiBtn.textContent = emoji;
        
        emojiBtn.addEventListener('click', () => {
            messageInput.value += emoji;
            emojiPanel.style.display = 'none';
        });
        
        emojiGrid.appendChild(emojiBtn);
    });
}

// Thiết lập tải file
function setupFileUpload() {
    attachmentBtn.addEventListener('click', () => {
        // Giả lập mở file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx';
        
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                selectedFiles = Array.from(e.target.files);
                showFilePreview();
            }
        });
        
        input.click();
    });
    
    closePreview.addEventListener('click', () => {
        fileUploadPreview.style.display = 'none';
        selectedFiles = [];
    });
    
    cancelUpload.addEventListener('click', () => {
        fileUploadPreview.style.display = 'none';
        selectedFiles = [];
    });
    
    sendFiles.addEventListener('click', () => {
        if (selectedFiles.length > 0) {
            sendMessage('', selectedFiles);
            fileUploadPreview.style.display = 'none';
            selectedFiles = [];
        }
    });
}

// Hiển thị xem trước file
function showFilePreview() {
    const previewContent = document.querySelector('.preview-content');
    previewContent.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.classList.add('preview-item');
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            previewItem.appendChild(img);
        } else {
            const icon = document.createElement('i');
            if (file.name.endsWith('.pdf')) {
                icon.className = 'fas fa-file-pdf';
            } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                icon.className = 'fas fa-file-word';
            } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                icon.className = 'fas fa-file-excel';
            } else {
                icon.className = 'fas fa-file';
            }
            
            const fileInfo = document.createElement('div');
            fileInfo.classList.add('file-info');
            
            const fileName = document.createElement('span');
            fileName.classList.add('file-name');
            fileName.textContent = file.name;
            
            const fileSize = document.createElement('span');
            fileSize.classList.add('file-size');
            fileSize.textContent = formatFileSize(file.size);
            
            fileInfo.appendChild(fileName);
            fileInfo.appendChild(fileSize);
            
            previewItem.appendChild(icon);
            previewItem.appendChild(fileInfo);
        }
        
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-file');
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        removeBtn.addEventListener('click', () => {
            selectedFiles.splice(index, 1);
            showFilePreview();
            
            if (selectedFiles.length === 0) {
                fileUploadPreview.style.display = 'none';
            }
        });
        
        previewItem.appendChild(removeBtn);
        previewContent.appendChild(previewItem);
    });
    
    fileUploadPreview.style.display = 'block';
}

// Format kích thước file
function formatFileSize(bytes) {
    if (bytes < 1024) {
        return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' KB';
    } else {
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
}

// Lấy thời gian hiện tại
function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
}// Add this function to your existing JavaScript file
function setupReactionButtons() {
    // Use event delegation to handle reaction button clicks
    document.querySelector('.chat-messages').addEventListener('click', function(e) {
        // Check if a reaction button was clicked
        if (e.target.closest('.reaction-btn')) {
            const button = e.target.closest('.reaction-btn');
            const icon = button.querySelector('i');
            
            // Toggle active state
            button.classList.toggle('active');
            
            // Get the current count or set to 0
            let count = 0;
            const text = button.textContent.trim();
            if (text) {
                const match = text.match(/\d+/);
                if (match) {
                    count = parseInt(match[0]);
                }
            }
            
            // Update count based on active state
            if (button.classList.contains('active')) {
                count++;
                
                // Add animation class
                button.classList.add('reaction-animation');
                setTimeout(() => {
                    button.classList.remove('reaction-animation');
                }, 500);
            } else {
                if (count > 0) count--;
            }
            
            // Update button text
            if (count > 0) {
                button.innerHTML = `<i class="${icon.className}"></i> ${count}`;
            } else {
                button.innerHTML = `<i class="${icon.className}"></i>`;
            }
            
            // Save the updated chat messages
            const currentChatId = document.querySelector('.group-item.active').getAttribute('data-chat-id');
            chatRooms[currentChatId].messages = document.querySelector('.chat-messages').innerHTML;
        }
    });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    
    // Setup reaction buttons
    setupReactionButtons();
    
    // Rest of your initialization code...
});// Add these functions to your existing JavaScript file

// Voice recording functionality
function setupVoiceRecording() {
    const voiceBtn = document.getElementById('voice-btn');
    const voicePanel = document.querySelector('.voice-recording-panel');
    const closePanel = document.querySelector('.close-recording-panel');
    const recordBtn = document.getElementById('record-btn');
    const cancelBtn = document.querySelector('.cancel-recording');
    const sendBtn = document.querySelector('.send-recording');
    const timerDisplay = document.querySelector('.recording-timer');
    const audioWaves = document.querySelector('.audio-waves');
    
    let mediaRecorder;
    let audioChunks = [];
    let recordingTimer;
    let recordingDuration = 0;
    let audioBlob;
    
    // Open voice recording panel
    voiceBtn.addEventListener('click', function() {
        voicePanel.style.display = 'block';
        resetRecording();
    });
    
    // Close voice recording panel
    closePanel.addEventListener('click', function() {
        voicePanel.style.display = 'none';
        stopRecording();
    });
    
    // Cancel recording
    cancelBtn.addEventListener('click', function() {
        voicePanel.style.display = 'none';
        stopRecording();
    });
    
    // Record button click
    recordBtn.addEventListener('click', function() {
        if (recordBtn.classList.contains('recording')) {
            // Stop recording
            stopRecording();
            recordBtn.innerHTML = '<i class="fas fa-redo"></i>';
            recordBtn.classList.remove('recording');
            recordBtn.classList.add('paused');
            sendBtn.disabled = false;
        } else if (recordBtn.classList.contains('paused')) {
            // Restart recording
            resetRecording();
        } else {
            // Start recording
            startRecording();
        }
    });
    
    // Send recording
    sendBtn.addEventListener('click', function() {
        if (audioBlob) {
            sendAudioMessage(audioBlob);
            voicePanel.style.display = 'none';
            resetRecording();
        }
    });
    
    // Start recording
    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                
                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });
                
                mediaRecorder.addEventListener('stop', () => {
                    const audioTracks = stream.getAudioTracks();
                    audioTracks.forEach(track => track.stop());
                    
                    audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                });
                
                // Start recording
                mediaRecorder.start();
                recordBtn.classList.add('recording');
                audioWaves.classList.add('recording');
                
                // Start timer
                recordingDuration = 0;
                updateTimer();
                recordingTimer = setInterval(updateTimer, 1000);
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
                alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
            });
    }
    
    // Stop recording
    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            audioWaves.classList.remove('recording');
            clearInterval(recordingTimer);
        }
    }
    
    // Reset recording
    function resetRecording() {
        stopRecording();
        audioChunks = [];
        audioBlob = null;
        recordingDuration = 0;
        updateTimer();
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        recordBtn.classList.remove('recording', 'paused');
        sendBtn.disabled = true;
    }
    
    // Update timer display
    function updateTimer() {
        const minutes = Math.floor(recordingDuration / 60).toString().padStart(2, '0');
        const seconds = (recordingDuration % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
        recordingDuration++;
    }
    
    // Send audio message
    function sendAudioMessage(audioBlob) {
        const activeGroup = document.querySelector('.group-item.active');
        const chatId = activeGroup.getAttribute('data-chat-id');
        const chatMessages = document.querySelector('.chat-messages');
        
        // Create audio element
        const audioURL = URL.createObjectURL(audioBlob);
        
        // Create message container
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'outgoing');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        const messageHeader = document.createElement('div');
        messageHeader.classList.add('message-header');
        
        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = getCurrentTime();
        
        messageHeader.appendChild(messageTime);
        
        const messageBody = document.createElement('div');
        messageBody.classList.add('message-body');
        
        // Create audio player
        const audioMessage = document.createElement('div');
        audioMessage.classList.add('message-audio');
        
        const audioControls = document.createElement('div');
        audioControls.classList.add('audio-controls');
        
        const playButton = document.createElement('button');
        playButton.classList.add('audio-play-btn');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        
        const audioTimeline = document.createElement('div');
        audioTimeline.classList.add('audio-timeline');
        
        const audioProgress = document.createElement('div');
        audioProgress.classList.add('audio-progress');
        
        const audioDuration = document.createElement('div');
        audioDuration.classList.add('audio-duration');
        audioDuration.textContent = timerDisplay.textContent;
        
        // Hidden audio element for functionality
        const audio = document.createElement('audio');
        audio.src = audioURL;
        audio.style.display = 'none';
        
        // Setup audio player functionality
        playButton.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            audioProgress.style.width = `${progress}%`;
            
            const currentTime = formatTime(audio.currentTime);
            audioDuration.textContent = currentTime;
        });
        
        audio.addEventListener('ended', function() {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            audioProgress.style.width = '0%';
            audioDuration.textContent = formatTime(audio.duration);
        });
        
        // Assemble audio player
        audioTimeline.appendChild(audioProgress);
        audioControls.appendChild(playButton);
        audioControls.appendChild(audioTimeline);
        audioControls.appendChild(audioDuration);
        audioControls.appendChild(audio);
        
        audioMessage.appendChild(audioControls);
        messageBody.appendChild(audioMessage);
        
        // Add message actions
        const messageActions = document.createElement('div');
        messageActions.classList.add('message-actions');
        
        const reactionBtns = [
            { icon: 'far fa-thumbs-up', text: '' },
            { icon: 'far fa-heart', text: '' },
            { icon: 'far fa-share-square', text: '' }
        ];
        
        reactionBtns.forEach(btn => {
            const button = document.createElement('button');
            button.classList.add('reaction-btn');
            
            const icon = document.createElement('i');
            icon.className = btn.icon;
            
            button.appendChild(icon);
            if (btn.text) {
                button.appendChild(document.createTextNode(' ' + btn.text));
            }
            
            messageActions.appendChild(button);
        });
        
        // Assemble message
        messageContent.appendChild(messageHeader);
        messageContent.appendChild(messageBody);
        messageContent.appendChild(messageActions);
        
        messageContainer.appendChild(messageContent);
        
        // Add to chat
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save to chat history
        chatRooms[chatId].messages = chatMessages.innerHTML;
    }
    
    // Format time for audio player
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    }
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    
    // Setup voice recording
    setupVoiceRecording();
    
    // Rest of your initialization code...
});// Enhance the voice recording functionality
function setupVoiceRecording() {
    const voiceBtn = document.getElementById('voice-btn');
    const voicePanel = document.querySelector('.voice-recording-panel');
    const closePanel = document.querySelector('.close-recording-panel');
    const recordBtn = document.getElementById('record-btn');
    const cancelBtn = document.querySelector('.cancel-recording');
    const sendBtn = document.querySelector('.send-recording');
    const timerDisplay = document.querySelector('.recording-timer');
    const audioWaves = document.querySelector('.audio-waves');
    const waves = document.querySelectorAll('.wave');
    
    let mediaRecorder;
    let audioChunks = [];
    let recordingTimer;
    let recordingDuration = 0;
    let audioBlob;
    let visualizationInterval;
    
    // Open voice recording panel with animation
    voiceBtn.addEventListener('click', function() {
        voicePanel.style.display = 'block';
        // Force reflow to enable animation
        void voicePanel.offsetWidth;
        voicePanel.style.opacity = '1';
        resetRecording();
    });
    
    // Close voice recording panel with animation
    function closeVoicePanel() {
        voicePanel.style.opacity = '0';
        setTimeout(() => {
            voicePanel.style.display = 'none';
        }, 300);
        stopRecording();
    }
    
    closePanel.addEventListener('click', closeVoicePanel);
    cancelBtn.addEventListener('click', closeVoicePanel);
    
    // Record button click with enhanced visual feedback
    recordBtn.addEventListener('click', function() {
        if (recordBtn.classList.contains('recording')) {
            // Stop recording
            stopRecording();
            recordBtn.innerHTML = '<i class="fas fa-redo"></i>';
            recordBtn.classList.remove('recording');
            recordBtn.classList.add('paused');
            sendBtn.disabled = false;
            
            // Stop wave animation but keep last state
            audioWaves.classList.remove('recording');
            clearInterval(visualizationInterval);
            
            // Add a subtle background to indicate recording is paused
            document.querySelector('.recording-visualization').style.backgroundColor = 'rgba(255, 152, 0, 0.05)';
            
        } else if (recordBtn.classList.contains('paused')) {
            // Restart recording
            resetRecording();
        } else {
            // Start recording
            startRecording();
        }
    });
    
    // Send recording with animation
    sendBtn.addEventListener('click', function() {
        if (audioBlob) {
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                sendAudioMessage(audioBlob);
                closeVoicePanel();
                resetRecording();
            }, 500);
        }
    });
    
    // Start recording with enhanced visualization
    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                
                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });
                
                mediaRecorder.addEventListener('stop', () => {
                    const audioTracks = stream.getAudioTracks();
                    audioTracks.forEach(track => track.stop());
                    
                    audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                });
                
                // Start recording
                mediaRecorder.start();
                recordBtn.classList.add('recording');
                audioWaves.classList.add('recording');
                
                // Reset visualization background
                document.querySelector('.recording-visualization').style.backgroundColor = 'rgba(76, 175, 80, 0.05)';
                
                // Add random wave heights for more realistic visualization
                visualizationInterval = setInterval(() => {
                    if (!recordBtn.classList.contains('recording')) return;
                    
                    waves.forEach(wave => {
                        if (!audioWaves.classList.contains('recording')) {
                            const randomHeight = Math.floor(Math.random() * 45) + 5;
                            wave.style.height = `${randomHeight}px`;
                        }
                    });
                }, 100);
                
                // Start timer with pulsing effect
                recordingDuration = 0;
                updateTimer();
                recordingTimer = setInterval(updateTimer, 1000);
                
                // Add recording indicator
                timerDisplay.classList.add('recording-active');
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
                alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
                
                // Visual feedback for error
                recordBtn.classList.add('error');
                setTimeout(() => {
                    recordBtn.classList.remove('error');
                }, 1000);
            });
    }
    
    // Stop recording with visual feedback
    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            clearInterval(recordingTimer);
            timerDisplay.classList.remove('recording-active');
        }
    }
    
    // Reset recording state with visual feedback
    function resetRecording() {
        stopRecording();
        audioChunks = [];
        audioBlob = null;
        recordingDuration = 0;
        updateTimer();
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        recordBtn.classList.remove('recording', 'paused', 'error');
        sendBtn.disabled = true;
        audioWaves.classList.remove('recording');
        clearInterval(visualizationInterval);
        
        // Reset waves to initial state
        waves.forEach(wave => {
            wave.style.height = '5px';
        });
        
        // Reset visualization background
        document.querySelector('.recording-visualization').style.backgroundColor = 'rgba(76, 175, 80, 0.05)';
    }
    
    // Update timer display with visual effects
    function updateTimer() {
        const minutes = Math.floor(recordingDuration / 60).toString().padStart(2, '0');
        const seconds = (recordingDuration % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
        
        // Add pulsing effect to timer when recording
        if (recordBtn.classList.contains('recording')) {
            timerDisplay.classList.toggle('pulse');
        } else {
            timerDisplay.classList.remove('pulse');
        }
        
        recordingDuration++;
    }
    
    // Rest of the function remains the same...
}

// Add this CSS to your stylesheet
const style = document.createElement('style');
style.textContent = `
    .recording-active {
        animation: timer-pulse 1s infinite alternate;
    }
    
    @keyframes timer-pulse {
        0% { opacity: 1; }
        100% { opacity: 0.7; }
    }
    
    .btn-record.error {
        background-color: #d32f2f;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    .voice-recording-panel {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
// Add group search functionality
function setupGroupSearch() {
    const searchInput = document.querySelector('.search-box input');
    const groupItems = document.querySelectorAll('.group-list .group-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Loop through all group items
        groupItems.forEach(item => {
            const groupName = item.querySelector('.group-info h5').textContent.toLowerCase();
            
            // Check if group name contains search term
            if (groupName.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide "no results" message
        updateNoResultsMessage(searchTerm);
    });
    
    // Clear search when X button is clicked
    const searchBox = document.querySelector('.search-box');
    if (!searchBox.querySelector('.clear-search')) {
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-search';
        clearButton.innerHTML = '<i class="fas fa-times"></i>';
        clearButton.style.display = 'none';
        
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            this.style.display = 'none';
        });
        
        searchBox.appendChild(clearButton);
        
        // Show/hide clear button based on input
        searchInput.addEventListener('input', function() {
            clearButton.style.display = this.value ? 'block' : 'none';
        });
    }
    
    // Function to show/hide "no results" message
    function updateNoResultsMessage(searchTerm) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Check if we need to show the message
        if (searchTerm !== '') {
            let visibleGroups = 0;
            
            groupItems.forEach(item => {
                if (item.style.display !== 'none') {
                    visibleGroups++;
                }
            });
            
            if (visibleGroups === 0) {
                // Create and add the message
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>Không tìm thấy nhóm nào với từ khóa "${searchTerm}"</p>
                `;
                
                // Insert after the first sidebar section
                const firstSection = document.querySelector('.sidebar-section');
                firstSection.parentNode.insertBefore(noResultsMessage, firstSection.nextSibling);
            }
        }
    }
}

// Initialize all functionality when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Setup existing functionality
    
    // Setup group search
    setupGroupSearch();
    
    // Other initialization code...
});// Chat search functionality
function setupChatSearch() {
    const searchBtn = document.querySelector('.chat-actions .icon-btn:first-child');
    const searchPanel = document.querySelector('.chat-search-panel');
    const closeSearchBtn = document.querySelector('.close-search-panel');
    const searchInput = document.querySelector('.search-input-container input');
    const prevResultBtn = document.querySelector('.prev-result');
    const nextResultBtn = document.querySelector('.next-result');
    const searchResultsCount = document.querySelector('.search-results');
    
    let currentResultIndex = -1;
    let searchResults = [];
    
    // Open search panel
    searchBtn.addEventListener('click', () => {
        searchPanel.classList.add('active');
        searchInput.focus();
    });
    
    // Close search panel
    closeSearchBtn.addEventListener('click', () => {
        searchPanel.classList.remove('active');
        clearSearch();
    });
    
    // Search as user types
    searchInput.addEventListener('input', () => {
        performSearch(searchInput.value);
    });
    
    // Navigate to previous result
    prevResultBtn.addEventListener('click', () => {
        if (currentResultIndex > 0) {
            currentResultIndex--;
            highlightCurrentResult();
        }
    });
    
    // Navigate to next result
    nextResultBtn.addEventListener('click', () => {
        if (currentResultIndex < searchResults.length - 1) {
            currentResultIndex++;
            highlightCurrentResult();
        }
    });
    
    // Perform search
    function performSearch(query) {
        // Clear previous results
        clearHighlights();
        searchResults = [];
        currentResultIndex = -1;
        
        if (!query.trim()) {
            updateResultsCount(0);
            prevResultBtn.disabled = true;
            nextResultBtn.disabled = true;
            return;
        }
        
        // Get all message text content
        const messages = document.querySelectorAll('.message-body p');
        const regex = new RegExp(escapeRegExp(query), 'gi');
        
        // Search in each message
        messages.forEach(message => {
            const originalText = message.textContent;
            let match;
            let lastIndex = 0;
            let hasMatches = false;
            let highlightedText = '';
            
            // Find all matches in this message
            while ((match = regex.exec(originalText)) !== null) {
                hasMatches = true;
                
                // Add text before match
                highlightedText += originalText.substring(lastIndex, match.index);
                
                // Add highlighted match
                highlightedText += `<span class="highlight">${match[0]}</span>`;
                
                lastIndex = regex.lastIndex;
                
                // Store result for navigation
                searchResults.push({
                    element: message,
                    matchIndex: match.index
                });
            }
            
            // Add remaining text
            if (hasMatches) {
                highlightedText += originalText.substring(lastIndex);
                message.innerHTML = highlightedText;
            }
        });
        
        // Update UI
        updateResultsCount(searchResults.length);
        
        if (searchResults.length > 0) {
            currentResultIndex = 0;
            highlightCurrentResult();
            prevResultBtn.disabled = true;
            nextResultBtn.disabled = searchResults.length <= 1;
        } else {
            prevResultBtn.disabled = true;
            nextResultBtn.disabled = true;
        }
    }
    
    // Highlight current result
    function highlightCurrentResult() {
        // Remove active class from all highlights
        document.querySelectorAll('.highlight.active').forEach(el => {
            el.classList.remove('active');
        });
        
        if (currentResultIndex >= 0 && currentResultIndex < searchResults.length) {
            const result = searchResults[currentResultIndex];
            const highlights = result.element.querySelectorAll('.highlight');
            
            // Find the correct highlight element
            let currentHighlight = null;
            let currentMatchIndex = 0;
            
            for (const highlight of highlights) {
                if (currentMatchIndex === result.matchIndex) {
                    currentHighlight = highlight;
                    break;
                }
                currentMatchIndex += highlight.textContent.length;
            }
            
            if (currentHighlight) {
                currentHighlight.classList.add('active');
                currentHighlight.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            
            // Update navigation buttons
            prevResultBtn.disabled = currentResultIndex === 0;
            nextResultBtn.disabled = currentResultIndex === searchResults.length - 1;
            
            // Update results count
            updateResultsCount(searchResults.length, currentResultIndex + 1);
        }
    }
    
    // Clear highlights
    function clearHighlights() {
        document.querySelectorAll('.message-body p').forEach(message => {
            const originalText = message.textContent;
            message.innerHTML = originalText;
        });
    }
    
    // Clear search
    function clearSearch() {
        searchInput.value = '';
        clearHighlights();
        updateResultsCount(0);
        prevResultBtn.disabled = true;
        nextResultBtn.disabled = true;
    }
    
    // Update results count display
    function updateResultsCount(total, current = 0) {
        if (total === 0) {
            searchResultsCount.textContent = '0 kết quả';
        } else {
            searchResultsCount.textContent = `${current}/${total} kết quả`;
        }
    }
    
    // Escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Add this to your document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code
    
    // Setup chat search
    setupChatSearch();
    
    // Other initialization code
});// Image Viewer Functions
function openImageViewer(imgElement) {
    const viewer = document.getElementById('imageViewer');
    const expandedImg = document.getElementById('expandedImg');
    viewer.style.display = 'block';
    expandedImg.src = imgElement.src;
}

function closeImageViewer() {
    document.getElementById('imageViewer').style.display = 'none';
}

// Add click events to all chat images
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to all message images
    const chatImages = document.querySelectorAll('.message-attachment.image img');
    chatImages.forEach(img => {
        img.onclick = function() {
            openImageViewer(this);
        };
    });

    // Close viewer when clicking outside the image
    const imageViewer = document.getElementById('imageViewer');
    imageViewer.onclick = function(e) {
        if (e.target === this || e.target.className === 'close-viewer') {
            closeImageViewer();
        }
    };

    // Close viewer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageViewer();
        }
    });
});


// Thiết lập image viewer
function setupImageViewer() {
    const imageViewer = document.getElementById('imageViewer');
    const expandedImg = document.getElementById('expandedImg');
    const closeViewer = document.querySelector('.close-viewer');

    // Xử lý click vào ảnh
    document.addEventListener('click', function(e) {
        if (e.target.matches('.message-attachment.image img')) {
            imageViewer.style.display = 'block';
            expandedImg.src = e.target.src;
        }
    });

    // Xử lý đóng viewer
    closeViewer.addEventListener('click', function() {
        imageViewer.style.display = 'none';
    });

    // Đóng viewer khi click ngoài ảnh
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) {
            imageViewer.style.display = 'none';
        }
    });
}

// Thêm vào phần khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    
    
    // Thiết lập image viewer
    setupImageViewer();
});