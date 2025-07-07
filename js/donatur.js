const form = document.getElementById("donatur-form");
const fileInput = document.getElementById("bukti-donasi");
const fileUploadText = document.querySelector(".file-upload-text");
const fileUploadBtn = document.querySelector(".file-upload-btn");

document.addEventListener("DOMContentLoaded", function () {
  setupFileUpload();
  setupFormValidation();
});

function handleNext(event) {
  event.preventDefault();

  localStorage.setItem("nama-restoran", document.getElementById("nama-restoran").value);
  localStorage.setItem("jenis-usaha", document.getElementById("jenis-usaha").value);
  localStorage.setItem("alamat", document.getElementById("alamat").value);
  localStorage.setItem("jumlah-porsi", document.getElementById("jumlah-porsi").value);
  localStorage.setItem("jadwal", document.getElementById("jadwal").value);
  localStorage.setItem("jenis-makanan", document.getElementById("jenis-makanan").value);

  window.location.href = "verifikasi.html";
}

function goBack() {
  window.location.href = "mainlandingpage.html";
}

function setupFileUpload() {
  const fileUploadDisplay = document.querySelector(".file-upload-display");

  fileInput.addEventListener("change", function (e) {
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

  fileUploadDisplay.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.style.borderColor = "#4a6fa5";
    this.style.background = "#f8fafc";
  });

  fileUploadDisplay.addEventListener("dragleave", function (e) {
    e.preventDefault();
    this.style.borderColor = "#d1d9e0";
    this.style.background = "white";
  });

  fileUploadDisplay.addEventListener("drop", function (e) {
    e.preventDefault();
    this.style.borderColor = "#d1d9e0";
    this.style.background = "white";

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
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitForm();
    } else {
      alert("Mohon lengkapi semua field yang wajib diisi");
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  if (field.hasAttribute("required") && !value) {
    isValid = false;
  }

  switch (field.type) {
    case "number":
      if (value && (isNaN(value) || parseInt(value) <= 0)) {
        isValid = false;
      }
      break;
    case "file":
      if (field.hasAttribute("required") && field.files.length === 0) {
        isValid = false;
      }
      break;
  }

  return isValid;
}

function validateForm() {
  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  const termsCheckbox = document.getElementById("terms");
  if (!termsCheckbox.checked) {
    isValid = false;
    showError("Anda harus menyetujui Syarat dan Ketentuan");
  }

  return isValid;
}

function submitForm() {
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Memproses...";
  submitBtn.style.background = "#ccc";

  setTimeout(() => {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    console.log("Form Data:", data);

    showSuccess(
      "Form berhasil dikirim! Anda akan diarahkan ke halaman verifikasi."
    );

    setTimeout(() => {
      console.log("Redirecting to verification page...");
    }, 2000);

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.style.background = "";
  }, 2000);
}

function showSuccess(message) {
  showNotification(message, "success");
}

function showError(message) {
  showNotification(message, "error");
}

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotif = document.querySelector(".notification");
  if (existingNotif) {
    existingNotif.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: "9999",
    maxWidth: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  if (type === "success") {
    notification.style.background = "#27ae60";
  } else {
    notification.style.background = "#e74c3c";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

function updateProgress(step) {
  const progressAfter = document.querySelector(".progress-steps::after");
  const steps = document.querySelectorAll(".step");

  steps.forEach((s) => s.classList.remove("active"));

  for (let i = 0; i <= step; i++) {
    if (steps[i]) {
      steps[i].classList.add("active");
    }
  }

  const progressWidth = ((step + 1) / steps.length) * 100;
  if (progressAfter) {
    progressAfter.style.width = `${Math.min(progressWidth, 100)}%`;
  }
}

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

const style = document.createElement("style");
style.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .error-message {
        display: block;
        margin-top: 4px;
        font-size: 12px;
        color: #e74c3c;
    }
`;
document.head.appendChild(style);

function handleNext(event) {
  event.preventDefault();
  const form = document.getElementById("donatur-form");
  if (form.checkValidity()) {
    window.location.href = "verifikasidonatur.html";
  } else {
    form.reportValidity();
  }
}

document
  .getElementById("bukti-donasi")
  .addEventListener("change", function (e) {
    const fileName = e.target.files[0]
      ? e.target.files[0].name
      : "No File Selected";
    document.querySelector(".file-upload-text").textContent = fileName;
  });
