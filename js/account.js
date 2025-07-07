function goBack() {
  window.location.href = "mainlandingpage.html";
}

function initializeEventListeners() {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const row = this.closest("tr");
      const parentTable = this.closest("table");
      const week = parentTable?.getAttribute("data-week");
      const isMakan = parentTable?.closest("#diary-makan") !== null;
      const isFisik = parentTable?.closest("#diary-fisik") !== null;

      if (this.checked) {
        row.style.backgroundColor = "#e8f5e8";
        row.style.transform = "scale(1.02)";
        setTimeout(() => {
          row.style.transform = "scale(1)";
        }, 200);
      } else {
        row.style.backgroundColor = "";
      }

      saveCheckboxProgress();

      if (week === "1") {
        updateWeeklyProgress(isMakan ? "makan" : "fisik");
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
        localStorage.removeItem("user");
        sessionStorage.clear();

        window.location.href = "landingpage.html";
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

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const type = this.textContent.includes("Fisik") ? "fisik" : "makan";
      showDiary(type);
    });
  });
}

function updateProgressVisibility(type) {
  const cards = document.querySelectorAll(".progress-card");
  cards.forEach((card) => {
    const cardType = card.getAttribute("data-type");
    card.style.display = cardType === type ? "block" : "none";
  });

  const progressSection = document.querySelector(".progress-section h3");
  if (progressSection) {
    progressSection.textContent =
      type === "makan"
        ? "Progress Mingguan Pola Makan"
        : "Progress Mingguan Aktivitas Fisik";
  }
}

function saveCheckboxProgress() {
  const progress = {
    makan: {},
    fisik: {},
  };

  document
    .querySelectorAll(
      '#diary-makan .diary-table[data-week="1"] input[type="checkbox"]'
    )
    .forEach((checkbox) => {
      const dayCell = checkbox.closest("tr").querySelector(".day-cell");
      if (dayCell) {
        const day = dayCell.textContent.trim();
        progress.makan[day] = checkbox.checked;
      }
    });

  document
    .querySelectorAll(
      '#diary-fisik .diary-table[data-week="1"] input[type="checkbox"]'
    )
    .forEach((checkbox) => {
      const dayCell = checkbox.closest("tr").querySelector(".day-cell");
      if (dayCell) {
        const day = dayCell.textContent.trim();
        progress.fisik[day] = checkbox.checked;
      }
    });

  localStorage.setItem("weeklyProgress", JSON.stringify(progress));
}

function loadCheckboxProgress() {
  const savedProgress = localStorage.getItem("weeklyProgress");
  if (!savedProgress) return;

  const progress = JSON.parse(savedProgress);

  // Makan minggu 1
  document
    .querySelectorAll(
      '#diary-makan .diary-table[data-week="1"] input[type="checkbox"]'
    )
    .forEach((checkbox) => {
      const dayCell = checkbox.closest("tr").querySelector(".day-cell");
      if (dayCell) {
        const day = dayCell.textContent.trim();
        if (progress.makan && progress.makan[day]) {
          checkbox.checked = true;
          checkbox.closest("tr").style.backgroundColor = "#e8f5e8";
        }
      }
    });

  // Fisik minggu 1
  document
    .querySelectorAll(
      '#diary-fisik .diary-table[data-week="1"] input[type="checkbox"]'
    )
    .forEach((checkbox) => {
      const dayCell = checkbox.closest("tr").querySelector(".day-cell");
      if (dayCell) {
        const day = dayCell.textContent.trim();
        if (progress.fisik && progress.fisik[day]) {
          checkbox.checked = true;
          checkbox.closest("tr").style.backgroundColor = "#e8f5e8";
        }
      }
    });
}

function updateWeeklyProgress(type) {
  const card = document.querySelector(
    `.progress-card[data-week="1"][data-type="${type}"]`
  );

  if (!card) return;

  const checkboxes = document.querySelectorAll(
    `#diary-${type} .diary-table[data-week="1"] input[type="checkbox"]`
  );

  const checkedCount = Array.from(checkboxes).filter((cb) => cb.checked).length;
  const totalCount = checkboxes.length;
  const percentage =
    totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);

  const valueElement = card.querySelector(".value");
  const percentageElement = card.querySelector(".percentage");
  const statusElement = card.querySelector(".status");

  if (valueElement) {
    valueElement.textContent = `${checkedCount}/${totalCount} Hari`;
  }

  if (percentageElement) {
    percentageElement.textContent = `(${percentage}%)`;
  }

  let status = "-";
  if (percentage >= 85) {
    status = "Sangat Baik";
  } else if (percentage >= 70) {
    status = "Baik";
  } else if (percentage >= 50) {
    status = "Cukup";
  } else if (percentage > 0) {
    status = "Kurang";
  }

  if (statusElement) {
    statusElement.textContent = status;
    statusElement.classList.remove(
      "badge-green",
      "badge-orange",
      "badge-red",
      "badge-blue"
    );

    if (status === "Sangat Baik") {
      statusElement.classList.add("badge-green");
    } else if (status === "Baik") {
      statusElement.classList.add("badge-orange");
    } else if (status === "Cukup") {
      statusElement.classList.add("badge-blue");
    } else if (status === "Kurang") {
      statusElement.classList.add("badge-red");
    }
  }

  if (checkedCount > 0) {
    card.classList.remove("inactive");
  }
}

function updateAllWeeklyProgress() {
  updateWeeklyProgress("makan");
  updateWeeklyProgress("fisik");
}

function showDiary(type) {
  const makan = document.getElementById("diary-makan");
  const fisik = document.getElementById("diary-fisik");
  const progressMakan = document.querySelector(".progress-makan");
  const progressFisik = document.querySelector(".progress-fisik");
  const buttons = document.querySelectorAll(".tab-btn");

  if (type === "makan") {
    makan.style.display = "block";
    fisik.style.display = "none";
    progressMakan.classList.add("active");
    progressFisik.classList.remove("active");
  } else {
    makan.style.display = "none";
    fisik.style.display = "block";
    progressMakan.classList.remove("active");
    progressFisik.classList.add("active");
  }

  buttons.forEach((btn) => btn.classList.remove("active"));
  if (type === "makan") {
    buttons[0].classList.add("active");
  } else {
    buttons[1].classList.add("active");
  }

  updateProgressVisibility(type);
}

document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  loadCheckboxProgress();
  updateAllWeeklyProgress();
  showDiary("makan");
});
