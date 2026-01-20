import { getCoins } from "./src/API.js";
import { getMarketChart } from "./src/API.js";
import { render } from "./src/render.js";
import { loadDetails } from "./src/details.js";
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
        // À garder impérativement dans cet ordre
        firstBloc.classList.add("disabled");
        secondBloc.classList.remove("disabled");

        id = ligne.dataset.id;
        loadDetails(id);
        getMarketChart(id, 1);
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
