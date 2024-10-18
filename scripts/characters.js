// flex-direction btn
const flexColumn = document.querySelector(".flex-column");
const flexRow = document.querySelector(".flex-row");

flexColumn.addEventListener("click", () => {
  const row = document.querySelector(".row");

  if(row) {
    document.querySelector(".row").classList.remove("row");
  }
});

flexRow.addEventListener("click", () => {
  const row = document.querySelector(".row");

  if(!row) {
    document.querySelector(".character__inner").classList.add("row");
  }
})

// flex-direction btn indicator
const btnIndicator = document.querySelectorAll("#btn-indicator");
btnIndicator.forEach((b) => {
  b.addEventListener("click", (event) => {
    document.querySelector(".btn-indicator").classList.remove("btn-indicator");
    event.target.classList.add("btn-indicator");
  })
})

// pagination
//link
const link = document.querySelectorAll(".link");

link.forEach(l => {
  l.addEventListener("click", pagination);
});

let currentValue = 1;
const valueOfFirstBtn = document.querySelector(".first-value");
const valueOfLastBtn = document.querySelector(".last-value");

 function pagination (event) {
  link.forEach(l => {
    l.classList.remove("active-link");
  });
  event.target.classList.add("active-link");
  currentValue = event.target.value;
  getData(currentValue);
  const card = document.querySelectorAll(".card");
  card.forEach((element) => {
    element.remove();
  })
}

//prev-btn
const prev = document.querySelector(".prev");
prev.addEventListener("click", () => {
if(currentValue > 1) {
  link.forEach(l => {
    l.classList.remove("active-link");
  });
  currentValue--;
  link[currentValue-1].classList.add("active-link");
}
})

//next-btn
const next = document.querySelector(".next");
next.addEventListener("click", () => {
if(currentValue < 5) {
  link.forEach(l => {
    l.classList.remove("active-link");
  });
  currentValue++;
  link[currentValue-1].classList.add("active-link");
}
})

//prev-pages-btn
const prevPagesBtn = document.querySelector(".prev-pages-btn");
 prevPagesBtn.addEventListener("click", prevPage);

function prevPage () {
  if(valueOfFirstBtn.value !== 1) {
    link.forEach(l => {
      l.classList.remove("active-link");
      l.value--;
      l.innerText--;
    });
  }
}

//next-pages-btn
const nextPagesBtn = document.querySelector(".next-pages-btn");
nextPagesBtn.addEventListener("click", () => {
  if(valueOfLastBtn.value !== 42) {
    link.forEach(l => {
      l.classList.remove("active-link");
      l.value++;
      l.innerText++;
    });
  }
});

// get API data
import { getData } from "./get-characters.js";

// Search characters by name
import { searchByName } from "./characters-nav.js";
const characterName = document.querySelector("#character-name");
characterName.addEventListener("input", searchByName);

//Search Characters by race
import { searchByRace } from "./characters-nav.js";
const characterRace = document.querySelector("#character-race");
characterRace.addEventListener("input", searchByRace);

//Search by status
import { searchByStatus } from "./characters-nav.js";
const character = document.querySelector("#character-status");
character.addEventListener("change", searchByStatus);