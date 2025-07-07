document.getElementById("verifikasi-form").addEventListener("submit", function (e) {
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

  const pesan = `📦 *Donasi Baru dari Donatur*\n\n` +
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
      alert("✅ Data berhasil dikirim ke WhatsApp!");
      window.location.href = "selesaidonatur.html";
    })
    .catch((err) => {
      alert("❌ Gagal mengirim ke WhatsApp.");
      console.error(err);
    });
});

function goBack() {
        window.history.back();
        } 
