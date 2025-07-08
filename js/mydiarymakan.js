document.addEventListener("DOMContentLoaded", () => {
  const diaryTable = document.querySelector("#diary-makan .diary-table tbody");
  const resetButton = document.createElement("button");

  if (!diaryTable) return;

  const diaryData = JSON.parse(localStorage.getItem("diaryPolaMakan")) || [];

  // Kosongkan tabel dan render data jika ada
  diaryTable.innerHTML = "";
  if (diaryData.length > 0) {
    diaryData.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="day-cell">${item.hari}</td>
        <td>${item.sarapan || "-"}</td>
        <td>${item.makanSiang || "-"}</td>
        <td>${item.makanMalam || "-"}</td>
        <td><input type="checkbox" /></td>
      `;
      diaryTable.appendChild(tr);
    });
  } else {
    // Jika belum ada data, tampilkan baris kosong
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
    days.forEach((hari) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="day-cell">${hari}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td><input type="checkbox" /></td>
      `;
      diaryTable.appendChild(tr);
    });
  }

  // RESET Diary Pola Makan
    document.getElementById("reset-makan").addEventListener("click", () => {
    const confirmReset = confirm("Apakah kamu yakin ingin mereset diary pola makan?");
    if (confirmReset) {
      localStorage.removeItem("diaryPolaMakan");
      localStorage.removeItem("diaryPolaMakanSavedAt");
      location.reload();
    }
  });
});
