document.addEventListener('DOMContentLoaded', () => {
    /** 
     * Kích hoạt animation khi từng thành viên team xuất hiện trong viewport
     */
    const members = document.querySelectorAll('.team-container .team-member');

    const observerTeam = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Dừng quan sát để tránh gọi lại
            }
        });
    }, { threshold: 0.3 }); // Ít nhất 30% phần tử xuất hiện mới kích hoạt

    members.forEach(member => observerTeam.observe(member));

    /** 
     * Kích hoạt animation cho nội dung và biểu đồ trong health-section
     */
    const healthSection = document.querySelector('.health-section');
    const healthChart = document.getElementById('healthChart');

    if (healthSection) {
        const observerHealth = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const healthContent = entry.target.querySelector('.health-content');
                    if (healthContent) healthContent.classList.add('animate-in');
                    if (healthChart) healthChart.classList.add('animate-chart');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observerHealth.observe(healthSection);
    }

});
