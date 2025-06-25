document.getElementById("relawan-form").addEventListener("submit", function (e) {
e.preventDefault();
const nama = document.getElementById("nama").value.trim();
const nik = document.getElementById("nik").value.trim();
const email = document.getElementById("email").value.trim();
const telepon = document.getElementById("telepon").value.trim();
const alamat = document.getElementById("alamat").value.trim();
if (!nama || !nik || !email || !telepon || !alamat) {
    alert("Harap isi semua kolom yang wajib diisi!");
} else {
    localStorage.setItem("relawanData", JSON.stringify({ nama, nik, email, telepon, alamat }));
    window.location.href = "ketersedianrelawan.html";
}
});

function goBack() {
  window.location.href = "mainlandingpage.html";
}