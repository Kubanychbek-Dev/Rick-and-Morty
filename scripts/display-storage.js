import { showEnterPopup } from "./header-btns.js";

export function showStorage () {
  const key = "user-active";
  const getArr = JSON.parse(localStorage.getItem(key));

  if(getArr) {
   document.querySelector(".registr").remove();
   document.querySelector(".favorite").classList.remove("favorite");
   document.querySelector(".header-span").classList.add("header-span--show");
   const headerBtn = document.querySelector(".header-btn");
   headerBtn.removeEventListener("click", showEnterPopup);
   headerBtn.innerText = "Выйти";
   headerBtn.classList.add("exit-btn");
   
   getArr.forEach(arr => {
    const firstName = arr.name;
    const lastName = arr.lastName.charAt(0);

    document.querySelector(".header-span--show").innerText = `${firstName} ${lastName}.`
   });

  }
}