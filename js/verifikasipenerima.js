document.getElementById("verifikasi-form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  // Ambil data dari localStorage
  const nama = localStorage.getItem("penerima-nama") || "";
  const jenis = localStorage.getItem("penerima-jenis") || "";
  const penanggung = localStorage.getItem("penerima-penanggung") || "";
  const telepon = localStorage.getItem("penerima-telepon") || "";
  const alamat = localStorage.getItem("penerima-alamat") || "";
  const penghuni = localStorage.getItem("penerima-penghuni") || "";
  const select1 = localStorage.getItem("penerima-select-0") || "";
  const select2 = localStorage.getItem("penerima-select-1") || "";
  const select3 = localStorage.getItem("penerima-select-2") || "";
  const kulkas = localStorage.getItem("penerima-select-3") || "";
  const kebutuhanKhusus = localStorage.getItem("penerima-kebutuhan") || "-";

  const pesan = `🏠 *Pendaftaran Penerima Bantuan*\n\n` +
    `📌 *Nama Tempat:* ${nama}\n` +
    `🏷️ *Jenis Tempat:* ${jenis}\n` +
    `👤 *Penanggung Jawab:* ${penanggung}\n` +
    `📱 *Telepon:* ${telepon}\n` +
    `📍 *Alamat:* ${alamat}\n` +
    `👥 *Jumlah Penghuni:* ${penghuni}\n\n` +
    `🍽️ *Kesediaan makanan beragam:* ${select1}\n` +
    `⏰ *Waktu Terbaik Menerima:* ${select2}\n` +
    `🔁 *Frekuensi Bantuan:* ${select3}\n` +
    `❄️ *Ada Kulkas:* ${kulkas}\n` +
    `⚠️ *Kebutuhan Khusus:* ${kebutuhanKhusus}`;

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
      alert("✅ Data penerima berhasil dikirim ke WhatsApp!");
      window.location.href = "selesaipenerima.html";
    })
    .catch((err) => {
      alert("❌ Gagal mengirim data ke WhatsApp.");
      console.error(err);
    });
});

function goBack() {
  window.location.href = "penerima.html";
}
