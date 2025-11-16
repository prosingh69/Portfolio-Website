// Wait for the DOM content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000, // Animation kitni der chalegi (in ms). Increased for smoother feel.
    once: false, // Animation scroll down/up par repeat ho
    offset: 120, // Kitna scroll karne par trigger ho (in px). Adjusted for better timing.
    mirror: true, // Animation reverse ho jab scroll up karein
    easing: "ease-in-out", // Animation ki timing function
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
    // Start the typing effect
    typeEffect();
  }
}); // DOMContentLoaded yahan band hota hai

// 3. Mouse Move Gradient Effect (Pehle se tha)
document.addEventListener("mousemove", function (e) {
  document.body.style.setProperty("--mouse-x", e.clientX + "px");
  document.body.style.setProperty("--mouse-y", e.clientY + "px");
});

// 4. Lenis Smooth Scroll & Progress Bar
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
