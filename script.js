// Wait for the DOM content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000,
    once: false,
    offset: 120,
    mirror: true,
    easing: "ease-in-out",
  });

  // 2. Typing Text Effect
  const typingTextElement = document.getElementById("typing-text");
  if (typingTextElement) {
    const wordsToType = [
      "Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "Youtuber",
      "Editor",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;
    let deleteSpeed = 100;
    let pauseTime = 2000;

    function typeEffect() {
      const currentWord = wordsToType[wordIndex];
      let currentSpeed = typeSpeed;

      if (isDeleting) {
        currentSpeed = deleteSpeed;
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentSpeed = typeSpeed;
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length;
      }
      setTimeout(typeEffect, currentSpeed);
    }
    typeEffect();
  }

  // 3. Hamburger Menu Logic (Updated)
  const hamburgerIcon = document.querySelector(".nav-hamburger-icon");
  const navLinksContainer = document.querySelector(
    ".nav-mobile-menu-container"
  ); // Selector badla gaya
  const navIcon = hamburgerIcon.querySelector("i"); // Icon tag (<i>)

  hamburgerIcon.addEventListener("click", () => {
    // Menu ko toggle karein
    navLinksContainer.classList.toggle("active");

    // Icon ko (bars) se (X) karein
    if (navLinksContainer.classList.contains("active")) {
      navIcon.classList.remove("fa-bars");
      navIcon.classList.add("fa-xmark");
    } else {
      navIcon.classList.remove("fa-xmark");
      navIcon.classList.add("fa-bars");
    }
  });

  // 4. Jab kisi link par click ho, toh mobile menu band karein (Updated)
  const navLinks = document.querySelectorAll(
    ".nav-mobile-menu-container .nav-cont-links a"
  ); // Selector badla gaya
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        navIcon.classList.remove("fa-xmark");
        navIcon.classList.add("fa-bars");
      }
    });
  });

  // 5. Lenis Smooth Scroll & Progress Bar (MOVED INSIDE)
  const lenis = new Lenis();

  const progressBar = document.querySelector(".progress-bar");

  lenis.on("scroll", (e) => {
    if (progressBar) {
      const scrollPercent = e.progress * 100;
      progressBar.style.width = scrollPercent + "%";
    }
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}); // DOMContentLoaded ends here

// 6. Mouse Move Gradient Effect (STAYS OUTSIDE)
// This listener is safe to run immediately as it attaches to the 'document'
document.addEventListener("mousemove", function (e) {
  document.body.style.setProperty("--mouse-x", e.clientX + "px");
  document.body.style.setProperty("--mouse-y", e.clientY + "px");
});
