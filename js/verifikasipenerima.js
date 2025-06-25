const form = document.getElementById("verifikasi-form");
    form.addEventListener("submit", function (e) {
    e.preventDefault(); 

        if (form.checkValidity()) {
        window.location.href = "selesaipenerima.html"; 
        } else {
          form.reportValidity(); 
        }
    });

function goBack() {
window.location.href = "penerima.html"; 
}