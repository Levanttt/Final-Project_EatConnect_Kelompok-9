document
  .getElementById("ketersediaan-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const hari = document.getElementById("hari").value.trim();
    const jam = document.getElementById("jam").value.trim();
    const kendaraan = document.getElementById("kendaraan").value.trim();
    if (!hari || !jam || !kendaraan) {
      alert("Harap isi semua kolom yang wajib diisi!");
    } else {
      localStorage.setItem(
        "ketersediaanRelawan",
        JSON.stringify({ hari, jam, kendaraan })
      );
      window.location.href = "selesairelawan.html";
    }
  });

function goBack() {
  window.location.href = "relawan.html";
}
