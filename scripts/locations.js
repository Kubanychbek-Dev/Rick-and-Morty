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
  const locationCard = document.querySelectorAll(".location__card")
  locationCard.forEach((element) => {
    element.remove();
  })
  getLocations(currentValue);
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

// Get locations data

async function getLocations (page) {
  const api = `https://rickandmortyapi.com/api/location/?page=${page}`;

  try {
    const response = await fetch(api);

    if(!response.ok) {
      throw new Error("Not found");
    }
    const data = await response.json();
    const result = data.results;
    displayLocations(result);
  }
  catch(error) {
    console.log(error);
  }
}

getLocations();

function displayLocations (locate)  {
  const locationParent = document.querySelector(".location")
  
  locate.map((data) => {
    const div = document.createElement("div");
    div.classList.add("location__card");

    div.innerHTML = `
       <h2 class="location__title">${data.name}</h2>
            <div class="location__inner">
  
              <div class="left">
                <p class="location__type">Тип:</p>
                <strong class="location__strong">${data.type}</strong>
                <p class="location__type">Измерение::</p>
                <strong class="location__strong">${data.dimension}</strong>
              </div>
  
              <div class="right">
                <p class="location__leed">
                  Количество персонажей, которые в последний раз были замечены здесь:
                </p>
                <strong class="location__been-count">${data.residents.length}</strong>
              </div>
  
              <button id=${data.id} class="location__btn loc-btn">+</button>
            </div>
    `
    locationParent.append(div);
  })

  const locationBtn = document.querySelectorAll(".location__btn");
  locationBtn.forEach((btn) => {
    btn.addEventListener("click", toFeaturedLocations);
  })
  locationBtn.forEach((btn) => {
    markForLocations(btn);
  })
}

//Save locations to localStore
export function toFeaturedLocations(event) {

  if(localStorage.getItem("user-active") !== null) {
    const idValue = event.target.getAttribute("id");
      const intoNum = Number(idValue);
      getLocationId(intoNum);
  }else {
    alert("Пройдите регистрацию");
  }
}

class Store {
  constructor() {
    this.key = "locations";
  }

  getLocations() {
    let store;

    if(localStorage.getItem(this.key) !== null) {
      store = JSON.parse(localStorage.getItem(this.key));
    }else {
      store = [];
    }
    return store;
  }

  addLocations(location) {
   const locations = this.getLocations();
    location = {
    id: location.id,
    name: location.name,
    type: location.type,
    dimension: location.dimension,
    residents: location.residents.length
   }

   locations.push(location);
   localStorage.setItem(this.key, JSON.stringify(locations));
  }
}

const stores = new Store();

async function getLocationId (id) {
  const api =`https://rickandmortyapi.com/api/location/${id}`;
  try {
    const response = await fetch(api);

    if(!response.ok) {
      throw new Error("Not found");
    }
    const data = await response.json(); 
    stores.addLocations(data);
  }
  catch(error) {
    console.log(error);
  }
}

//Button mark for added characters
export async function markForLocations(btn) {

  if(localStorage.getItem("user-active") !== null) {
    btn.addEventListener("click", (event) => {
      event.target.style.cssText = "background-color: green; color: #fff; cursor: default;";
      event.target.innerText = "✔";
      event.target.setAttribute("disabled", "");
    })

    const checkResult = await checkStores();
    if(checkResult) {
        const getId = btn.getAttribute("id");
        const intoNum = Number(getId);
        const finding = checkResult.find(id => id.id === intoNum);
  
        if(finding) {
          btn.style.cssText = "background-color: green; color: #fff; cursor: default;";
          btn.innerText = "✔";
          btn.setAttribute("disabled", "");
        }
      
    }
  }
}

async function checkStores () {
  let store;
  if(localStorage.getItem("locations") !== null) {
    store = JSON.parse(localStorage.getItem("locations"));
  }
  return store;
}

//Search locations by name
import { locationByName } from "./locations-nav.js";
const locationName = document.querySelector("#location-name");
locationName.addEventListener("input", locationByName);

//Search locations by type 
import { searchByType } from "./locations-nav.js";
const locationType = document.querySelector("#location-type");
locationType.addEventListener("input", searchByType);

//Search locations by dimensions
import { searchByDimension } from "./locations-nav.js";
const locationDimension = document.querySelector("#location-dimension");
locationDimension.addEventListener("input", searchByDimension);