let currentTool = "cursor";
let isDrawing = false;
let startX;
let startY;

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

    ctx.fillStyle = "rgba(30, 210, 27, 0.3)";
    ctx.fillRect(startX, startY, width, height);

    ctx.strokeStyle = "#70ff29";
    ctx.strokeRect(startX, startY, width, height);
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!isDrawing) return;

    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    const userCanvas = document.getElementById("chart-user");
    const ctxUser = userCanvas.getContext("2d");

    ctxUser.fillStyle = "rgba(30, 210, 27, 0.3)";
    ctxUser.fillRect(startX, startY, width, height);

    ctxUser.strokeStyle = "#70ff29";
    ctxUser.strokeRect(startX, startY, width, height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    isDrawing = false;
  });
}
