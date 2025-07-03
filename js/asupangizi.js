/* ======================================================
   EatConnect – Frontend Logic (Pure JS, no backend)
   ====================================================== */

/* ► tombol back ke landing */
function goBack() {
  window.location.href = "mainlandingpage.html";
}

/* ---------- KAMUS GIZI MINI ---------- */
const dbGizi = {
  "nasi goreng ayam": {
    kalori: 523,
    karbo: 55,
    protein: 21,
    lemak: 18,
    gula: 4,
    serat: 2,
    zatBesi: 3.5,
    note: "Disarankan menambah sayuran agar lebih seimbang.",
  },
  "salad sayur": {
    kalori: 320,
    karbo: 20,
    protein: 8,
    lemak: 22,
    gula: 5,
    serat: 7,
    zatBesi: 2.1,
    note: "Lemak sehat dari alpukat—cocok untuk diet keto ringan.",
  },
  "mie instan": {
    kalori: 380,
    karbo: 52,
    protein: 8,
    lemak: 14,
    gula: 3,
    serat: 1,
    zatBesi: 2,
    note: "Tinggi sodium, konsumsi tidak lebih dari 1× per minggu.",
  },
};
const cariGizi = (d) => dbGizi[d] ?? null;
const fuzzyGizi = (d) =>
  Object.entries(dbGizi).find(([k]) => d.includes(k))?.[1] ?? null;

/* ---------- ANALISIS NUTRISI ---------- */
document.querySelector(".check-btn").addEventListener("click", () => {
  const input = document.getElementById("deskripsiMakanan").value.trim();
  if (!input)
    return showNotification("Harap tulis nama makanan dulu.", "error");

  const data = cariGizi(input.toLowerCase()) || fuzzyGizi(input.toLowerCase());
  if (!data) return showNotification("Data gizi belum tersedia.", "error");

  document.querySelector(".food-name").textContent = input;
  document.querySelector(".kcal").textContent = data.kalori + " Kkal";

  const span = document.querySelectorAll(".nutrient-list li span");
  span[0].textContent = data.karbo + " g";
  span[1].textContent = data.protein + " g";
  span[2].textContent = data.lemak + " g";
  span[3].textContent = data.gula + " g";
  span[4].textContent = data.serat + " g";
  span[5].textContent = data.zatBesi + " mg";

  document.querySelector(".note-box").innerHTML =
    "<strong>Note :</strong> " + data.note;
});

/* ---------- Upload preview ---------- */
const uploadArea = document.querySelector(".upload-area");
const fileInput = document.getElementById("fotoUpload");
uploadArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  if (fileInput.files.length)
    document.querySelector(
      ".upload-sub"
    ).textContent = `Dipilih: ${fileInput.files[0].name}`;
});

/* ---------- CEK MENU MINGGUAN ---------- */
function cekMenuMingguan() {
  const berat = document.getElementById("beratBadan").value.trim();
  const tujuan = document.getElementById("tujuanBB").value;
  const pola = document.getElementById("polaMakan").value;
  const pantangan = document
    .getElementById("pantangan")
    .value.toLowerCase()
    .trim();

  if (!berat || !tujuan || !pola) {
    showNotification("Isi berat badan, tujuan & pola makan!", "error");
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

  const baseMenu = pola === "Vegetarian" ? menuVegetarian : menuNonVeg;

  // pantangan: misalnya "ayam, telur"
  const avoidList = pantangan
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const filteredMenu = baseMenu.map((menu) => ({
    sarapan: avoidList.some((p) => menu.sarapan.toLowerCase().includes(p))
      ? "-"
      : menu.sarapan,
    siang: avoidList.some((p) => menu.siang.toLowerCase().includes(p))
      ? "-"
      : menu.siang,
    malam: avoidList.some((p) => menu.malam.toLowerCase().includes(p))
      ? "-"
      : menu.malam,
  }));

  // isi ulang baris tabel
  const rows = document.querySelectorAll("#menuMingguan tr");
  filteredMenu.forEach((menu, i) => {
    if (rows[i]) {
      rows[i].children[1].textContent = menu.sarapan;
      rows[i].children[2].textContent = menu.siang;
      rows[i].children[3].textContent = menu.malam;
    }
  });

  showNotification("Menu mingguan berhasil ditampilkan!", "success");
}

/* ---------- CEK AKTIVITAS FISIK ---------- */
function cekAktivitasFisik() {
  const tujuan = document.querySelector(
    "#aktivitas-fisik select:nth-of-type(1)"
  ).value;
  const kondisi = document
    .querySelector("#aktivitas-fisik input[type='text']")
    .value.trim();
  const tingkat = document.querySelector(
    "#aktivitas-fisik select:nth-of-type(2)"
  ).value;

  if (
    !tujuan ||
    tujuan === "Tujuan" ||
    !tingkat ||
    tingkat === "Tingkat Aktivitas"
  )
    return showNotification("Silakan lengkapi semua opsi.", "error");

  const jadwal = {
    "Menurunkan Berat Badan": {
      jenis: [
        "Jogging",
        "HIIT",
        "Yoga",
        "Bersepeda",
        "Senam Aerobik",
        "Lompat Tali",
        "Renang",
      ],
      durasi: "30-45 menit",
    },
    "Membentuk Otot Tubuh": {
      jenis: [
        "Angkat Beban",
        "Push Up",
        "Plank",
        "Pull Up",
        "Bodyweight Training",
        "Squat",
        "Resistance Band",
      ],
      durasi: "40-60 menit",
    },
    "Menjaga Kesehatan": {
      jenis: [
        "Jalan Kaki",
        "Stretching",
        "Yoga Ringan",
        "Senam Pagi",
        "Tai Chi",
        "Naik Turun Tangga",
        "Bersepeda Santai",
      ],
      durasi: "20-30 menit",
    },
  };

  const data = jadwal[tujuan];
  const tbody = document.querySelector(".aktivitas-table tbody");
  const hari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
    "Minggu",
  ];
  tbody.innerHTML = "";
  hari.forEach((h, i) => {
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr><td>${h}</td><td>${data.jenis[i]}</td><td>${
        data.durasi
      }</td><td>${tujuan}${kondisi ? " (" + kondisi + ")" : ""}</td></tr>`
    );
  });
  showNotification("Jadwal aktivitas fisik berhasil dibuat!", "success");
}

/* ---------- Notification util ---------- */
function showNotification(msg, type = "warning") {
  document.getElementById("modernNotification")?.remove();
  const icon = type === "error" ? "⚠️" : type === "success" ? "✅" : "❗";
  const title =
    type === "error"
      ? "Perhatian"
      : type === "success"
      ? "Berhasil"
      : "Informasi";
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="notification-overlay" id="modernNotification">
       <div class="notification-card">
         <button class="close-btn" onclick="closeNotification()">&times;</button>
         <div class="notification-icon">${icon}</div>
         <div class="notification-title">${title}</div>
         <div class="notification-message">${msg}</div>
         <button class="notification-btn" onclick="closeNotification()">OK</button>
       </div></div>`
  );
  setTimeout(
    () => document.getElementById("modernNotification").classList.add("show"),
    10
  );
}
function closeNotification() {
  const n = document.getElementById("modernNotification");
  if (n) {
    n.classList.remove("show");
    setTimeout(() => n.remove(), 300);
  }
}
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && closeNotification()
);
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("notification-overlay")) closeNotification();
});

/* ---------- SAVE DIARY – MENU makan ---------- */
document.querySelectorAll(".menu-table + .orange-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const rows = [...document.querySelectorAll("#menuMingguan tr")].slice(1);
    const data = rows.map((r) => ({
      hari: r.cells[0].textContent,
      sarapan: r.cells[1].textContent,
      siang: r.cells[2].textContent,
      malam: r.cells[3].textContent,
    }));
    if (!data.some((d) => d.sarapan || d.siang || d.malam))
      return showNotification(
        "Belum ada data menu yang bisa disimpan!",
        "error"
      );
    localStorage.setItem("diaryMakan", JSON.stringify(data));
    showNotification("Diary makanan berhasil disimpan!", "success");
  });
});

/* ---------- SAVE DIARY – Aktivitas fisik ---------- */
document.querySelectorAll(".aktivitas-table + .orange-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const rows = [...document.querySelectorAll("#tabelAktivitas tr")].slice(1);
    const data = rows.map((r) => ({
      hari: r.cells[0].textContent,
      jenis: r.cells[1].textContent,
      durasi: r.cells[2].textContent,
      tujuan: r.cells[3].textContent,
    }));
    if (!data.some((d) => d.jenis || d.durasi))
      return showNotification(
        "Belum ada data aktivitas yang bisa disimpan!",
        "error"
      );
    localStorage.setItem("diaryAktivitas", JSON.stringify(data));
    showNotification("Diary aktivitas berhasil disimpan!", "success");
  });
});
