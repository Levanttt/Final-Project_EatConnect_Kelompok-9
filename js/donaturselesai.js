// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Get button element
    const backButton = document.getElementById('backToHome');
    
    // Add click event listener to back button
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Mengarahkan...';
            this.disabled = true;
            setTimeout(() => {
                window.location.href = 'mainlandingpage.html';
            }, 500);
        });
    }
    
    // Add entrance animation
    const elements = document.querySelectorAll('.success-icon, .title, .description, .btn-primary');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

