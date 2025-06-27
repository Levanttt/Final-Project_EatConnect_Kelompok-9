function goBack() {
        window.history.back();
        } 

document.getElementById("verifikasi-form").addEventListener("submit", function(e) {
  e.preventDefault();
  window.location.href = "selesaidonatur.html";
});