export function enterToAccount (e) {
  e.preventDefault();
  const login = document.querySelector("#login").value.toLowerCase().trim();
  const password = document.querySelector("#password").value.trim();

  const localStore = JSON.parse(localStorage.getItem("user"));

  localStore.forEach(data => {
    if(login === data.login || login === data.email) {
      if(password === data.password) {
        const user = localStorage.getItem("user");
      localStorage.setItem("user-active", user);
      localStorage.removeItem("user");
      location.reload();
      }else {
        alert("Данные не совпадают");
      }
    }else {
      alert("Данные не совпадают");
    }
  });

}