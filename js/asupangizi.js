function goBack() {
  window.location.href = "mainlandingpage.html";
}

// Analisis Nutrisi
document.querySelector(".check-btn").addEventListener("click", function () {
  const deskripsi = document.getElementById("deskripsiMakanan").value.trim();

  const contohHasil = [
    {
      nama: "Nasi Goreng Ayam",
      kalori: "523 Kkal",
      nutrisi: {
        karbo: "55 g",
        protein: "21 g",
        lemak: "18 g",
        gula: "4 g",
        serat: "2 g",
        zatBesi: "3.5 mg",
      },
      catatan: "Disarankan untuk menambah sayuran agar lebih seimbang.",
    },
    {
      nama: "Salad Sayur dengan Alpukat",
      kalori: "320 Kkal",
      nutrisi: {
        karbo: "20 g",
        protein: "8 g",
        lemak: "22 g",
        gula: "5 g",
        serat: "7 g",
        zatBesi: "2.1 mg",
      },
      catatan: "Lemak sehat, cocok untuk diet keto ringan.",
    },
    {
      nama: "Mie Instan + Telur",
      kalori: "450 Kkal",
      nutrisi: {
        karbo: "52 g",
        protein: "12 g",
        lemak: "16 g",
        gula: "3 g",
        serat: "1 g",
        zatBesi: "1.8 mg",
      },
      catatan: "Tinggi sodium, konsumsi tidak lebih dari 1x/minggu.",
    },
  ];

  const hasil =
    deskripsi.length > 0
      ? { ...contohHasil[0], nama: deskripsi }
      : contohHasil[Math.floor(Math.random() * contohHasil.length)];

  document.querySelector(".food-name").textContent = hasil.nama;
  document.querySelector(".kcal").textContent = hasil.kalori;

  const list = document.querySelectorAll(".nutrient-list li span");
  list[0].textContent = hasil.nutrisi.karbo;
  list[1].textContent = hasil.nutrisi.protein;
  list[2].textContent = hasil.nutrisi.lemak;
  list[3].textContent = hasil.nutrisi.gula;
  list[4].textContent = hasil.nutrisi.serat;
  list[5].textContent = hasil.nutrisi.zatBesi;

  document.querySelector(".note-box").innerHTML =
    "<strong>Note :</strong> " + hasil.catatan;
});


// === UPLOAD AREA ===
document.querySelector(".upload-area")?.addEventListener("click", () => {
  document.getElementById("fotoUpload").click();
});
document.getElementById("fotoUpload")?.addEventListener("change", function () {
  if (this.files.length > 0) {
    document.querySelector(".upload-sub").textContent = `Dipilih: ${this.files[0].name}`;
  }
});

// Cek Menu Mingguan
function cekMenuMingguan() {
  const berat = document.getElementById("beratBadan").value.trim();
  const tujuan = document.getElementById("tujuanBB").value;
  const pola = document.getElementById("polaMakan").value;
  const pantangan = document.getElementById("pantangan").value.toLowerCase().trim();
  
  // Validasi input
  if (!berat || !tujuan || !pola) {
    showNotification("Silakan isi semua data berat badan, tujuan, dan pola makan!", 'error');
    return;
  }

  const menuVegetarian = [
    {
      sarapan: "Oatmeal + pisang",
      siang: "Nasi merah + tumis tahu + sayur",
      malam: "Sup jagung + tempe bakar",
    },
    {
      sarapan: "Roti gandum + alpukat",
      siang: "Gado-gado + kentang rebus",
      malam: "Sop bayam + tahu kukus",
    },
    {
      sarapan: "Smoothie buah + granola",
      siang: "Nasi + capcay sayur",
      malam: "Tumis buncis + tahu",
    },
    {
      sarapan: "Pancake pisang + madu",
      siang: "Nasi + terong balado",
      malam: "Sayur bening + tempe goreng",
    },
    {
      sarapan: "Roti panggang + selai kacang",
      siang: "Tumis jamur + sayur asem",
      malam: "Lontong sayur tanpa daging",
    },
    {
      sarapan: "Smoothie bowl + kacang-kacangan",
      siang: "Nasi uduk + telur rebus",
      malam: "Tumis brokoli + tahu",
    },
    {
      sarapan: "Bubur kacang hijau",
      siang: "Nasi + sayur lodeh",
      malam: "Sup wortel + tempe panggang",
    },
  ];

  const menuNonVeg = [
    {
      sarapan: "Telur rebus + roti gandum",
      siang: "Nasi merah + ayam rebus + sayur",
      malam: "Sup ayam + kentang panggang",
    },
    {
      sarapan: "Omelet + buah",
      siang: "Ikan bakar + lalapan + nasi",
      malam: "Tumis ayam + brokoli",
    },
    {
      sarapan: "Smoothie + telur mata sapi",
      siang: "Nasi + ayam teriyaki",
      malam: "Sop daging + wortel",
    },
    {
      sarapan: "Roti + selai + susu",
      siang: "Sate ayam + lontong",
      malam: "Ikan kukus + sayur bening",
    },
    {
      sarapan: "Sereal + susu",
      siang: "Ayam panggang + kentang",
      malam: "Sup ikan + bayam",
    },
    {
      sarapan: "Pisang + telur dadar",
      siang: "Ikan tuna + salad",
      malam: "Sup ayam jagung",
    },
    {
      sarapan: "Toast + telur rebus",
      siang: "Ayam geprek + nasi",
      malam: "Tumis sayur + ayam kukus",
    },
  ];

  const menuMingguan = pola === "Vegetarian" ? menuVegetarian : menuNonVeg;

  const hari = document
    .getElementById("menuMingguan")
    .querySelectorAll("tr");

  hari.forEach((tr, i) => {
    tr.children[1].textContent = menuMingguan[i].sarapan;
    tr.children[2].textContent = menuMingguan[i].siang;
    tr.children[3].textContent = menuMingguan[i].malam;
  });
  // Notifikasi sukses
  showNotification("Menu mingguan berhasil ditampilkan!", 'success');
}

// === NOTIFICATION MODERN ===
function showNotification(message, type = 'warning') {
  const existingNotif = document.getElementById('modernNotification');
  if (existingNotif) existingNotif.remove();

  const notificationHTML = `
    <div class="notification-overlay" id="modernNotification">
      <div class="notification-card">
        <button class="close-btn" onclick="closeNotification()">&times;</button>
        <div class="notification-icon">${type === 'error' ? '⚠️' : type === 'success' ? '✅' : '❗'}</div>
        <div class="notification-title">${type === 'error' ? 'Perhatian' : type === 'success' ? 'Berhasil' : 'Informasi'}</div>
        <div class="notification-message">${message}</div>
        <button class="notification-btn" onclick="closeNotification()">OK</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', notificationHTML);
  setTimeout(() => {
    document.getElementById('modernNotification')?.classList.add('show');
  }, 10);
}

function closeNotification() {
  const notification = document.getElementById('modernNotification');
  if (notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNotification();
});
document.addEventListener('click', e => {
  if (e.target?.classList.contains('notification-overlay')) closeNotification();
});


// Fungsi cekAktivitasFisik 
function cekAktivitasFisik() {
    const tujuan = document.querySelector("#aktivitas-fisik select:nth-of-type(1)").value;
    const kondisi = document.querySelector("#aktivitas-fisik input[type='text']").value.trim();
    const tingkat = document.querySelector("#aktivitas-fisik select:nth-of-type(2)").value;

    // Validasi form
    if (!tujuan || tujuan === "Tujuan" || !tingkat || tingkat === "Tingkat Aktivitas") {
        showNotification("Silakan pilih semua opsi pada form terlebih dahulu.", 'error');
        return;
    }

    const jadwalOlahraga = {
        "Menurunkan Berat Badan": {
            jenis: ["Jogging", "HIIT", "Yoga", "Bersepeda", "Senam Aerobik", "Lompat Tali", "Renang"],
            durasi: "30-45 menit",
        },
        "Membentuk Otot Tubuh": {
            jenis: ["Angkat Beban", "Push Up", "Plank", "Pull Up", "Bodyweight Training", "Squat", "Resistance Band"],
            durasi: "40-60 menit",
        },
        "Menjaga Kesehatan": {
            jenis: ["Jalan Kaki", "Stretching", "Yoga Ringan", "Senam Pagi", "Tai Chi", "Naik Turun Tangga", "Bersepeda Santai"],
            durasi: "20-30 menit",
        },
    };

    const data = jadwalOlahraga[tujuan];
    const tbody = document.querySelector(".aktivitas-table tbody");
    const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];

    if (data) {
        tbody.innerHTML = "";
        for (let i = 0; i < 7; i++) {
            const tr = document.createElement("tr");
            const tdHari = `<td>${hari[i]}</td>`;
            const tdJenis = `<td>${data.jenis[i]}</td>`;
            const tdDurasi = `<td>${data.durasi}</td>`;
            const tdTujuan = `<td>${tujuan}${kondisi ? " (" + kondisi + ")" : ""}</td>`;
            tr.innerHTML = tdHari + tdJenis + tdDurasi + tdTujuan;
            tbody.appendChild(tr);
        }
        
        // Show success notification
        showNotification("Jadwal aktivitas fisik berhasil dibuat!", 'success');
    }
}

// Close notification ketika klik overlay
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('notification-overlay')) {
        closeNotification();
    }
});

// === SIMPAN DIARY AKTIVITAS FISIK ===
document.querySelectorAll(".orange-btn").forEach((btn) => {
  if (btn.closest("section")?.id === "aktivitas-fisik") {
    btn.addEventListener("click", () => {
      const tbody = document.querySelector(".aktivitas-table tbody");
      const aktivitasData = [];

      tbody.querySelectorAll("tr").forEach(tr => {
        const cells = tr.querySelectorAll("td");
        if (cells.length === 4) {
          const hari = cells[0].textContent.trim();
          const olahraga = cells[1].textContent.trim();
          const durasi = cells[2].textContent.trim();
          const tujuan = cells[3].textContent.trim();
          aktivitasData.push({ hari, olahraga: olahraga || "-", durasi: durasi || "-", tujuan: tujuan || "-" });
        }
      });

      if (!aktivitasData.length) {
        showNotification("Belum ada data aktivitas yang bisa disimpan!", "error");
        return;
      }

      localStorage.setItem("diaryAktivitasFisik", JSON.stringify(aktivitasData));
      localStorage.setItem("diaryAktivitasFisikSavedAt", new Date().toISOString());
      showNotification("Diary aktivitas fisik berhasil disimpan!", "success");
    });
  }
});

// Save My Diary untuk Menu Makan
document.querySelectorAll('.menu-table + .orange-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const tbody = document.getElementById('menuMingguan');
    
    const hasData = Array.from(tbody.rows).some(tr =>
      Array.from(tr.cells).slice(1).some(td => td.textContent.trim() !== "")
    );
    
    if (!hasData) {
      showNotification("Belum ada data menu yang bisa disimpan!", 'error');
    } else {
      // === Simpan ke localStorage ===
      const diaryData = [];
      Array.from(tbody.rows).forEach((tr) => {
        const hari = tr.cells[0].textContent.trim();
        const sarapan = tr.cells[1].textContent.trim();
        const makanSiang = tr.cells[2].textContent.trim();
        const makanMalam = tr.cells[3].textContent.trim();

        diaryData.push({ hari, sarapan, makanSiang, makanMalam });
      });

      localStorage.setItem("diaryPolaMakan", JSON.stringify(diaryData));
      localStorage.setItem("diaryPolaMakanSavedAt", new Date().toISOString());

      showNotification("Diary makanan berhasil disimpan!", 'success');
    }
  });
});

// === HALAMAN PROFIL ===
document.addEventListener("DOMContentLoaded", () => {
  const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];

  // POLA MAKAN
  const diaryMakan = JSON.parse(localStorage.getItem("diaryPolaMakan")) || [];
  const checkedMakan = JSON.parse(localStorage.getItem("checkedMakanHari")) || [];
  const tableMakan = document.querySelector("#diary-makan .diary-table tbody");
  if (tableMakan) {
    tableMakan.innerHTML = "";
    (diaryMakan.length ? diaryMakan : hariList.map(h => ({ hari: h, sarapan: "-", makanSiang: "-", makanMalam: "-" }))).forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.hari}</td>
        <td>${item.sarapan}</td>
        <td>${item.makanSiang}</td>
        <td>${item.makanMalam}</td>
        <td><input type="checkbox" data-hari="${item.hari}" ${checkedMakan.includes(item.hari) ? 'checked' : ''}></td>
      `;
      tr.querySelector("input").addEventListener("change", () => {
        const checked = Array.from(tableMakan.querySelectorAll("input:checked")).map(cb => cb.dataset.hari);
        localStorage.setItem("checkedMakanHari", JSON.stringify(checked));
      });
      tableMakan.appendChild(tr);
    });

    document.getElementById("reset-makan")?.addEventListener("click", () => {
      if (confirm("Apakah kamu yakin ingin mereset diary pola makan?")) {
        localStorage.removeItem("diaryPolaMakan");
        localStorage.removeItem("diaryPolaMakanSavedAt");
        localStorage.removeItem("checkedMakanHari");
        location.reload();
      }
    });
  }

  // AKTIVITAS FISIK
  const diaryFisik = JSON.parse(localStorage.getItem("diaryAktivitasFisik")) || [];
  const checkedFisik = JSON.parse(localStorage.getItem("checkedFisikHari")) || [];
  const tableFisik = document.querySelector("#diary-fisik .diary-table tbody");
  if (tableFisik) {
    tableFisik.innerHTML = "";
    (diaryFisik.length ? diaryFisik : hariList.map(h => ({ hari: h, olahraga: "-", durasi: "-", tujuan: "-" }))).forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.hari}</td>
        <td>${item.olahraga}</td>
        <td>${item.durasi}</td>
        <td>${item.tujuan}</td>
        <td><input type="checkbox" data-hari="${item.hari}" ${checkedFisik.includes(item.hari) ? 'checked' : ''}></td>
      `;
      tr.querySelector("input").addEventListener("change", () => {
        const checked = Array.from(tableFisik.querySelectorAll("input:checked")).map(cb => cb.dataset.hari);
        localStorage.setItem("checkedFisikHari", JSON.stringify(checked));
      });
      tableFisik.appendChild(tr);
    });

    document.getElementById("reset-fisik")?.addEventListener("click", () => {
      if (confirm("Apakah kamu yakin ingin mereset diary aktivitas fisik?")) {
        localStorage.removeItem("diaryAktivitasFisik");
        localStorage.removeItem("diaryAktivitasFisikSavedAt");
        localStorage.removeItem("checkedFisikHari");
        location.reload();
      }
    });
  }
});