document.getElementById("relawan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  localStorage.setItem("relawan-nama", document.getElementById("nama").value);
  localStorage.setItem("relawan-nik", document.getElementById("nik").value);
  localStorage.setItem("relawan-email", document.getElementById("email").value);
  localStorage.setItem("relawan-telepon", document.getElementById("telepon").value);
  localStorage.setItem("relawan-alamat", document.getElementById("alamat").value);

  window.location.href = "ketersedianrelawan.html";
});

function goBack() {
  window.location.href = "mainlandingpage.html";
}
