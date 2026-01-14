import { getCoins } from "./src/API.js";
import { render } from "./src/render.js";

async function init() {
  try {
    const data = await getCoins();
    console.log("Données reçues, mise à jour du tableau...");
    render(data);
    console.log("Données affichées !!!");
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
