export async function getData (page) {
  const api = `https://rickandmortyapi.com/api/character/?page=${page}`;
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("not found");
    }
    const data = await response.json();
    const results = data.results;
    results.map((arr) => {
      displayData(arr);
    })
  }
  catch(error) {
    console.log(error);
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
  
getData();

export function displayData (hero) {
  const characterInner = document.querySelector(".character__inner");
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
};

// Character status-indicator

export function statusIndicator (character) {
  character.forEach((status) => {
    if(status.innerText === "Alive") {
      status.classList.add("alive")
    }else if(status.innerText === "Dead") {
      status.classList.add("dead")
    }else if(status.innerText === "unknown") {
      status.classList.add("unknown")
    }
  })
}

//Save characters to localStorage like the Featured

class LocalStore {
  constructor() {
    this.key = "character";
  }

  getCharacter() {
    let charactersArr;

    if(localStorage.getItem(this.key) !== null) {
      charactersArr = JSON.parse(localStorage.getItem(this.key));
    }else {
      charactersArr = [];
    }
    return charactersArr;
  }

   addCharacter(data) {
    let characters = this.getCharacter();
    let arr = {
      id: data.id,
      name: data.name,
      image: data.image,
      species: data.species,
      status: data.status,
      origin: data.origin.name,
      location: data.location.name,
     }

      characters.push(arr);
    localStorage.setItem(this.key, JSON.stringify(characters));
  }
}

const store = new LocalStore();

export async function characterFeatured (event) {

  if(localStorage.getItem("user-active") !== null) {
    markToBtn(event);
  const getId = event.target.getAttribute("id");
  const intoNum = Number(getId);
  const result = await characterId(intoNum);
  store.addCharacter(result);
  }else {
    alert("Пройдите регистрацию");
  }
}

async function characterId (id) {
  const api = `https://rickandmortyapi.com/api/character/${id}`
  try {
    const response = await fetch(api);
    if(!response.ok) {
      throw new Error("not found");
    }
    return await response.json();
  }
  catch(error) {
    console.log(error);
  }
} 

// Button mark for added characters

async function markToBtn (btn) {
if(btn) {
  const attr = btn.target.getAttribute("class");
  const obj = Object(attr);

  if(obj.includes("card-btn-2")) {
    btn.target.style.cssText = "border: none; background-color: #fff; color: #00CA51; font-size: 25px; font-weight: 700; cursor: default";
    btn.target.innerText = "✔"
    btn.target.setAttribute("disabled", "");
    
  }else if(obj.includes("card-btn")) {
    btn.target.style.cssText = "border: none; background-color: #fff; color: #00CA51; font-family: Montserrat; font-size: 15px; font-weight: 700; cursor: default";
    btn.target.setAttribute("disabled", "");
    btn.target.innerText = "✔ В избранном"
  }
}
}


export async function addedBtn1 (btn) {
  const store = await checkLocal();
  
  if(store) {
    btn.forEach((b) => {
      const intoNum = Number(b.getAttribute("id"));
      const arr = store.find(id => id.id === intoNum);
      if(arr) {
      b.style.cssText = "border: none; background-color: #fff; color: #00CA51; font-family: Montserrat; font-size: 15px; font-weight: 700; cursor: none";
      b.setAttribute("disabled", "");
      b.innerText = "✔ В избранном"
     }
    })
  }
}

export async function addedBtn2 (btn) {
  const store = await checkLocal();

  if(store) {
    btn.forEach((b) => {
      const intoNum = Number(b.getAttribute("id"));
      const arr = store.find(id => id.id === intoNum);
     if(arr) {
      b.style.cssText = "border: none; background-color: #fff; color: #00CA51; font-size: 25px; font-weight: 700; cursor: none";
      b.innerText = "✔"
      b.setAttribute("disabled", "");
     }
    })
  }
}


async function checkLocal () {
  if(localStorage.getItem("user-active") !== null) {
    const local = JSON.parse(localStorage.getItem("character"));
    return local;
  }
}