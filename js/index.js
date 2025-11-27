"use strict";
let currentFishSound = null; // holder styr på den aktive fiskelyd
let selectedFishId = null;

// DOM Elementer
const getCrab = document.getElementById("crab");
const getNemoFish = document.getElementById("nemo");
const getPufferFish = document.getElementById("pufferfish");
const getShark = document.getElementById("shark");
const getStingRay = document.getElementById("stingray");
const getTurtle = document.getElementById("turtle");
const getSeaweed = document.getElementById("seaweed");
const getDory = document.getElementById("dory");

// Opretter et lyd-objekt og tildeler source til den specifikke lydfil i mappen "sound"
const soundCrab = new Audio();
soundCrab.src = "sound/krabbe-new.mp3";

const soundNemo = new Audio();
soundNemo.src = "sound/nemo-new.mp3";

const soundPuffer = new Audio();
soundPuffer.src = "sound/pufferfisk-new.mp3";

const soundShark = new Audio();
soundShark.src = "sound/hvidhaj-new.mp3";

const soundStingray = new Audio();
soundStingray.src = "sound/rokke-new.mp3";

const soundTurtle = new Audio();
soundTurtle.src = "sound/skilpadde-new.mp3";

const soundDory = new Audio();
soundDory.src = "sound/dory.mp3";

//Dataobjekt med information om hver fisk
const fishInfo = {
  crab: {
    title: "KRABBE",
    text: "“Hej, jeg er en krabbe—jeg går måske sidelæns, men jeg har retning i livet! Vil du spille med mig?”",
  },
  nemo: {
    title: "KLOVNFISK",
    text: "“Hej! Jeg er en klovnfisk, måske du kender mig som Nemo? Jeg farer tit vild, men altid med stil! Vil du spille med mig?”",
  },
  pufferfish: {
    title: "PUFFERFISK",
    text: "“Hej! Jeg er en lille puffer fisk—jeg puster mig kun op, hvis du driller! Vil du spille med mig?”",
  },
  shark: {
    title: "HVIDHAJ",
    text: "“Hej, jeg er en haj—jeg lover kun at bide i snacks, ikke venner! Vil du spille med mig?”",
  },
  stingray: {
    title: "ROKKE",
    text: "“Hej! Jeg er en rokke—jeg svæver rundt som havets flyvende tæppe! Vil du spille med mig?”",
  },
  turtle: {
    title: "SKILPADDE",
    text: "“Hej! Jeg er en langsom, men supersej skildpadde—jeg når måske frem i morgen! Vil du spille med mig?”",
  },
  seaweed: {
    title: "TANG",
    text: "”Hej! Jeg er en tang. Jeg vokser i vandet og mange fisk bor ved mig. Jeg kan vokse hurtigt og jeg kan både være grøn, brun og rød. Mennesker kan spise mig! Måske har du smagt mig i sushi?”",
  },
  dory: {
    title: "BLÅ TANG",
    text: "Hej! Jeg er en blå tang, måske du kender mig som Dory? Jeg glemmer alt—men aldrig at have det sjovt! Vil du spille med mig?",
  },
};

// Funktion: vis popup med HTML-indhold
function showFishPopup(html) {
  const popup = document.getElementById("fish-popup");
  if (!popup) return;
  popup.querySelector(".popupBody").innerHTML = html;
  popup.classList.add("is-visible");
}

// Funktion: skjul popup
function hideFishPopup() {
  const popup = document.getElementById("fish-popup");
  if (!popup) return;
  popup.classList.remove("is-visible");
  popup.setAttribute("aria-hidden", "true");
  // Stop lyd, hvis en spiller
  if (currentFishSound) {
    currentFishSound.pause();
    currentFishSound.currentTime = 0;
  }
}

// Luk-knap
const closeBtn = document.querySelector(".closeBtn");
if (closeBtn) closeBtn.addEventListener("click", hideFishPopup);

// Binder click-handlere til alle fisk ved at bruge deres id'er
// Når der klikkes, hentes teksten fra fishInfo og sendes til showFishPopup
[
  "crab",
  "nemo",
  "pufferfish",
  "shark",
  "stingray",
  "turtle",
  "seaweed",
  "dory",
].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", () => {
    selectedFishId = id;
    const info = fishInfo[id];
    if (!info) return;
    // Vis popup
    showFishPopup(`<strong>${info.title}</strong><p>${info.text}</p>`);
    // Stop evt. tidligere lyd
    if (currentFishSound) {
      currentFishSound.pause();
      currentFishSound.currentTime = 0;
    }
    switch (id) {
      case "crab":
        currentFishSound = new Audio("sound/krabbe-new.mp3");
        break;
      case "nemo":
        currentFishSound = new Audio("sound/nemo-new.mp3");
        break;
      case "pufferfish":
        currentFishSound = new Audio("sound/pufferfisk-new.mp3");
        break;
      case "shark":
        currentFishSound = new Audio("sound/hvidhaj-new.mp3");
        break;
      case "stingray":
        currentFishSound = new Audio("sound/rokke-new.mp3");
        break;
      case "turtle":
        currentFishSound = new Audio("sound/skilpadde-new.mp3");
        break;
      case "seaweed":
        currentFishSound = new Audio("sound/tang-new.mp3");
        break;
      case "dory":
        currentFishSound = new Audio("sound/dory.mp3");
        break;
    }
    // Afspil lyd
    currentFishSound.play();
    
  });
});

// Add listener to "Play with me" button to pass selected fish
const playButton = document.querySelector(".spilleknap");
if (playButton) {
  playButton.addEventListener("click", (e) => {
     e.preventDefault();
      if (!selectedFishId) {
          alert("Vælg venligst en fisk først!");
          return;
      }
       window.location.href = `game.html?fish=${selectedFishId}`;
        });
}