document.querySelectorAll(".orange-btn").forEach((btn) => {
  if (btn.textContent.trim() === "Save My Diary") {
    const parentSection = btn.closest("section");
    const isAktivitasFisikSection = parentSection && parentSection.id === "aktivitas-fisik";

    if (isAktivitasFisikSection) {
      btn.addEventListener("click", () => {
        const tableBody = document.querySelector(".aktivitas-table tbody");
        if (!tableBody) return;

        const rows = tableBody.querySelectorAll("tr");
        const aktivitasData = [];

        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length === 4) {
            const hari = cells[0].textContent.trim();
            const olahraga = cells[1].textContent.trim();
            const durasi = cells[2].textContent.trim();
            const tujuan = cells[3].textContent.trim();

            if (olahraga || durasi || tujuan) {
              aktivitasData.push({
                hari,
                olahraga: olahraga || "-",
                durasi: durasi || "-",
                tujuan: tujuan || "-"
              });
            }
          }
        });

        if (aktivitasData.length === 0) {
          showNotification("Belum ada data aktivitas yang bisa disimpan!", "error");
          return;
        }

        localStorage.setItem("diaryAktivitasFisik", JSON.stringify(aktivitasData));
        localStorage.setItem("diaryAktivitasFisikSavedAt", new Date().toISOString());

        showNotification("Diary aktivitas fisik berhasil disimpan!", "success");
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const diaryTable = document.querySelector("#diary-fisik .diary-table tbody");

  if (diaryTable) {
    const aktivitasData = JSON.parse(localStorage.getItem("diaryAktivitasFisik")) || [];

    diaryTable.innerHTML = "";

    if (aktivitasData.length === 0) {
      renderDefaultAktivitasFisik();
    } else {
      aktivitasData.forEach((item) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${item.hari}</td>
          <td>${item.olahraga || "-"}</td>
          <td>${item.durasi || "-"}</td>
          <td>${item.tujuan || "-"}</td>
          <td><input type="checkbox" /></td>
        `;

        diaryTable.appendChild(tr);
      });
    }
  }

  // === RESET Diary Aktivitas Fisik ===
  const resetBtn = document.getElementById("reset-fisik");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const confirmReset = confirm("Apakah kamu yakin ingin mereset diary aktivitas fisik?");
      if (confirmReset) {
        localStorage.removeItem("diaryAktivitasFisik");
        localStorage.removeItem("diaryAktivitasFisikSavedAt");
        renderDefaultAktivitasFisik(); // Tampilkan kembali default kosong
        showNotification("Diary aktivitas fisik berhasil direset.", "success");
      }
    });
  }
});
