const form = document.getElementById("donatur-form");
const fileInput = document.getElementById("bukti-donasi");
const fileUploadText = document.querySelector(".file-upload-text");
const fileUploadBtn = document.querySelector(".file-upload-btn");

document.addEventListener("DOMContentLoaded", () => {
  setupFileUpload();
  setupFormValidation();
});

function goBack() {
  window.location.href = "mainlandingpage.html";
}

function setupFileUpload() {
  const fileUploadDisplay = document.querySelector(".file-upload-display");

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      fileUploadText.textContent = file.name;
      fileUploadText.style.color = "#4a6fa5";
      fileUploadBtn.textContent = "File Selected";
      fileUploadBtn.style.background = "#e6f3ff";
    } else {
      resetFileUpload();
    }
  });

  fileUploadDisplay.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadDisplay.style.borderColor = "#4a6fa5";
    fileUploadDisplay.style.background = "#f8fafc";
  });

  fileUploadDisplay.addEventListener("dragleave", (e) => {
    e.preventDefault();
    fileUploadDisplay.style.borderColor = "#d1d9e0";
    fileUploadDisplay.style.background = "white";
  });

  fileUploadDisplay.addEventListener("drop", (e) => {
    e.preventDefault();
    fileUploadDisplay.style.borderColor = "#d1d9e0";
    fileUploadDisplay.style.background = "white";

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      fileInput.dispatchEvent(new Event("change"));
    }
  });
}

function resetFileUpload() {
  fileUploadText.textContent = "No File Selected";
  fileUploadText.style.color = "#666";
  fileUploadBtn.textContent = "Choose File";
  fileUploadBtn.style.background = "#f1f5f9";
}

function setupFormValidation() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveFormDataToLocalStorage();
      window.location.href = "verifikasidonatur.html";
    } else {
      showError("Mohon lengkapi semua field yang wajib diisi");
    }
  });
}

function validateForm() {
  const requiredFields = form.querySelectorAll("input[required], select[required], textarea[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    const value = field.value.trim();
    if (!value || (field.type === "file" && field.files.length === 0)) {
      isValid = false;
    }
    if (field.type === "number" && (isNaN(value) || parseInt(value) <= 0)) {
      isValid = false;
    }
  });

  const termsCheckbox = document.getElementById("terms");
  if (!termsCheckbox.checked) {
    isValid = false;
  }

  return isValid;
}

function saveFormDataToLocalStorage() {
  localStorage.setItem("nama-restoran", document.getElementById("nama-restoran").value);
  localStorage.setItem("jenis-usaha", document.getElementById("jenis-usaha").value);
  localStorage.setItem("alamat", document.getElementById("alamat").value);
  localStorage.setItem("jumlah-porsi", document.getElementById("jumlah-porsi").value);
  localStorage.setItem("jadwal", document.getElementById("jadwal").value);
  localStorage.setItem("jenis-makanan", document.getElementById("jenis-makanan").value);
}

function showSuccess(message) {
  showNotification(message, "success");
}

function showError(message) {
  showNotification(message, "error");
}

function showNotification(message, type) {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.textContent = message;

  Object.assign(notif.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: 9999,
    maxWidth: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    background: type === "success" ? "#27ae60" : "#e74c3c",
  });

  document.body.appendChild(notif);
  setTimeout(() => (notif.style.transform = "translateX(0)"), 100);
  setTimeout(() => {
    notif.style.transform = "translateX(100%)";
    setTimeout(() => notif.remove(), 300);
  }, 5000);
}
