

//Tab
const headerItem = document.querySelectorAll(".header-item");
const mainContent = document.querySelectorAll(".main-content");

headerItem.forEach((item) => {
  item.addEventListener("click", (event) => {
   const box = document.querySelector(".box");
   if(box) {
    box.classList.remove("box");
    event.target.classList.add("box");
   }else {
    event.target.classList.add("box");
   }

    mainContent.forEach((main) => {
      main.classList.add("content-hidden");
    })

    const content = document.querySelector("#" + item.dataset.tab);
    content.classList.remove("content-hidden");
  })
})

const characterBtn = document.querySelectorAll(".character-btn");
if(characterBtn) {
  characterBtn.forEach((btn) => {
    btn.style.cssText = "background-color: red; color: #fff;"
  })
}

//Get Saved Locations

 async function getSavedLocations() {
  if(localStorage.getItem("user-active") !== null) {
    const result = await checkSavedLocations();

    if(result) {
      const locationParent = document.querySelector(".location-parent");

      result.map((data) => {
        const div = document.createElement("div");
        div.classList.add("location__card");

        div.innerHTML = `
            <div class="location__title">${data.name}</div>
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
                <strong class="location__been-count">${data.residents}</strong>
              </div>
  
              <button id=${data.id} class="location__btn loc-btn favorite-btn">✖</button>
            </div>
        `
        locationParent.append(div);
      })
    }
  }

  const locBtn = document.querySelectorAll(".loc-btn");
  locBtn.forEach((btn) => {
    btn.addEventListener("click", removeLocation);
  })
}

function removeLocation(event) {
 const getId = Number(event.target.getAttribute("id"));
 
 const array = JSON.parse(localStorage.getItem("locations"));
 array.forEach((el, i) => {
   if(el.id === getId) {
     array.splice(i, 1);
    }
    localStorage.setItem("locations", JSON.stringify(array));
    event.target.parentNode.parentNode.remove();
 })

}

getSavedLocations();

async function checkSavedLocations() {
  if(localStorage.getItem("locations") !== null) {
    const result = JSON.parse(localStorage.getItem("locations"));
    return result;
  }
}

//Get saved characters
async function getSavedCharacters() {
  if(localStorage.getItem("user-active") !== null) {
    const result = await checkSavedCharacters();
    
    if(result) {
      const parent = document.querySelector(".row");
      result.map((hero) => {
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
                <button id=${hero.id} class="card-btn-2 hidden character-btn">✖</button>
              </div>
              </div>
              `
              parent.append(div);
      })
    }
  }

  const characterBtn = document.querySelectorAll(".character-btn");

  characterBtn.forEach((btn) => {
  btn.style.cssText = "background-color: red;"

    btn.addEventListener("click", removeCharacter);
  })
}
getSavedCharacters();


function removeCharacter(event) {
  const getId = Number(event.target.getAttribute("id"));
  
  const array = JSON.parse(localStorage.getItem("character"));
  array.forEach((el, i) => {
    if(el.id === getId) {
      array.splice(i, 1);
     }
     localStorage.setItem("character", JSON.stringify(array));
     event.target.parentNode.parentNode.parentNode.remove();
  })
 
 }
 

async function checkSavedCharacters() {
  if(localStorage.getItem("character") !== null) {
    const result = await JSON.parse(localStorage.getItem("character"));
    return result;
  }
}


//Get saved episodes;
async function getSavedEpisodes() {
  if(localStorage.getItem("user-active") !== null) {
    const result = await checkSavedEpisodes();

    if(result) {
      const wrapper = document.querySelector(".wrapper");

      result.map((hero) => {
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
                  <button id=${hero.id} class="episodes-main__btn episode-btn">
                    ✖
                  </button><br>
                  <strong id=${hero.id} class="episodes-main__strong-leed">Персонажи, учавствующие в эпизоде:</strong>
                  <p class="episodes-main__leed"></p>
                </div>
                `
                wrapper.append(div);
      })
    }
  }

  const episodeBtn = document.querySelectorAll(".episode-btn");
  episodeBtn.forEach((btn) => {
  btn.style.cssText = "background-color: red; color: #fff";
  btn.innerText = "Удалить"

    btn.addEventListener("click", removeEpisode);
  })
}

getSavedEpisodes();


function removeEpisode(event) {
  const getId = Number(event.target.getAttribute("id"));
  
  const array = JSON.parse(localStorage.getItem("episodes"));
  array.forEach((el, i) => {
    if(el.id === getId) {
      array.splice(i, 1);
     }
     localStorage.setItem("episodes", JSON.stringify(array));
     event.target.parentNode.parentNode.remove();
  })
 
 }

async function checkSavedEpisodes() {
  if(localStorage.getItem("episodes") !== null) {
    const response = JSON.parse(localStorage.getItem("episodes"));
    return response;
  }
}