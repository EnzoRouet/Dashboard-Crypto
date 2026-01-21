import { API_KEY } from "./config.js";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getCoins() {
  try {
    const EndPoint = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d&x_cg_demo_api_key=${API_KEY}`;

    console.log("Appel API vers :", EndPoint);

    const response = await fetch(EndPoint);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Impossible de récupérer les cryptos :", error);
    return [];
  }
}

export async function getMarketChart(id, days) {
  try {
    const EndPoint = `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${API_KEY}`;

    console.log("Appel API vers :", EndPoint);
    const response = await fetch(EndPoint);

    const data = await response.json();
    const prices = data.prices;

    return prices;
  } catch (err) {
    console.error(
      "Impossible de récupérer l'historique de cette crypto :",
      err,
    );
    return [];
  }
}
