import { getMarketChart } from "./API.js";
import { drawChart, drawYGrid, drawXGrid, drawCursor } from "./draw.js";
import { formatPrice } from "./render.js";
let currentCryptoId;

export async function loadDetails(id) {
  const grid = document.getElementById("chart-grid");
  const data = document.getElementById("chart-data");
  const draw = document.getElementById("chart-draw");

  currentCryptoId = id;

  grid.width = grid.clientWidth;
  grid.height = grid.clientHeight;

  data.width = data.clientWidth;
  data.height = data.clientHeight;

  draw.width = draw.clientWidth;
  draw.height = draw.clientHeight;

  const ctxGrid = grid.getContext("2d");
  const ctxData = data.getContext("2d");
  const ctxDraw = draw.getContext("2d");

  ctxGrid.clearRect(0, 0, grid.width, grid.height);
  ctxData.clearRect(0, 0, data.width, data.height);
  ctxDraw.clearRect(0, 0, draw.width, draw.height);

  await updateGraph(1);
  ('"');
}

export async function updateGraph(days) {
  const prices = await getMarketChart(currentCryptoId, days);

  const dataCanvas = document.getElementById("chart-data");
  const gridCanvas = document.getElementById("chart-grid");
  const drawCanvas = document.getElementById("chart-draw");
  const ctxData = dataCanvas.getContext("2d");
  const ctxGrid = gridCanvas.getContext("2d");
  const ctxDraw = drawCanvas.getContext("2d");

  drawChart(ctxData, prices, dataCanvas.width, dataCanvas.height);
  drawYGrid(ctxGrid, prices, gridCanvas.height);
  drawXGrid(ctxGrid, prices, gridCanvas.width, gridCanvas.height, days);

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

  drawCanvas.addEventListener("mousemove", (e) => {
    ctxDraw.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

    const rect = drawCanvas.getBoundingClientRect();
    const xMouse = e.clientX - rect.left;

    let pos = Math.round((xMouse / drawCanvas.width) * (prices.length - 1));

    if (pos < 0) {
      pos = 0;
    } else if (pos > prices.length) {
      pos = prices.length - 1;
    }

    let timestamp = prices[pos][0];
    let price = prices[pos][1];

    let x = (pos / (prices.length - 1)) * drawCanvas.width;
    let ratio = (price - minPrice) / (maxPrice - minPrice);
    let y = drawCanvas.height - drawCanvas.height * ratio;

    let priceStr = formatPrice(price);
    let dateStr = new Date(timestamp).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    drawCursor(
      ctxDraw,
      x,
      y,
      drawCanvas.width,
      drawCanvas.height,
      priceStr,
      dateStr,
    );
  });

  drawCanvas.addEventListener("mouseleave", () => {
    ctxDraw.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  });
}
