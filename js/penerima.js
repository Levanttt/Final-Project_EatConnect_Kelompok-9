document.getElementById("penerima-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;

  if (form.checkValidity()) {
    // Simpan data ke localStorage
    localStorage.setItem("penerima-nama", document.getElementById("nama").value);
    localStorage.setItem("penerima-jenis", document.getElementById("jenis").value);
    localStorage.setItem("penerima-penanggung", document.getElementById("penanggung").value);
    localStorage.setItem("penerima-telepon", document.getElementById("telepon").value);
    localStorage.setItem("penerima-alamat", document.getElementById("alamat").value);
    localStorage.setItem("penerima-penghuni", document.getElementById("penghuni").value);

    // Ambil semua select tambahan
    const selects = form.querySelectorAll("select:not([id='jenis']):not([id='penghuni'])");
    selects.forEach((select, index) => {
      localStorage.setItem(`penerima-select-${index}`, select.value);
    });

    const kebutuhanKhusus = form.querySelector("input[type='text'][placeholder^='Jika ada']").value;
    localStorage.setItem("penerima-kebutuhan", kebutuhanKhusus);

    window.location.href = "verifikasipenerima.html";
  } else {
    form.reportValidity();
  }
});

function goBack() {
  window.history.back();
}
