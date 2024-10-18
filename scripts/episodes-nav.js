import { getCharacterNames } from "./episodes.js";
import { getFeaturedEpisode } from "./episodes.js";
import { markForBtns } from "./episodes.js";

//Search episode by name
export async function searchEpisodeName() {
  const episodeName = document.querySelector("#episode-name").value.trim();

  if(episodeName.value !== "") {
    const searchResult = await getEpisode(episodeName);
    const episodeParent = document.querySelector(".episodes-main__inner");
    episodeParent.innerHTML = "";
    searchResult.map((hero) => {
      const div = document.createElement("div");
    div.classList.add("episodes-main__card");

    div.innerHTML = `
    <div class="left">
            <h2 class="episodes-main__title">${hero.name}</h2>
            <span class="episodes-main__span">Эпизод:</span><br>
            <strong class="episodes-main__strong">${hero.episode}</strong><br>
            <span class="episodes-main__span">Дата выхода:</span><br>
            <strong class="episodes-main__strong">${hero.air_date}</strong>
          </div>

          <div class="right">
            <button id=${hero.id} class="episodes-main__btn">
              ➕ Добавить в избранное
            </button><br>
            <strong id=${hero.id} class="episodes-main__strong-leed">Персонажи, учавствующие в эпизоде:</strong>
            <p class="episodes-main__leed"></p>
          </div>
    `
    episodeParent.append(div);
    })
  }
  const strongLeed = document.querySelectorAll(".episodes-main__strong-leed");
  strongLeed.forEach((strong) => {
    strong.addEventListener("click", getCharacterNames);
  })

  const episodesBtn = document.querySelectorAll(".episodes-main__btn");
  episodesBtn.forEach((btn) => {
    btn.addEventListener("click", getFeaturedEpisode);
  })

  episodesBtn.forEach((btn) => {
    markForBtns(btn);
  })
}

async function getEpisode(name) {
  const api = `https://rickandmortyapi.com/api/episode/?name=${name}`
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Not found");
    }
    const episodeError = document.querySelector(".episode-name");
    episodeError.style.cssText = "color: black;";
    episodeError.innerText = "Поиск по названию";
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    console.log(error);
    const episodeError = document.querySelector(".episode-name");
    episodeError.style.cssText = "color: red;";
    episodeError.innerText = error;
  }
}

//Search by episode code
export async function searchEpisodeId() {
  const episodeId = document.querySelector("#episode-id").value.toUpperCase().trim();

  if(episodeId.value !== "") {
    const searchResult = await getEpisodeId(episodeId);
    const episodeParent = document.querySelector(".episodes-main__inner");
    episodeParent.innerHTML = "";
    searchResult.map((hero) => {
      const div = document.createElement("div");
    div.classList.add("episodes-main__card");

    div.innerHTML = `
    <div class="left">
            <h2 class="episodes-main__title">${hero.name}</h2>
            <span class="episodes-main__span">Эпизод:</span><br>
            <strong class="episodes-main__strong">${hero.episode}</strong><br>
            <span class="episodes-main__span">Дата выхода:</span><br>
            <strong class="episodes-main__strong">${hero.air_date}</strong>
          </div>

          <div class="right">
            <button id=${hero.id} class="episodes-main__btn">
              ➕ Добавить в избранное
            </button><br>
            <strong id=${hero.id} class="episodes-main__strong-leed">Персонажи, учавствующие в эпизоде:</strong>
            <p class="episodes-main__leed"></p>
          </div>
    `
    episodeParent.append(div);
    })
  }
  const strongLeed = document.querySelectorAll(".episodes-main__strong-leed");
  strongLeed.forEach((strong) => {
    strong.addEventListener("click", getCharacterNames);
  })

  const episodesBtn = document.querySelectorAll(".episodes-main__btn");
  episodesBtn.forEach((btn) => {
    btn.addEventListener("click", getFeaturedEpisode);
  })

  episodesBtn.forEach((btn) => {
    markForBtns(btn);
  })
}

async function getEpisodeId(num) {
  const api = `https://rickandmortyapi.com/api/episode/?episode=${num}`
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Not found");
    }
    const episodeError = document.querySelector(".episode-id");
    episodeError.style.cssText = "color: black;";
    episodeError.innerText = "Поиск по номеру";
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    console.log(error);
    const episodeError = document.querySelector(".episode-id");
    episodeError.style.cssText = "color: red;";
    episodeError.innerText = error;
  }
}