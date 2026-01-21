import { formatPrice } from "./render.js";

export function drawChart(ctx, prices, width, height) {
  if (!prices || prices.length === 0) {
    return;
  }

  const color =
    prices[0][1] <= prices[prices.length - 1][1] ? "#1FBF28" : "#C71616";

  let minPrice = prices[0][1];
  let maxPrice = prices[0][1];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i][1] > maxPrice) {
      maxPrice = prices[i][1];
    }
    if (prices[i][1] < minPrice) {
      minPrice = prices[i][1];
    }
  }

  const padding = (maxPrice - minPrice) * 0.1;
  maxPrice += padding;
  minPrice -= padding;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;

  for (let j = 0; j < prices.length; j++) {
    const x = (j / (prices.length - 1)) * width;
    const ratio = (prices[j][1] - minPrice) / (maxPrice - minPrice);
    const y = height - ratio * height;

    if (j === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

export function drawGrid(ctx, prices, height) {
  if (!prices || prices.length === 0) {
    return;
  }

  let minPrice = prices[0][1];
  let maxPrice = prices[0][1];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i][1] > maxPrice) {
      maxPrice = prices[i][1];
    }
    if (prices[i][1] < minPrice) {
      minPrice = prices[i][1];
    }
  }

  const padding = (maxPrice - minPrice) * 0.1;
  maxPrice += padding;
  minPrice -= padding;

  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#111827";
  ctx.font = "bold 14px sans-serif";

  for (let j = 0; j < 6; j++) {
    const price = minPrice + j * ((maxPrice - minPrice) / 5);
    const y = height - ((price - minPrice) / (maxPrice - minPrice)) * height;

    if (j === 0) {
      ctx.textBaseline = "bottom"; // Le prix du bas se pose SUR la ligne du bas
    } else if (j === 5) {
      ctx.textBaseline = "top"; // Le prix du haut pend SOUS la ligne du haut
    } else {
      ctx.textBaseline = "middle"; // Les autres sont centrés
    }
    ctx.fillText(formatPrice(price), 5, y);
  }
}
