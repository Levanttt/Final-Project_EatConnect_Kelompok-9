document.addEventListener("DOMContentLoaded", () => {
  const diaryTable = document.querySelector("#diary-fisik .diary-table tbody");
  const aktivitasData = JSON.parse(localStorage.getItem("diaryAktivitasFisik")) || [];
  const checklistData = JSON.parse(localStorage.getItem("checkedFisikHari")) || [];

  if (!diaryTable) return;

  const renderTable = (data, checklist) => {
    diaryTable.innerHTML = "";
    const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];

    // Jika ada data, render sesuai
    if (data.length > 0) {
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.hari}</td>
          <td>${item.olahraga || "-"}</td>
          <td>${item.durasi || "-"}</td>
          <td>${item.tujuan || "-"}</td>
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

          localStorage.setItem("checkedFisikHari", JSON.stringify(checkedItems));
        });

        diaryTable.appendChild(tr);
      });
    } else {
      // Jika tidak ada data, render default kosong
      hariList.forEach((hari) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${hari}</td>
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

          localStorage.setItem("checkedFisikHari", JSON.stringify(checkedItems));
        });

        diaryTable.appendChild(tr);
      });
    }
  };

  renderTable(aktivitasData, checklistData);

  // === RESET Diary Aktivitas Fisik ===
  const resetBtn = document.getElementById("reset-fisik");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const confirmReset = confirm("Apakah kamu yakin ingin mereset diary aktivitas fisik?");
      if (confirmReset) {
        localStorage.removeItem("diaryAktivitasFisik");
        localStorage.removeItem("diaryAktivitasFisikSavedAt");
        localStorage.removeItem("checkedFisikHari");

        renderTable([], []); 
        showNotification("Diary aktivitas fisik berhasil direset.", "success");
      }
    });
  }
});
