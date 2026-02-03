import { getCoins } from "./src/API.js";
import { render } from "./src/render.js";
import { loadDetails } from "./src/details.js";
import { initTools, getCurrentTool } from "./src/tools.js";
const firstBloc = document.querySelector(".crypto-dashboard");
const secondBloc = document.querySelector(".crypto-details");
const btn_exit = document.getElementById("exit");

async function init() {
  try {
    const data = await getCoins();
    render(data);

    const lignes = document.querySelectorAll(".crypto");

    lignes.forEach((ligne) => {
      ligne.addEventListener("click", () => {
        // À garder impérativement dans cet ordre
        firstBloc.classList.add("disabled");
        secondBloc.classList.remove("disabled");

        const id = ligne.dataset.id;

        const selectedCoin = data.find((coin) => coin.id === id);

        loadDetails({
          id: selectedCoin.id,
          name: selectedCoin.name,
          image: selectedCoin.image,
        });
      });
    });
  } catch (err) {
    console.log("Erreur API : " + err);
  }
}

init();
initTools();

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

btn_exit.addEventListener("click", (e) => {
  e.preventDefault();
  firstBloc.classList.remove("disabled");
  secondBloc.classList.add("disabled");
});
