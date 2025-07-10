document.addEventListener("DOMContentLoaded", () => {
  const diaryTable = document.querySelector("#diary-makan .diary-table tbody");
  if (!diaryTable) return;

  const diaryData = JSON.parse(localStorage.getItem("diaryPolaMakan")) || [];
  const checklistData = JSON.parse(localStorage.getItem("checkedMakanHari")) || [];

  const renderTable = (data, checklist) => {
    diaryTable.innerHTML = "";
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];

    if (data.length > 0) {
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="day-cell">${item.hari}</td>
          <td>${item.sarapan || "-"}</td>
          <td>${item.makanSiang || "-"}</td>
          <td>${item.makanMalam || "-"}</td>
          <td><input type="checkbox" data-hari="${item.hari}" /></td>
        `;

        const checkbox = tr.querySelector("input[type='checkbox']");
        checkbox.checked = checklist.includes(item.hari);

        checkbox.addEventListener("change", () => {
          const checkedItems = Array.from(
            diaryTable.querySelectorAll("input[type='checkbox']")
          )
            .filter((cb) => cb.checked)
            .map((cb) => cb.dataset.hari);

          localStorage.setItem("checkedMakanHari", JSON.stringify(checkedItems));
        });

        diaryTable.appendChild(tr);
      });
    } else {
      days.forEach((hari) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="day-cell">${hari}</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td><input type="checkbox" data-hari="${hari}" /></td>
        `;

        const checkbox = tr.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
          const checkedItems = Array.from(
            diaryTable.querySelectorAll("input[type='checkbox']")
          )
            .filter((cb) => cb.checked)
            .map((cb) => cb.dataset.hari);

          localStorage.setItem("checkedMakanHari", JSON.stringify(checkedItems));
        });

        diaryTable.appendChild(tr);
      });
    }
  };

  renderTable(diaryData, checklistData);

  // RESET Diary Pola Makan
  const resetBtn = document.getElementById("reset-makan");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const confirmReset = confirm("Apakah kamu yakin ingin mereset diary pola makan?");
      if (confirmReset) {
        localStorage.removeItem("diaryPolaMakan");
        localStorage.removeItem("diaryPolaMakanSavedAt");
        localStorage.removeItem("checkedMakanHari");

        renderTable([], []); 
        showNotification("Diary pola makan berhasil direset.", "success");
      }
    });
  }
});
