import { getMarketChart } from "./API.js";
let currentCryptoId;

export async function loadDetails(id) {
  const grid = document.getElementById("chart-grid");
  const data = document.getElementById("chart-data");
  const draw = document.getElementById("chart-draw");

  const wCanvas = grid.clientWidth;
  const hCanvas = grid.clientHeight;

  currentCryptoId = id;

  grid.width = wCanvas;
  grid.height = hCanvas;

  data.width = wCanvas;
  data.height = hCanvas;

  draw.width = wCanvas;
  draw.height = hCanvas;

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
  const ctx = dataCanvas.getContext("2d");

  // drawChart(ctx, prices, dataCanvas.width, dataCanvas.height);
}
