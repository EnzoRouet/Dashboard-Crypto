import { getMarketChart } from "./API.js";
import { drawChart, drawYGrid, drawXGrid, drawCursor } from "./draw.js";
import { formatPrice } from "./render.js";
import { enableDrawing, resetTools, getGraphScale } from "./tools.js";
let currentCryptoId;

export async function loadDetails(crypto) {
  resetTools();
  const grid = document.getElementById("chart-grid");
  const data = document.getElementById("chart-data");
  const draw = document.getElementById("chart-draw");
  const user = document.getElementById("chart-user");
  const btns = document.querySelectorAll(".time-btn");

  document.getElementById("detail-name").innerText = crypto.name;

  const logo = document.getElementById("detail-logo");
  logo.src = crypto.image;
  logo.alt = crypto.name;

  currentCryptoId = crypto.id;

  grid.width = grid.clientWidth;
  grid.height = grid.clientHeight;

  data.width = data.clientWidth;
  data.height = data.clientHeight;

  draw.width = draw.clientWidth;
  draw.height = draw.clientHeight;

  user.width = user.clientWidth;
  user.height = user.clientHeight;

  const ctxGrid = grid.getContext("2d");
  const ctxData = data.getContext("2d");
  const ctxDraw = draw.getContext("2d");
  const ctxUser = user.getContext("2d");

  ctxGrid.clearRect(0, 0, grid.width, grid.height);
  ctxData.clearRect(0, 0, data.width, data.height);
  ctxDraw.clearRect(0, 0, draw.width, draw.height);
  ctxUser.clearRect(0, 0, user.width, user.height);

  btns.forEach((oldBtn) => {
    const btn = oldBtn.cloneNode(true);

    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");

    oldBtn.parentNode.replaceChild(btn, oldBtn);

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelectorAll(".time-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("active");

      const day = btn.dataset.days;

      updateGraph(day);
    });
  });

  const defaultBtn = document.querySelector('.time-btn[data-days="1"]');

  if (defaultBtn) {
    defaultBtn.classList.add("active");
    defaultBtn.setAttribute("aria-pressed", "true");
  }

  await updateGraph(1);
}

export async function updateGraph(days) {
  const prices = await getMarketChart(currentCryptoId, days);

  const dataCanvas = document.getElementById("chart-data");
  const gridCanvas = document.getElementById("chart-grid");
  const userCanvas = document.getElementById("chart-user");

  const oldDrawCanvas = document.getElementById("chart-draw");

  const ctxData = dataCanvas.getContext("2d");
  const ctxGrid = gridCanvas.getContext("2d");
  const ctxUser = userCanvas.getContext("2d");

  ctxData.clearRect(0, 0, dataCanvas.width, dataCanvas.height);
  ctxGrid.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  ctxUser.clearRect(0, 0, userCanvas.width, userCanvas.height);

  drawChart(ctxData, prices, dataCanvas.width, dataCanvas.height);
  drawYGrid(ctxGrid, prices, gridCanvas.height);
  drawXGrid(ctxGrid, prices, gridCanvas.width, gridCanvas.height, days);

  const newDrawCanvas = oldDrawCanvas.cloneNode(true);

  newDrawCanvas.width = oldDrawCanvas.clientWidth;
  newDrawCanvas.height = oldDrawCanvas.clientHeight;

  oldDrawCanvas.parentNode.replaceChild(newDrawCanvas, oldDrawCanvas);

  const ctxDraw = newDrawCanvas.getContext("2d");

  let minPrice = prices[0][1];
  let maxPrice = prices[0][1];

  for (let i = 1; i < prices.length; i++) {
    if (prices[i][1] > maxPrice) maxPrice = prices[i][1];
    if (prices[i][1] < minPrice) minPrice = prices[i][1];
  }

  const padding = (maxPrice - minPrice) * 0.1;
  maxPrice += padding;
  minPrice -= padding;
  getGraphScale(minPrice, maxPrice, dataCanvas.height);

  newDrawCanvas.addEventListener("mousemove", (e) => {
    ctxDraw.clearRect(0, 0, newDrawCanvas.width, newDrawCanvas.height);

    const rect = newDrawCanvas.getBoundingClientRect();
    const xMouse = e.clientX - rect.left;

    let pos = Math.round((xMouse / newDrawCanvas.width) * (prices.length - 1));

    if (pos < 0) pos = 0;
    else if (pos > prices.length) pos = prices.length - 1;

    let timestamp = prices[pos][0];
    let price = prices[pos][1];

    let x = (pos / (prices.length - 1)) * newDrawCanvas.width;
    let ratio = (price - minPrice) / (maxPrice - minPrice);
    let y = newDrawCanvas.height - newDrawCanvas.height * ratio;

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
      newDrawCanvas.width,
      newDrawCanvas.height,
      priceStr,
      dateStr,
    );
  });

  newDrawCanvas.addEventListener("mouseleave", () => {
    ctxDraw.clearRect(0, 0, newDrawCanvas.width, newDrawCanvas.height);
  });

  enableDrawing(newDrawCanvas);
}
