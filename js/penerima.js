document
  .getElementById("penerima-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;

    if (form.checkValidity()) {
      window.location.href = "verifikasipenerima.html";
    } else {
      form.reportValidity();
    }
  });

function goBack() {
  window.location.href = "mainlandingpage.html";
}
