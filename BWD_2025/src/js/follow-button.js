document.addEventListener('DOMContentLoaded', function() {
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(button => {
        // Thiết lập text ban đầu
        button.textContent = button.getAttribute('data-original-text') || 'Theo dõi';
        
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            this.disabled = true;
            this.classList.add('loading');
            
            setTimeout(() => {
                if (this.classList.contains('following')) {
                    this.classList.remove('following');
                    this.textContent = this.getAttribute('data-original-text') || 'Theo dõi';
                } else {
                    this.classList.add('following');
                    this.textContent = 'Đang theo dõi';
                }
                
                this.disabled = false;
                this.classList.remove('loading');
            }, 500);
        });

        // Xử lý hover effect
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('following')) {
                this.textContent = this.getAttribute('data-hover-text') || 'Bỏ theo dõi';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('following')) {
                this.textContent = 'Đang theo dõi';
            } else {
                this.textContent = this.getAttribute('data-original-text') || 'Theo dõi';
            }
        });
    });
});