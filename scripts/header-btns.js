import { createAccount } from "./registration.js";
import { showStorage } from "./display-storage.js";
import { exit } from "./exit-btn.js"; 
import { enterToAccount } from "./enterToAccount.js";


  const registr = document.querySelector(".registr");
  registr.addEventListener("click", showRegistrPopup);

  function showRegistrPopup () {
    const registrPopup = document.querySelector(".registr-popup");
    registrPopup.classList.toggle("registr-popup--show");
  }

  const headerBtn = document.querySelector(".header-btn");
  headerBtn.addEventListener("click", showEnterPopup);

 export function showEnterPopup () {
    const enterPopup = document.querySelector(".enter-popup");
    enterPopup.classList.toggle("enter-popup--show");
  }

  // Добавление данных из форм в localStorage

  const form = document.querySelector("#registr-form");
form.addEventListener("submit", createAccount);

//  Экранизация данных из localStorage

  showStorage();

  // Формирование кнопки выхода из аккаунта (Удаление или блокировка данных из localStorage)

  exit();


 // Вход в аккаунт

 const enterForm = document.querySelector(".enter-form");
 enterForm.addEventListener("submit", enterToAccount);