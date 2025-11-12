// Wait for the DOM content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the span element by its ID
  const typingTextElement = document.getElementById("typing-text");

  // The list of words you want to cycle through
  const wordsToType = [
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Youtuber",
    "Editor",
  ];

  // Initialize variables
  let wordIndex = 0; // Current word index
  let charIndex = 0; // Current character index in the word
  let isDeleting = false; // State to check if we are deleting
  let typeSpeed = 150; // Speed of typing
  let deleteSpeed = 100; // Speed of deleting
  let pauseTime = 2000; // Pause time at the end of a word

  function typeEffect() {
    // Get the current word from the array
    const currentWord = wordsToType[wordIndex];

    // Set a dynamic timeout speed
    let currentSpeed = typeSpeed;

    if (isDeleting) {
      // If we are deleting, set speed to deleteSpeed
      currentSpeed = deleteSpeed;

      // Remove one character
      typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // If we are typing, set speed to typeSpeed
      currentSpeed = typeSpeed;

      // Add one character
      typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    // --- Check for state changes ---

    // 1. If NOT deleting and word is fully typed
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of the word
      currentSpeed = pauseTime;
      // Switch to deleting state
      isDeleting = true;
    }

    // 2. If deleting and word is fully deleted
    else if (isDeleting && charIndex === 0) {
      // Switch to typing state
      isDeleting = false;
      // Move to the next word (loop back to 0 if at the end)
      wordIndex = (wordIndex + 1) % wordsToType.length;
    }

    // Call the function again after the calculated speed
    setTimeout(typeEffect, currentSpeed);
  }

  // Start the typing effect
  typeEffect();
});
