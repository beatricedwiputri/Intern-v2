const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  // Only run scroll spy on pages with in-page sections (like index.html)
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage && currentPage !== "index.html" && currentPage !== "") return;
  let current = "";
  let scrollY = window.scrollY;
  let checkpoint = scrollY + window.innerHeight / 2; // midpoint of viewport

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (checkpoint >= sectionTop && checkpoint < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.createElement("button");
  navToggle.classList.add("nav-toggle");
  navToggle.textContent = "☰"; // hamburger symbol
  document.querySelector(".navbar .container").appendChild(navToggle);

  const navMenu = document.querySelector(".nav ul");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // ----- Keep Active Nav Based on Current Page -----
  const currentPage = window.location.pathname.split("/").pop(); // e.g., 'news.html'

  navLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // match full page links (news.html, blog.html, etc.)
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});


// Close mobile nav when a link is clicked
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    const navMenu = document.querySelector(".nav ul");
    navMenu.classList.remove("active"); // hide menu
  });
});





