function goBack() {
  window.location.href = "mainlandingpage.html";
}

function initializeEventListeners() {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const row = this.closest("tr");
      if (this.checked) {
        row.style.backgroundColor = "#e8f5e8";
        row.style.transform = "scale(1.02)";
        setTimeout(() => {
          row.style.transform = "scale(1)";
        }, 200);
      } else {
        row.style.backgroundColor = "";
      }
    });
  });

  document.querySelectorAll(".progress-card, .status-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  const logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      if (confirm("Apakah Anda yakin ingin keluar dari akun?")) {
        alert("Anda telah keluar dari akun.");
      }
    });
  }

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", function () {
      const parentItem = this.closest(".info-item");
      const label = parentItem.querySelector(".info-label").textContent;
      if (label.includes("Telepon")) {
        const newPhone = prompt(
          "Masukkan nomor telepon baru:",
          "0851-2987-2230"
        );
        if (newPhone && newPhone.trim() !== "") {
          const valueElement = parentItem.querySelector(".info-value");
          valueElement.innerHTML = `${newPhone} <button class="edit-button">Edit</button>`;
          valueElement
            .querySelector(".edit-button")
            .addEventListener("click", arguments.callee);
        }
      } else if (label.includes("Kata Sandi")) {
        const currentPassword = prompt("Masukkan kata sandi saat ini:");
        if (currentPassword) {
          const newPassword = prompt("Masukkan kata sandi baru:");
          if (newPassword && newPassword.length >= 6) {
            alert("Kata sandi berhasil diubah!");
          } else if (newPassword) {
            alert("Kata sandi minimal 6 karakter!");
          }
        }
      }
    });
  });

  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("mobile-active");
    });
  }
}

function saveCheckboxProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const progress = {};
  checkboxes.forEach((checkbox) => {
    const day = checkbox.closest("tr").querySelector(".day-cell").textContent;
    progress[day] = checkbox.checked;
  });
  localStorage.setItem("weeklyProgress", JSON.stringify(progress));
}

function loadCheckboxProgress() {
  const savedProgress = localStorage.getItem("weeklyProgress");
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const day = checkbox.closest("tr").querySelector(".day-cell").textContent;
      if (progress[day]) {
        checkbox.checked = true;
        checkbox.closest("tr").style.backgroundColor = "#e8f5e8";
      }
    });
  }
}

function updateWeeklyProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedCount = Array.from(checkboxes).filter((cb) => cb.checked).length;
  const totalCount = checkboxes.length;
  const percentage = Math.round((checkedCount / totalCount) * 100);
  const firstProgressCard = document.querySelector(".progress-card");
  if (firstProgressCard) {
    const valueElement = firstProgressCard.querySelector(".value");
    const percentageElement = firstProgressCard.querySelector(".percentage");
    const statusElement = firstProgressCard.querySelector(".status");
    if (valueElement)
      valueElement.textContent = `${checkedCount}/${totalCount} Hari`;
    if (percentageElement) percentageElement.textContent = `(${percentage}%)`;
    let status = "";
    if (percentage >= 85) status = "Sangat Baik";
    else if (percentage >= 70) status = "Baik";
    else if (percentage >= 50) status = "Cukup";
    else if (percentage > 0) status = "Kurang";
    else status = "-";
    if (statusElement) statusElement.textContent = status;
    if (checkedCount > 0) {
      firstProgressCard.classList.remove("inactive");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  loadProgressData();
  loadCheckboxProgress();
  updateWeeklyProgress();
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      saveCheckboxProgress();
      updateWeeklyProgress();
    });
  });
});

function smoothScrollTo(targetElement) {
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    goBack,
    initializeEventListeners,
    loadProgressData,
    saveCheckboxProgress,
    loadCheckboxProgress,
    updateWeeklyProgress,
  };
}

function showDiary(type) {
  const makan = document.getElementById("diary-makan");
  const fisik = document.getElementById("diary-fisik");
  const buttons = document.querySelectorAll(".tab-btn");

  if (type === "makan") {
    makan.style.display = "block";
    fisik.style.display = "none";
  } else {
    makan.style.display = "none";
    fisik.style.display = "block";
  }

  buttons.forEach((btn) => btn.classList.remove("active"));
  if (type === "makan") {
    buttons[0].classList.add("active");
  } else {
    buttons[1].classList.add("active");
  }
}
