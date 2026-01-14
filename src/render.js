import { getCoins } from "./API.js";

// On commence par faire un tool de formattage de prix
export function formatPrice(number) {
  if (number > 1000000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumSignificantDigits: 3,
    }).format(number);
  } else if (number > 1) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(number);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 6,
    }).format(number);
  }
}

// Puis un tool de formattage de date et heure tout ca
export function formatDate() {
  const currentDate = new Date();
  return new Intl.DateTimeFormat("default", {
    timeStyle: "medium",
  }).format(currentDate);
}

export function render(datas) {
  const table = document.getElementById("crypto-table-body");
  table.innerHTML = ``;

  const htmlRows = datas.map((crypto) => {
    const css =
      crypto.price_change_percentage_7d_in_currency > 0 ? "green" : "red";
    const icon =
      crypto.price_change_percentage_7d_in_currency > 0
        ? `<i class="fa-solid fa-arrow-trend-up"></i>`
        : `<i class="fa-solid fa-arrow-trend-down"></i>`;

    return `
      <tr>
            <th scope="row"> <img src="${
              crypto.image
            }"/> <span class="crypto-name">${crypto.name}</span></th>
            <td>${formatPrice(crypto.current_price)}</td>
            <td class="${css}">${icon} <span>${crypto.price_change_percentage_7d_in_currency.toFixed(
      2
    )}%</span></td>
            <td>
                <div>${formatPrice(crypto.high_24h)}</div>
                <div class="low">${formatPrice(crypto.low_24h)}</div>
            </td>
            <td>${crypto.ath_change_percentage.toFixed(2)}%</td>
            <td>${formatPrice(crypto.market_cap)}</td>
      </tr>
    `;
  });

  table.innerHTML = htmlRows.join("");
  document.getElementById("last-update-time").textContent = formatDate();
}
