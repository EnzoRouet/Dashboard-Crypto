import { formatPrice } from "./render.js";

let color;

export function drawChart(ctx, prices, width, height) {
  if (!prices || prices.length === 0) {
    return;
  }

  color = prices[0][1] <= prices[prices.length - 1][1] ? "#1FBF28" : "#C71616";

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

export function drawYGrid(ctx, prices, height) {
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

export function drawXGrid(ctx, prices, width, height, days) {
  if (!prices || prices.length === 0) return;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#111827";
  ctx.font = "10px sans-serif";

  const y = height - 10;

  if (days === 1) {
    let lastDrawnHour = -1;

    for (let i = 0; i < prices.length; i++) {
      const timestamp = prices[i][0];
      const date = new Date(timestamp);
      const hour = date.getHours();

      if (hour % 2 === 0 && hour !== lastDrawnHour) {
        const x = (i / (prices.length - 1)) * width;
        if (x > 50 && x < width - 20) {
          ctx.fillText(`${hour}:00`, x, y);
          lastDrawnHour = hour;
        }
      }
    }
  } else {
    const numLabels = 6;
    for (let j = 0; j < numLabels; j++) {
      const index = Math.floor((j * (prices.length - 1)) / (numLabels - 1));

      const timestamp = prices[index][0];
      const date = new Date(timestamp);
      const dateString = date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "numeric",
      });
      const x = (index / (prices.length - 1)) * width;

      if (j === 0) ctx.textAlign = "left";
      else if (j === numLabels - 1) ctx.textAlign = "right";
      else ctx.textAlign = "center";

      ctx.fillText(dateString, x, y);
    }
    console.log("Terminé !");
  }
}

export function drawCursor(ctx, x, y, width, height, price, dateStr) {
  ctx.save();

  ctx.beginPath();
  ctx.setLineDash([5, 5]);

  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);

  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();

  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  let xBox;
  let xText;

  if (x < width - 120) {
    xBox = x + 15;
    xText = x + 65;
  } else {
    xBox = x - 115;
    xText = x - 65;
  }

  let y_depart = y - 40 / 2;
  ctx.fillStyle = "rgb(54, 54, 54)";
  ctx.fillRect(xBox, y_depart, 100, 40);
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(`${price}`, xText, y - 10);
  ctx.fillStyle = "rgb(140, 140, 140)";
  ctx.fillText(`${dateStr}`, xText, y + 10);
}
