// ===========================
// CHAT KONSULTASI
// ===========================

const popup = document.getElementById("popup-chat");
const popupTitle = document.getElementById("popup-title");
const sendBtn = document.querySelector(".chat-input .send-btn");
const chatInput = document.querySelector(".chat-input textarea");
const chatContent = document.getElementById("chat-content");

let currentTopic = "Dokter Gizi";
let chatHistories = {
  "Dokter Gizi": [],
  "Personal Trainer": [],
};

function showChat(topic) {
  currentTopic = topic;
  popupTitle.textContent = `Konsultasi ${topic}`;
  popup.style.display = "flex";
  chatInput.value = "";
  autoGrow(chatInput);
  renderChat(topic);
}

function renderChat(topic) {
  chatContent.innerHTML = "";
  chatHistories[topic].forEach((msg) => {
    const p = document.createElement("p");
    p.textContent = msg;
    p.classList.add("chat-bubble");
    chatContent.appendChild(p);
  });
  chatContent.scrollTop = chatContent.scrollHeight;
}

document.querySelectorAll(".consult-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const selected = this.textContent.trim();
    showChat(selected);
  });
});

document.querySelectorAll(".consult-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    // Hapus class active dari semua tombol
    document.querySelectorAll(".consult-btn").forEach(b => b.classList.remove("active"));
    // Tambahkan class active ke tombol yang diklik
    this.classList.add("active");
    const selected = this.textContent.trim();
    showChat(selected);
  });
});

sendBtn.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    chatHistories[currentTopic].push(message);
    renderChat(currentTopic);
    chatInput.value = "";
    autoGrow(chatInput);
  }
});

chatInput.addEventListener("input", () => {
  autoGrow(chatInput);
});

function autoGrow(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

document.addEventListener("click", function (e) {
  const isClickInsidePopup = popup.contains(e.target);
  const isConsultBtn = e.target.classList.contains("consult-btn");

  if (!isClickInsidePopup && !isConsultBtn) {
    popup.style.display = "none";
  }
});

// ===========================
// POSTINGAN TIMELINE
// ===========================

const postBtn = document.getElementById("post-submit");
const postTextarea = document.querySelector(".post-box textarea");
const timelineTitle = document.querySelector(".timeline-title");
const timelineContainer = document.getElementById("timeline-container");

let posts = [];

function getRelativeTime() {
  return "Baru saja";
}

function renderPost(post) {
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");

  postCard.innerHTML = `
    <p class="post-user">
      👤 <strong>${post.username}</strong>
      <span class="post-time">${getRelativeTime()}</span>
    </p>
    <p class="post-text">${post.text}</p>
    <div class="interactions">
      <span class="like-btn">❤️ <span>${post.likes}</span></span>
      <span class="comment-btn">💬 <span>${post.comments}</span></span>
      <span class="repost-btn">🔁 <span>${post.reposts}</span></span>
    </div>
  `;

  const likeBtn = postCard.querySelector(".like-btn");
  const commentBtn = postCard.querySelector(".comment-btn");
  const repostBtn = postCard.querySelector(".repost-btn");

  likeBtn.addEventListener("click", () => {
    post.likes++;
    likeBtn.querySelector("span").textContent = post.likes;
  });

  commentBtn.addEventListener("click", () => {
    post.comments++;
    commentBtn.querySelector("span").textContent = post.comments;
  });

  repostBtn.addEventListener("click", () => {
    post.reposts++;
    repostBtn.querySelector("span").textContent = post.reposts;
  });

  timelineTitle.insertAdjacentElement("afterend", postCard);
}

postBtn.addEventListener("click", () => {
  const content = postTextarea.value.trim();
  if (content !== "") {
    const newPost = {
      username: "Kamu",
      text: content,
      likes: 0,
      comments: 0,
      reposts: 0,
      time: new Date(),
    };
    posts.unshift(newPost);
    renderPost(newPost);
    postTextarea.value = "";
  }
});

document.getElementById("text-post").addEventListener("click", () => {
  alert("Mode posting teks aktif");
});
document.getElementById("image-post").addEventListener("click", () => {
  alert("Fitur upload gambar belum tersedia");
});
document.getElementById("link-post").addEventListener("click", () => {
  alert("Fitur upload tautan belum tersedia");
});

// ===========================
// NAVIGASI & FOKUS AREA
// ===========================

const navButtons = document.querySelectorAll(".nav-btn");
const timelineWrapper = document.getElementById("timeline-container");
const konsultasiSection = document.querySelector(".consultation");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset semua tombol
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const label = btn.textContent.trim();

    // Hapus dan reset animasi sebelumnya
    timelineWrapper.classList.remove("highlighted");
    konsultasiSection.classList.remove("highlighted");
    void timelineWrapper.offsetWidth;
    void konsultasiSection.offsetWidth;

    if (label === "Beranda") {
      timelineWrapper.classList.add("highlighted");
      konsultasiSection.classList.add("highlighted");
    } else if (label === "Feed") {
      timelineWrapper.classList.add("highlighted");
    } else if (label === "Tanya Ahli Gizi" || label === "Konseling Kesehatan") {
      konsultasiSection.classList.add("highlighted");
    }
  });
});

function goBack() {
  window.history.back();
}
