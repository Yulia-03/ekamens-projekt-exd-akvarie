"use strict";
const dodger = document.getElementById("dodger");

// Get the selected fish id from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedFishId = urlParams.get("fish");
if (selectedFishId) {
  dodger.style.backgroundImage = `url("img/${selectedFishId}.png")`;
}

// Game over sound
const gameoverSound = document.getElementById("gameoverSound");

function playGameoverSound() {
  gameoverSound.currentTime = 0; // Start fra begyndelsen
  gameoverSound.play();
}

// Winner sound
const winningSound = document.getElementById("winningSound");

function playWinningSound() {
  winningSound.play();
  showConfettiImage();
}

// Left dodger
function moveDodgerLeft() {
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers, 10);

  if (left > 0) {
    dodger.style.left = `${left - 40}px`;
  } else {
    // Game over
    playGameoverSound();
  }
}

// Right dodger
function moveDodgerRight() {
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers, 10);

  if (left < 1380) {
    dodger.style.left = `${left + 40}px`;
  } else {
    // Winner
    playWinningSound();
  }
}

// Up dodger
function moveDodgerUp() {
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers, 10);
  if (bottom < 750) {
    dodger.style.bottom = `${bottom + 40}px`;
  } else {
    // Game over
    playGameoverSound();
  }
}

// Down dodger
function moveDodgerDown() {
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers, 10);
  if (bottom > 0) {
    dodger.style.bottom = `${bottom - 40}px`;
  } else {
    // Game over
    playGameoverSound();
  }
}

// Movement sound
const movementSound = document.getElementById("movementSound");

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    moveDodgerLeft();
    movementSound.play();
    if (selectedFishId === "shark") {
      dodger.style.transform = "scaleX(-1)";
    } else {
      dodger.style.transform = "rotate(0deg)";
    }
  }

  if (e.key === "ArrowRight") {
    moveDodgerRight();
    movementSound.play();
    if (selectedFishId === "shark") {
      dodger.style.transform = "scaleX(1)";
    } else {
      dodger.style.transform = "rotate(0deg)";
    }
  }

  if (e.key === "ArrowUp") {
    moveDodgerUp();
    movementSound.play();
    dodger.style.transform = "rotate(270deg)";
  }
  if (e.key === "ArrowDown") {
    moveDodgerDown();
    movementSound.play();
    dodger.style.transform = "rotate(90deg)";
  }
});

function playSoundOnMovement() {
  movementSound.currentTime = 0;
}

// Vis et fuldt konfetti-billede som overlay
function showConfettiImage() {
  if (document.querySelector(".confetti-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "confetti-overlay";

  const img = document.createElement("img");
  img.src = "img/confetti.png";
  img.alt = "Confetti";

  overlay.appendChild(img);

  document.body.appendChild(overlay);
}
