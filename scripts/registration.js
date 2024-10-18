export function createAccount (e) {
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const userLogin = document.querySelector("#user-login").value.trim();
  const userName = document.querySelector("#user-name").value.trim();
  const lastName = document.querySelector("#last-name").value.trim();
  const userPassword = document.querySelector("#user-password").value.trim();
  const confirmPassword = document.querySelector("#confirm-password").value.trim();

  const key = "user-active";

  if(userPassword === confirmPassword) {
    const arr = [
      {
        email: email.toLowerCase(),
        login: userLogin.toLowerCase(),
        name: userName[0].toUpperCase() + userName.slice(1).toLowerCase(),
        lastName: lastName[0].toUpperCase() + lastName.slice(1).toLowerCase(),
        password: userPassword,
        confirm: confirmPassword
      }
    ];

    localStorage.setItem(key, JSON.stringify(arr));
    location.reload();
  }else {
    alert("Повтор пароля: обязательное, должен совпадать с предыдущим");
  }
}