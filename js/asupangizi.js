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


// Upload area preview
const uploadArea = document.querySelector(".upload-area");
const fileInput = document.getElementById("fotoUpload");

uploadArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    document.querySelector(".upload-sub").textContent = `Dipilih: ${fileName}`;
  }
});

// Cek Menu Mingguan
function cekMenuMingguan() {
  const berat = document.getElementById("beratBadan").value.trim();
  const tujuan = document.getElementById("tujuanBB").value;
  const pola = document.getElementById("polaMakan").value;
  const pantangan = document.getElementById("pantangan").value.toLowerCase().trim();

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
}

// Cek Aktivitas Fisik
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

  const jadwalOlahraga = {
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

  const data = jadwalOlahraga[tujuan];

  const tbody = document.querySelector(".aktivitas-table tbody");
  const hari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum’at",
    "Sabtu",
    "Minggu",
  ];

  if (data) {
    tbody.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const tr = document.createElement("tr");
      const tdHari = `<td>${hari[i]}</td>`;
      const tdJenis = `<td>${data.jenis[i]}</td>`;
      const tdDurasi = `<td>${data.durasi}</td>`;
      const tdTujuan = `<td>${tujuan}${
        kondisi ? " (" + kondisi + ")" : ""
      }</td>`;
      tr.innerHTML = tdHari + tdJenis + tdDurasi + tdTujuan;
      tbody.appendChild(tr);
    }
  } else {
    alert("Silakan pilih semua opsi pada form terlebih dahulu.");
  }
}
