document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('mainVideo');
    const nextButton = document.getElementById('nextButton');

    // Tự động phát video khi trang được tải
    video.play();

    // Xử lý sự kiện khi nhấn nút "Tiếp theo"
    nextButton.addEventListener('click', function() {
        window.location.href = 'index1.html';
    });

    // Tự động chuyển trang khi video kết thúc
    video.addEventListener('ended', function() {
        window.location.href = 'index1.html';
    });
});
