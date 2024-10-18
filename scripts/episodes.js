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
  getEpisodes(currentValue);
  const episodesMainCard = document.querySelectorAll(".episodes-main__card")
  episodesMainCard.forEach((element) => {
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
if(currentValue < 3) {
  link.forEach(l => {
    l.classList.remove("active-link");
  });
  currentValue++;
  link[currentValue-1].classList.add("active-link");
}
})

//Get episodes API

async function getEpisodes(page) {
  const api = `https://rickandmortyapi.com/api/episode/?page=${page}`;
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Not found");
    }

    const data = await response.json();
    const result = data.results;
    displayEpisodes(result);
  }
  catch(error) {
    console.log(error);
  }
}

getEpisodes();

function displayEpisodes (url) {
const episodeParent = document.querySelector(".episodes-main__inner");
  url.forEach((hero)=> {
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

//Display have been characters in the episode

export async function getCharacterNames(event) {
  const getId = event.target.getAttribute("id");
  const intoNum = Number(getId);
  const characterUrl = await getUrls(intoNum);
  characterUrl.forEach((url) => {
    getNames(url, event);
  })
}


 async function getNames(num, event) {
  try {
    const response = await fetch(num);
    if(!response.ok) {
      throw new Error("Not found");
    }
    const data = await response.json();
    const result = data.name;
    const arr = new Array();
   arr.push(result)
   arr.map((arr) => {
    event.target.nextElementSibling.append(`${arr},  `);
   })
  }
  catch(error) {
    console.log(error);
  }
}

async function getUrls(url) {
  const api = `https://rickandmortyapi.com/api/episode/${url}`;

  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Not found");
    }
    const data = await response.json();
   const result = data.characters;
   return result;
    }
  catch(error) {
    console.log(error);
  }
}

// Save episodes to store
class Store {
  constructor() {
    this.key = "episodes";
  }

  getEpisodes() {
    let arr;
    if(localStorage.getItem(this.key) !== null) {
    arr = JSON.parse(localStorage.getItem(this.key));
    }else {
      arr = [];
    }
    return arr;
  }

  addEpisodes(data) {
    const episodes = this.getEpisodes();

    let episodeObj = {
      id: data.id,
      name: data.name,
      episode: data.episode,
      date: data.air_date
    };

    episodes.push(episodeObj);
    localStorage.setItem(this.key, JSON.stringify(episodes));
  }
}

const store = new Store();
export async function getFeaturedEpisode(event) {
  if(localStorage.getItem("user-active") !== null) {
    event.target.style.cssText = "background-color: #fff; color: #00CA51;";
    event.target.innerText = "✔  В избранном";
    const getId = event.target.getAttribute("id");
    const intoNum = Number(getId);
    const result = await getSingleEpisode(intoNum);
    store.addEpisodes(result);
  }else {
    alert("Пройдите регистрацию или войдите в аккаунт!");
  }
}

async function getSingleEpisode(id) {
  const api = `https://rickandmortyapi.com/api/episode/${id}`;
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("Not found");
    }
    const data = await response.json();
    return data;
  }
  catch(error) {
    console.log(error);
  }
}

//Mark btns

 export function markForBtns(btn) {
  const getId = btn.getAttribute("id");
  const intoNum = Number(getId);
  
  if(localStorage.getItem("episodes") !== null && localStorage.getItem("user-active") !== null) {
    addMarkForBtns(intoNum, btn);
  }
}

function addMarkForBtns(btnId, btn) {
  const store = JSON.parse(localStorage.getItem("episodes"));
  const uniq = store.find(id => id.id === btnId);

  if(uniq) {
   btn.style.cssText = "background-color: #fff; color: #00CA51; cursor: default;";
   btn.innerText = "✔ В избранном";
   btn.setAttribute("disabled", "");
  }
}

// //Search episode by name
import { searchEpisodeName } from "./episodes-nav.js";
const episodeName = document.querySelector("#episode-name");
episodeName.addEventListener("input", searchEpisodeName);

// //Search by episode code
import { searchEpisodeId } from "./episodes-nav.js";
const episodeId = document.querySelector("#episode-id");
episodeId.addEventListener("input", searchEpisodeId);