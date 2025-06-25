document
        .getElementById("penerima-form")
        .addEventListener("submit", function (e) {
          e.preventDefault(); // Mencegah form langsung submit

          const form = e.target;

          if (form.checkValidity()) {
            // Jika semua input valid, arahkan ke halaman verifikasi
            window.location.href = "verifikasipenerima.html";
          } else {
            // Jika ada yang kosong, munculkan validasi HTML5
            form.reportValidity();
          }
        });
        
function goBack() {
  window.location.href = "mainlandingpage.html";
}