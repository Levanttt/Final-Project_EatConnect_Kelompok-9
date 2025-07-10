function showModalNotification(title, message, type = "success") {
  // Hapus modal sebelumnya jika ada
  const old = document.querySelector(".custom-modal-overlay");
  if (old) old.remove();

  // Buat overlay
  const overlay = document.createElement("div");
  overlay.className = "custom-modal-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(3px)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.3s ease-out",
  });

  // Modal box
  const modal = document.createElement("div");
  Object.assign(modal.style, {
    background: "#fff",
    borderRadius: "16px",
    padding: "32px 24px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    position: "relative",
    animation: "zoomIn 0.35s ease-out",
    fontFamily: "Poppins, sans-serif",
  });

  // Tombol close ❌
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "12px",
    right: "16px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    color: "#999",
    cursor: "pointer",
  });
  closeBtn.onclick = () => overlay.remove();

  // Ikon status ✔ atau ✖
  const icon = document.createElement("div");
  icon.innerHTML =
    type === "success"
      ? '<div style="width: 70px; height: 70px; background: #2ecc71; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;"><span style="font-size: 34px; color: white;">✔</span></div>'
      : '<div style="width: 70px; height: 70px; background: #e74c3c; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;"><span style="font-size: 34px; color: white;">✖</span></div>';

  // Judul
  const heading = document.createElement("h2");
  heading.textContent = title;
  Object.assign(heading.style, {
    margin: "20px 0 8px",
    color: "#333",
    fontSize: "20px",
  });

  // Pesan
  const desc = document.createElement("p");
  desc.textContent = message;
  Object.assign(desc.style, {
    marginBottom: "24px",
    color: "#555",
    fontSize: "15px",
    lineHeight: "1.5",
  });

  // Tombol OK
  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";
  Object.assign(okBtn.style, {
    backgroundColor: "#ff6b35",
    color: "white",
    padding: "10px 26px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
    transition: "background 0.2s ease",
  });
  okBtn.onmouseenter = () => (okBtn.style.backgroundColor = "#e55b25");
  okBtn.onmouseleave = () => (okBtn.style.backgroundColor = "#ff6b35");
  okBtn.onclick = () => {
    overlay.remove();
    if (type === "success") {
      window.location.href = "selesaidonatur.html";
    }
  };

  // Gabungkan elemen
  modal.appendChild(closeBtn);
  modal.appendChild(icon);
  modal.appendChild(heading);
  modal.appendChild(desc);
  modal.appendChild(okBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// Kirim data
document
  .getElementById("verifikasi-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const namaRestoran = localStorage.getItem("nama-restoran") || "";
    const jenisUsaha = localStorage.getItem("jenis-usaha") || "";
    const alamat = localStorage.getItem("alamat") || "";
    const jumlahPorsi = localStorage.getItem("jumlah-porsi") || "";
    const jadwal = localStorage.getItem("jadwal") || "";
    const jenisMakanan = localStorage.getItem("jenis-makanan") || "";

    const namaLengkap = document.getElementById("nama-lengkap").value;
    const nik = document.getElementById("nik").value;
    const email = document.getElementById("email").value;
    const telepon = document.getElementById("telepon").value;

    const pesan =
      `📦 *Donasi Baru dari Donatur*\n\n` +
      `👤 *Nama Lengkap:* ${namaLengkap}\n` +
      `🆔 *NIK:* ${nik}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *Telepon:* ${telepon}\n\n` +
      `🏢 *Nama Usaha:* ${namaRestoran}\n` +
      `📌 *Alamat:* ${alamat}\n` +
      `🍱 *Jenis Usaha:* ${jenisUsaha}\n` +
      `🍽️ *Jumlah Porsi:* ${jumlahPorsi}\n` +
      `⏰ *Jadwal Ambil:* ${jadwal}\n` +
      `🥗 *Jenis Makanan:* ${jenisMakanan}`;

    fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: "VgEX5oovYd6rUdVMqfQR",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        target: "6285173252240",
        message: pesan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        showModalNotification(
          "Berhasil",
          "Data berhasil dikirim ke WhatsApp!",
          "success"
        );
      })
      .catch((err) => {
        showModalNotification(
          "Gagal",
          "Terjadi kesalahan saat mengirim data.",
          "error"
        );
        console.error(err);
      });
  });

function goBack() {
  window.history.back();
}
