import { getCoins } from "./src/API.js";
import { render } from "./src/render.js";
const firstBloc = document.querySelector(".crypto-dashboard");
const secondBloc = document.querySelector(".crypto-details");

async function init() {
  try {
    const data = await getCoins();
    render(data);
    const lignes = document.querySelectorAll(".crypto");
    let id;

    lignes.forEach((ligne) => {
      ligne.addEventListener("click", () => {
        id = ligne.dataset.id;
        console.log(id);

        firstBloc.classList.add("disabled");
        secondBloc.classList.remove("disabled");
      });
    });
  } catch (err) {
    console.log("Erreur API : " + err);
  }
}

init();

setInterval(() => {
  if (document.visibilityState === "visible") {
    init();
  }
}, 30000);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    init();
  }
});
