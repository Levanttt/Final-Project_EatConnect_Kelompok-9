 function goBack() {
            window.history.back();
        }

        // Slider functionality
        class Slider {
            constructor(sliderId, prevBtnId, nextBtnId) {
                this.slider = document.getElementById(sliderId);
                this.prevBtn = document.getElementById(prevBtnId);
                this.nextBtn = document.getElementById(nextBtnId);
                this.currentPosition = 0;
                this.cardWidth = 0;
                this.visibleCards = 0;
                this.totalCards = 0;
                
                this.init();
            }

            init() {
                this.calculateDimensions();
                this.updateButtons();
                this.addEventListeners();
                
                // Recalculate on window resize
                window.addEventListener('resize', () => {
                    this.calculateDimensions();
                    this.updateSlider();
                });
            }

            calculateDimensions() {
                const cards = this.slider.children;
                if (cards.length === 0) return;
                
                this.totalCards = cards.length;
                const firstCard = cards[0];
                const containerWidth = this.slider.parentElement.offsetWidth;
                
                // Get card width including margin
                const cardStyle = window.getComputedStyle(firstCard);
                this.cardWidth = firstCard.offsetWidth + parseInt(cardStyle.marginRight) || 30;
                
                // Calculate how many cards are visible
                this.visibleCards = Math.floor(containerWidth / this.cardWidth);
                this.maxPosition = Math.max(0, this.totalCards - this.visibleCards);
            }

            addEventListeners() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());
            }

            prev() {
                if (this.currentPosition > 0) {
                    this.currentPosition--;
                    this.updateSlider();
                }
            }

            next() {
                if (this.currentPosition < this.maxPosition) {
                    this.currentPosition++;
                    this.updateSlider();
                }
            }

            updateSlider() {
                const translateX = -this.currentPosition * this.cardWidth;
                this.slider.style.transform = `translateX(${translateX}px)`;
                this.updateButtons();
            }

            updateButtons() {
                this.prevBtn.disabled = this.currentPosition === 0;
                this.nextBtn.disabled = this.currentPosition >= this.maxPosition;
            }
        }

        // Initialize sliders when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            const articlesSlider = new Slider('articles-slider', 'articles-prev', 'articles-next');
            const videosSlider = new Slider('videos-slider', 'videos-prev', 'videos-next');
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let currentSlider = null;

        document.addEventListener('touchstart', function(e) {
            const slider = e.target.closest('.slider-wrapper');
            if (slider) {
                startX = e.touches[0].clientX;
                currentSlider = slider;
            }
        });

        document.addEventListener('touchend', function(e) {
            if (!currentSlider) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Determine which slider and trigger appropriate action
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (currentSlider.id === 'articles-slider') {
                    if (diffX > 0) {
                        document.getElementById('articles-next').click();
                    } else {
                        document.getElementById('articles-prev').click();
                    }
                } else if (currentSlider.id === 'videos-slider') {
                    if (diffX > 0) {
                        document.getElementById('videos-next').click();
                    } else {
                        document.getElementById('videos-prev').click();
                    }
                }
            }
            
            currentSlider = null;
        });