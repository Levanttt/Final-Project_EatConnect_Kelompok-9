document.querySelectorAll(".orange-btn").forEach((btn) => {
  if (btn.textContent.trim() === "Save My Diary") {
    btn.addEventListener("click", () => {
      const tableBody = document.querySelector(".menu-table tbody");
      if (!tableBody) return;

      const rows = tableBody.querySelectorAll("tr");
      const diaryData = [];

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length === 4) {
          const hari = cells[0].textContent.trim();
          const sarapan = cells[1].textContent.trim();
          const makanSiang = cells[2].textContent.trim();
          const makanMalam = cells[3].textContent.trim();

          diaryData.push({ hari, sarapan, makanSiang, makanMalam });
        }
      });

      localStorage.setItem("diaryPolaMakan", JSON.stringify(diaryData));
      alert("Diary berhasil disimpan!");
    });
  }
});

// === TAMPILKAN DATA DI PROFIL (HALAMAN PROFIL) ===
document.addEventListener("DOMContentLoaded", () => {
  const diaryTable = document.querySelector("#diary-makan .diary-table tbody");

  if (diaryTable) {
    const diaryData = JSON.parse(localStorage.getItem("diaryPolaMakan")) || [];

    // Kosongkan isi tbody sebelum render ulang
    diaryTable.innerHTML = "";

    diaryData.forEach((item) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.hari}</td>
        <td>${item.sarapan || "-"}</td>
        <td>${item.makanSiang || "-"}</td>
        <td>${item.makanMalam || "-"}</td>
        <td><input type="checkbox" /></td>
      `;

      diaryTable.appendChild(tr);
    });
  }
});
