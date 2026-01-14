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

console.log(formatDate());
