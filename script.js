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

  if (current === "collaboration-map") current = "about";
  if (current === "stats") current = "about";

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

    if (currentPage.startsWith("team-godwin.html") && href.includes("team")) {
      link.classList.add("active");
    }

    if (currentPage.startsWith("service-NTDs.html") && href.includes("services")) {
      link.classList.add("active");
    }
     if (currentPage.startsWith("service-PA.html") && href.includes("services")) {
      link.classList.add("active");
    }
     if (currentPage.startsWith("service-PHR.html") && href.includes("services")) {
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


// Ganti URL ini dengan Apps Script Web App URL kamu
const scriptURL = "https://script.google.com/macros/s/AKfycbzBJY5UCwiBwZ0dXWG8VIstrmLzITpuMH_fVXwiEo_UbrEJQYpepIQGZCbfQk0hiHQ_/exec";


// ===========================
// CONTACT FORM → GOOGLE SHEETS
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact form");

  if (!contactForm) return; // safety check

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent.");
        contactForm.reset();
      } else {
        alert("Failed to send. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  });
});

// ===========================
// MEETING REQUEST FORM → GOOGLE SHEETS (Schedule tab)
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const scheduleForm = document.querySelector(".schedule-form");
  if (!scheduleForm) return; // kalau bukan di halaman schedule, skip

  scheduleForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(scheduleForm);

    // kasih penanda ke Apps Script bahwa ini form schedule
    formData.append("formType", "schedule");

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      alert("Thank you! Your meeting request has been sent.");
      scheduleForm.reset();
      // optionally reset time dropdown:
      const timeSelect = document.getElementById("time");
      if (timeSelect) {
        timeSelect.innerHTML = "<option value=''>Select a weekday first</option>";
        timeSelect.disabled = true;
      }
    } catch (error) {
      console.error("Schedule form submit error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});


// ===========================
// INTAKE FORM → GOOGLE SHEETS (Intake tab)
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const intakeForm = document.querySelector(".intake-form");
  if (!intakeForm) return; // kalau bukan di halaman intake, skip

  intakeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(intakeForm);

    // kasih penanda ke Apps Script bahwa ini form intake
    formData.append("formType", "intake");

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      alert("Thank you! Your intake form has been submitted.");
      intakeForm.reset();
    } catch (error) {
      console.error("Intake form submit error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});



