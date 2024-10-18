export function exit () {
  const exitBtn = document.querySelector(".exit-btn");

  if(exitBtn) {
    exitBtn.addEventListener("click", () => {
      document.querySelector(".clear-exit").classList.add("clear-exit--show");
    })

    document.querySelector(".exit").addEventListener("click", () => {
        const stor = localStorage.getItem("user-active");
        localStorage.setItem("user", stor);
        localStorage.removeItem("user-active");
        location.reload();
      })

      document.querySelector(".remove").addEventListener('click', () => {
        localStorage.removeItem("user-active");
        location.reload();
      })
  }
}