document.getElementById("ketersediaan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = localStorage.getItem("relawan-nama") || "";
  const nik = localStorage.getItem("relawan-nik") || "";
  const email = localStorage.getItem("relawan-email") || "";
  const telepon = localStorage.getItem("relawan-telepon") || "";
  const alamat = localStorage.getItem("relawan-alamat") || "";

  const hari = document.getElementById("hari").value;
  const jam = document.getElementById("jam").value;
  const kendaraan = document.getElementById("kendaraan").value;

  const pesan = `🧍 *Pendaftaran Relawan Baru*\n\n` +
    `👤 *Nama:* ${nama}\n` +
    `🆔 *NIK:* ${nik}\n` +
    `📧 *Email:* ${email}\n` +
    `📱 *Telepon:* ${telepon}\n` +
    `🏠 *Alamat:* ${alamat}\n\n` +
    `🗓️ *Hari Tersedia:* ${hari}\n` +
    `⏰ *Jam Tersedia:* ${jam}\n` +
    `🚗 *Kendaraan:* ${kendaraan}`;

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
      alert("✅ Data relawan berhasil dikirim ke WhatsApp!");
      window.location.href = "relawanselesai.html";
    })
    .catch((err) => {
      alert("❌ Gagal mengirim data ke WhatsApp.");
      console.error(err);
    });
});

function goBack() {
  window.history.back();
}

