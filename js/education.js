// Education page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initArticleCards();
    initVideoCards();
    initForumCards();
    initScrollAnimations();
});

// Article Cards Functionality
function initArticleCards() {
    const articleCards = document.querySelectorAll('.article-card');
    const readMoreButtons = document.querySelectorAll('.btn-read-more');

    articleCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Prevent double-click on button
            if (e.target.classList.contains('btn-read-more')) {
                return;
            }
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Navigate to article detail (you can customize this)
            const articleTitle = this.querySelector('.article-title').textContent;
            console.log(`Opening article: ${articleTitle}`);
            // window.location.href = `article-detail.html?id=${index}`;
        });
    });

    readMoreButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add button click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Navigate to article detail
            console.log(`Reading more about article ${index}`);
            // window.location.href = `article-detail.html?id=${index}`;
        });
    });
}

// Video Cards Functionality
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach((card, index) => {
        const playButton = card.querySelector('.play-button');
        const videoTitle = card.querySelector('.video-title').textContent;

        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Play video functionality (you can customize this)
            console.log(`Playing video: ${videoTitle}`);
            playVideo(index, videoTitle);
        });

        // Hover effect for play button
        card.addEventListener('mouseenter', function() {
            playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Video Player Function
function playVideo(index, title) {
    // Create modal for video player
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>${title}</h3>
                <button class="video-modal-close">&times;</button>
            </div>
            <div class="video-player">
                <p>Video player would be embedded here</p>
                <p>Video ID: ${index}</p>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = modal.querySelector('.video-modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 15px;
        max-width: 80%;
        max-height: 80%;
        position: relative;
    `;

    const closeButton = modal.querySelector('.video-modal-close');
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: #666;
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.video-modal')) {
            modal.remove();
        }
    });
}

// Forum Cards Functionality
function initForumCards() {
    const forumCards = document.querySelectorAll('.forum-card');

    forumCards.forEach((card) => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98) translateY(-8px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            const forumType = this.classList.contains('forum-discussion') ? 'discussion' : 'expert';
            
            if (forumType === 'discussion') {
                console.log('Opening forum discussion');
                // window.location.href = 'forum-discussion.html';
            } else {
                console.log('Opening expert consultation');
                // window.location.href = 'expert-consultation.html';
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.article-card, .video-card, .forum-card, .section-title');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Smooth scroll for any anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search functionality (if needed)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const cards = document.querySelectorAll('.article-card, .video-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                
                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0; 
            transform: translateY(30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    .animate-slide-up {
        animation: slideUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);