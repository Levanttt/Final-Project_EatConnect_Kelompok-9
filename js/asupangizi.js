// Analisis Nutrisi

document.querySelector(".check-btn").addEventListener("click", function () {
  const deskripsi = document.getElementById("deskripsiMakanan").value.trim();

  const hasil = {
    nama: deskripsi || "Nasi Goreng Ayam",
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
  };

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
  const pantangan = document.getElementById("pantangan").value.trim();

  const menuContoh = {
    Sarapan: "Oatmeal + buah",
    Siang: "Nasi merah + ayam rebus + sayur",
    Malam: "Sup sayur + tempe panggang",
  };

  const tbody = document.getElementById("menuMingguan").querySelectorAll("tr");
  tbody.forEach((tr) => {
    tr.children[1].textContent = menuContoh.Sarapan;
    tr.children[2].textContent = menuContoh.Siang;
    tr.children[3].textContent = menuContoh.Malam;
  });
}

document.querySelectorAll(".orange-btn").forEach((btn) => {
  if (btn.textContent.trim() === "Cek Aktivitas") {
    btn.addEventListener("click", cekAktivitasFisik);
  }
});

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
