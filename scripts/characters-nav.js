import { characterFeatured } from "./get-characters.js";
import { statusIndicator } from "./get-characters.js";
import { addedBtn1 } from "./get-characters.js";
import { addedBtn2 } from "./get-characters.js";

export async function searchByName () {
  const characterName = document.querySelector("#character-name").value.toLowerCase().trim();

  if(characterName.value !== "") {
    const searchResult = await searchCharacter(characterName);
    const characterInner = document.querySelector(".character__inner");
    characterInner.innerHTML = "";
    searchResult.map((hero) => {
      const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
   <div class="card__img">
          <img class="character-img" src=${hero.image} alt="character">
        </div>
        <div class="card__inform">
          <div class="card__inform-inner">
            <div>
              <h2 class="character-name">${hero.name}</h2>
          <p class="race">
            <span>Раса:</span> <strong>${hero.species}</strong>
          </p>
          <p class="origin">
            <span>Место происхождения:</span> 
            <strong>
            ${hero.origin.name}</strong>
          </p>
          <p class="last-location">
            <span>Последняя локация:</span> 
            <strong>${hero.location.name}</strong>
          </p>
            </div>
            <div class="gender-episode">
              <p class="gender">
                <span>Пол:</span> <strong>${hero.gender}</strong>
              </p>
              <p class="episode">
                <span>Эпизоды:</span> <strong>1 - 41</strong>
              </p>
            </div>
          </div>
          <div class="card__btn-status">
            <p class="character-status" value=${hero.status}>${hero.status}</p>
            <button id=${hero.id} class="chose-btn card-btn">➕ Добавить в избранное</button>
            <button id=${hero.id} class="chose-btn card-btn-2 hidden">➕</button>
          </div>
        </div>
  `;
  characterInner.append(div);
    })
  }
  const choseBtn = document.querySelectorAll(".chose-btn");
 choseBtn.forEach((btns) => {
  btns.addEventListener("click", characterFeatured);
 })

 const cardBtn1 = document.querySelectorAll(".card-btn");
   addedBtn1(cardBtn1);

   const cardBtn2 = document.querySelectorAll(".card-btn-2");
   addedBtn2(cardBtn2);

   const characterStatus = document.querySelectorAll(".character-status");
   statusIndicator(characterStatus);
}

async function searchCharacter (name) {
  const api = `https://rickandmortyapi.com/api/character/?name=${name}`;
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Character not found")
    }
    const errorText = document.querySelector(".character-name");
    errorText.innerText = "Поиск по имени"
    errorText.style.cssText = "color: green;"
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    const errorText = document.querySelector(".character-name");
    errorText.innerText = error;
    errorText.style.cssText = "color: red;"
  }

}


//Search by race
export async function searchByRace () {
  const characterRace = document.querySelector("#character-race").value.toLowerCase().trim();

  if(characterRace.value !== "") {
    const race = await raceSearch(characterRace);
    const characterInner = document.querySelector(".character__inner");
  characterInner.innerHTML = "";
    race.map((hero) => {
      const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
   <div class="card__img">
          <img class="character-img" src=${hero.image} alt="character">
        </div>
        <div class="card__inform">
          <div class="card__inform-inner">
            <div>
              <h2 class="character-name">${hero.name}</h2>
          <p class="race">
            <span>Раса:</span> <strong>${hero.species}</strong>
          </p>
          <p class="origin">
            <span>Место происхождения:</span> 
            <strong>
            ${hero.origin.name}</strong>
          </p>
          <p class="last-location">
            <span>Последняя локация:</span> 
            <strong>${hero.location.name}</strong>
          </p>
            </div>
            <div class="gender-episode">
              <p class="gender">
                <span>Пол:</span> <strong>${hero.gender}</strong>
              </p>
              <p class="episode">
                <span>Эпизоды:</span> <strong>1 - 41</strong>
              </p>
            </div>
          </div>
          <div class="card__btn-status">
            <p class="character-status" value=${hero.status}>${hero.status}</p>
            <button id=${hero.id} class="chose-btn card-btn">➕ Добавить в избранное</button>
            <button id=${hero.id} class="chose-btn card-btn-2 hidden">➕</button>
          </div>
        </div>
  `;
  characterInner.append(div);
    })
  }

  const choseBtn = document.querySelectorAll(".chose-btn");
 choseBtn.forEach((btns) => {
  btns.addEventListener("click", characterFeatured);
 })

 const cardBtn1 = document.querySelectorAll(".card-btn");
   addedBtn1(cardBtn1);

   const cardBtn2 = document.querySelectorAll(".card-btn-2");
   addedBtn2(cardBtn2);

   const characterStatus = document.querySelectorAll(".character-status");
   statusIndicator(characterStatus);
}

async function raceSearch(race) {
  const api = `https://rickandmortyapi.com/api/character/?species=${race}`;

  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Character not found")
    }

    const errorText = document.querySelector(".character-race");
    errorText.innerText = "Поиск по расе"
    errorText.style.cssText = "color: green;"
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    const errorText = document.querySelector(".character-race");
    errorText.innerText = error;
    errorText.style.cssText = "color: red;"
  }
}

//Search by status

export async function searchByStatus () {
  const characterValue = document.querySelector("#character-status").value;
  const searchResult = await searchStatus(characterValue);
  const characterInner = document.querySelector(".character__inner");
  characterInner.innerHTML = "";

  searchResult.map((hero) => {
    const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
   <div class="card__img">
          <img class="character-img" src=${hero.image} alt="character">
        </div>
        <div class="card__inform">
          <div class="card__inform-inner">
            <div>
              <h2 class="character-name">${hero.name}</h2>
          <p class="race">
            <span>Раса:</span> <strong>${hero.species}</strong>
          </p>
          <p class="origin">
            <span>Место происхождения:</span> 
            <strong>
            ${hero.origin.name}</strong>
          </p>
          <p class="last-location">
            <span>Последняя локация:</span> 
            <strong>${hero.location.name}</strong>
          </p>
            </div>
            <div class="gender-episode">
              <p class="gender">
                <span>Пол:</span> <strong>${hero.gender}</strong>
              </p>
              <p class="episode">
                <span>Эпизоды:</span> <strong>1 - 41</strong>
              </p>
            </div>
          </div>
          <div class="card__btn-status">
            <p class="character-status" value=${hero.status}>${hero.status}</p>
            <button id=${hero.id} class="chose-btn card-btn">➕ Добавить в избранное</button>
            <button id=${hero.id} class="chose-btn card-btn-2 hidden">➕</button>
          </div>
        </div>
  `;
  characterInner.append(div);
  })

  const choseBtn = document.querySelectorAll(".chose-btn");
 choseBtn.forEach((btns) => {
  btns.addEventListener("click", characterFeatured);
 })

 const cardBtn1 = document.querySelectorAll(".card-btn");
   addedBtn1(cardBtn1);

   const cardBtn2 = document.querySelectorAll(".card-btn-2");
   addedBtn2(cardBtn2);

   const characterStatus = document.querySelectorAll(".character-status");
   statusIndicator(characterStatus);
}

async function searchStatus (status) {
  const api = `https://rickandmortyapi.com/api/character/?status=${status}`;

  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Character not found")
    }

    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    console.log(error);
  }
}