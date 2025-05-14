document.querySelector('.join-button').addEventListener('click', function() {
    const sections = ['about', 'status', 'mission'];
    let delay = 0;
    
    sections.forEach(section => {
        setTimeout(() => {
            document.getElementById(section).scrollIntoView({
                behavior: 'smooth'
            });
        }, delay);
        delay += 2000; // 2 giây cho mỗi section
    });
});