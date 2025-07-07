document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.querySelector(".account-icon");
  const sidebar = document.getElementById("profileSidebar");

  if (profileIcon && sidebar) {
    profileIcon.addEventListener("click", (e) => {
      e.preventDefault();
      sidebar.classList.toggle("show");
    });
    document.addEventListener("click", function (event) {
      const sidebar = document.getElementById("profileSidebar");
      const profileIcon = document.querySelector(".account-icon");

      if (
        !sidebar.contains(event.target) &&
        !profileIcon.contains(event.target)
      ) {
        sidebar.classList.remove("show");
      }
    });
  }
});
