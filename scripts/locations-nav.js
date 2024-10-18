import { toFeaturedLocations } from "./locations.js";
import { markForLocations } from "./locations.js";

//Search locations by name
export async function locationByName() {
  const locationName = document.querySelector("#location-name").value.toLowerCase().trim();

  if(locationName.value !== "") {
   const searchResult = await searchLocation(locationName);
   const locationParent = document.querySelector(".location");
   locationParent.innerHTML = "";

   searchResult.map((data) => {
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
  }
  const locationBtn = document.querySelectorAll(".location__btn");
  toFeaturedLocations(locationBtn);
  markForLocations(locationBtn);
}

async function searchLocation(location) {
  const api = `https://rickandmortyapi.com/api/location/?name=${location}`;
  try {
    const response = await fetch(api);

    if(!response.ok) {
      throw new Error("Not found");
    }
    const errorText = document.querySelector(".location-name");
    errorText.innerText = "Поиск по названию";
    errorText.style.cssText = "color: black;"
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    console.log(error)
    const errorText = document.querySelector(".location-name");
    errorText.innerText = error;
    errorText.style.cssText = "color: red;"
  }
}

//Search locations by type 

export async function searchByType () {
  const locationType = document.querySelector("#location-type").value.toLowerCase().trim();

  if(locationType.value !== "") {
    const result = await searchType(locationType);
    const locationParent = document.querySelector(".location");
   locationParent.innerHTML = "";

   result.map((data) => {
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
  }
  const locationBtn = document.querySelectorAll(".location__btn");
  toFeaturedLocations(locationBtn);
  markForLocations(locationBtn);
}

 async function searchType(location) {
  const api = `https://rickandmortyapi.com/api/location/?type=${location}`;
  try {
    const response = await fetch(api);

    if(!response.ok) {
      throw new Error("Not found");
    }
    const typeError = document.querySelector(".location-type");
    typeError.innerText = "Поиск по типу";
    typeError.style.cssText = "color: black;"
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    console.log(error)
    const typeError = document.querySelector(".location-type");
    typeError.innerText = error;
    typeError.style.cssText = "color: red;"
  }
}

//Search locations by dimensions
export async function searchByDimension() {
  const locationDimension = document.querySelector("#location-dimension").value.toLowerCase().trim();

  if(locationDimension.value !== null) {
    const result = await searchDimension(locationDimension);
    const locationParent = document.querySelector(".location");
   locationParent.innerHTML = "";

   result.map((data) => {
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
  }
  const locationBtn = document.querySelectorAll(".location__btn");
  toFeaturedLocations(locationBtn);
  markForLocations(locationBtn);
}

async function searchDimension(dimension) {
  const api = `https://rickandmortyapi.com/api/location/?dimension=${dimension}`;
  try {
    const response = await fetch(api);

    if(!response.ok) {
      throw new Error("Not found");
    }
    const dimError = document.querySelector(".location-dimension");
    dimError.innerText = "Поиск по измерению";
    dimError.style.cssText = "color: black;"
    const data = await response.json();
    const result = data.results;
    return result;
  }
  catch(error) {
    console.log(error)
    const dimError = document.querySelector(".location-dimension");
    dimError.innerText = error;
    dimError.style.cssText = "color: red;"
  }
}