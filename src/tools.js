let currentTool = "cursor";
let isDrawing = false;
let startX;
let startY;
let graphData = { min: 0, max: 0, height: 0 };

export function getGraphScale(min, max, height) {
  graphData.min = min;
  graphData.max = max;
  graphData.height = height;
}

export function getPriceY(data) {
  const dataCanvas = document.getElementById("chart-data");
  const ratio = 1 - data / dataCanvas.height;
  return graphData.min + ratio * (graphData.max - graphData.min);
}

export function initTools() {
  const tools = document.querySelectorAll("input[name='tool']");

  tools.forEach((tool) => {
    tool.addEventListener("change", (e) => {
      e.preventDefault();
      currentTool = e.target.value;
      updateCursorStyle(currentTool);
    });
  });

  const eraser = document.getElementById("tool-eraser");

  eraser.addEventListener("click", () => {
    const userCanvas = document.getElementById("chart-user");
    const ctxUser = userCanvas.getContext("2d");

    ctxUser.clearRect(0, 0, userCanvas.width, userCanvas.height);
  });
}

function updateCursorStyle(tool) {
  const drawCanvas = document.getElementById("chart-draw");
  if (tool === "box") {
    drawCanvas.style.cursor = "crosshair";
  } else {
    drawCanvas.style.cursor = "default";
  }
}

export function getCurrentTool() {
  return currentTool;
}

export function resetTools() {
  currentTool = "cursor";

  const cursorInput = document.getElementById("tool-cursor");
  if (cursorInput) {
    cursorInput.checked = true;
  }

  updateCursorStyle("cursor");
}

export function enableDrawing(canvas) {
  const ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", (e) => {
    if (currentTool !== "box") return;

    isDrawing = true;

    startX = e.offsetX;
    startY = e.offsetY;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    const startPrice = getPriceY(startY);
    const endPrice = getPriceY(e.offsetY);

    const variation = ((endPrice - startPrice) / startPrice) * 100;
    const sign = variation > 0 ? "+" : "";
    const text = sign + variation.toFixed(2) + "%";

    const colorRect =
      variation >= 0 ? "rgba(30, 210, 27, 0.3)" : "rgba(210,30,27,0.3)";
    ctx.fillStyle = colorRect;
    ctx.fillRect(startX, startY, width, height);

    const color = variation >= 0 ? "rgb(27, 204, 27)" : "rgb(204, 27, 27)";
    ctx.strokeStyle = color;
    ctx.strokeRect(startX, startY, width, height);

    ctx.fillStyle = color;
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, startX + width / 2, startY + height / 2);
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!isDrawing) return;

    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    const startPrice = getPriceY(startY);
    const endPrice = getPriceY(e.offsetY);

    const variation = ((endPrice - startPrice) / startPrice) * 100;
    const sign = variation > 0 ? "+" : "";
    const text = sign + variation.toFixed(2) + "%";

    const userCanvas = document.getElementById("chart-user");
    const ctxUser = userCanvas.getContext("2d");

    const colorRect =
      variation >= 0 ? "rgba(30, 210, 27, 0.3)" : "rgba(210,30,27,0.3)";
    ctxUser.fillStyle = colorRect;
    ctxUser.fillRect(startX, startY, width, height);

    const color = variation >= 0 ? "rgb(27, 204, 27)" : "rgb(204, 27, 27)";
    ctxUser.strokeStyle = color;
    ctxUser.strokeRect(startX, startY, width, height);

    ctxUser.fillStyle = color;
    ctxUser.font = "bold 14px sans-serif";
    ctxUser.textAlign = "center";
    ctxUser.textBaseline = "middle";
    ctxUser.fillText(text, startX + width / 2, startY + height / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    isDrawing = false;
  });
}
