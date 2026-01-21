import { getMarketChart } from "./API.js";
import { drawChart, drawGrid } from "./draw.js";
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
  const ctxData = dataCanvas.getContext("2d");
  const ctxGrid = gridCanvas.getContext("2d");

  drawChart(ctxData, prices, dataCanvas.width, dataCanvas.height);
  drawGrid(ctxGrid, prices, gridCanvas.height);
}
