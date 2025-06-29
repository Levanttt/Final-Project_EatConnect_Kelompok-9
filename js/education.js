function goBack() {
  window.location.href = "mainlandingpage.html";
}

document.querySelectorAll('.clickable-forum').forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener('click', function() {
    const url = card.getAttribute('data-url');
    if (url) window.location.href = url;
  });
});

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
    window.addEventListener("resize", () => {
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
    this.cardWidth =
      firstCard.offsetWidth + parseInt(cardStyle.marginRight) || 30;

    // Calculate how many cards are visible
    this.visibleCards = Math.floor(containerWidth / this.cardWidth);
    this.maxPosition = Math.max(0, this.totalCards - this.visibleCards);
  }

  addEventListeners() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
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
document.addEventListener("DOMContentLoaded", function () {
  const articlesSlider = new Slider(
    "articles-slider",
    "articles-prev",
    "articles-next"
  );
  const videosSlider = new Slider(
    "videos-slider",
    "videos-prev",
    "videos-next"
  );
});

// Touch/swipe support for mobile
let startX = 0;
let currentSlider = null;

document.addEventListener("touchstart", function (e) {
  const slider = e.target.closest(".slider-wrapper");
  if (slider) {
    startX = e.touches[0].clientX;
    currentSlider = slider;
  }
});

document.addEventListener("touchend", function (e) {
  if (!currentSlider) return;

  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  // Determine which slider and trigger appropriate action
  if (Math.abs(diffX) > 50) {
    // Minimum swipe distance
    if (currentSlider.id === "articles-slider") {
      if (diffX > 0) {
        document.getElementById("articles-next").click();
      } else {
        document.getElementById("articles-prev").click();
      }
    } else if (currentSlider.id === "videos-slider") {
      if (diffX > 0) {
        document.getElementById("videos-next").click();
      } else {
        document.getElementById("videos-prev").click();
      }
    }
  }

  currentSlider = null;
});

// Video popup logic
const videoData = [
  // Urut sesuai urutan .video-card di HTML
  {
    src: "https://youtube.com/embed/kz3oloHNgys",
    title: "Sarapan Diet Untuk Seminggu",
  },
  {
    src: "https://www.youtube.com/embed/p4W-bvGvyfk",
    title: "Pedoman Gizi Seimbang",
  },
  {
    src: "https://www.youtube.com/embed/jkS6glRPD_o",
    title: "Animasi 5 Gerakan Sehat",
  },
  {
    src: "https://www.youtube.com/embed/RMUdlfK5iJg",
    title: "12 Inspirasi Menu Sehat Untuk Seminggu",
  },
  {
    src: "https://www.youtube.com/embed/tg7KkrJStw8",
    title: "Cara Membuat Smoothie Bowl",
  },
  {
    src: "https://www.youtube.com/embed/xsIHqFoLqNw",
    title: "Meal Prep untuk Seminggu",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const videoCards = document.querySelectorAll(".video-card");
  const modal = document.getElementById("video-modal");
  const modalPlayer = document.getElementById("video-modal-player");
  const modalClose = document.getElementById("video-modal-close");

  videoCards.forEach((card, idx) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const data = videoData[idx];
      if (data) {
        let src = data.src;
        // Tambahkan autoplay=1 dengan benar
        src += src.includes("?") ? "&autoplay=1" : "?autoplay=1";
        modalPlayer.innerHTML = `<iframe width="100%" height="100%" src="${src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        modal.style.display = "flex";
      }
    });
  });

  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
    modalPlayer.innerHTML = "";
  });

  // Close modal on outside click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      modalPlayer.innerHTML = "";
    }
  });
});
