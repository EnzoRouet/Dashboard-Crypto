export function drawChart(ctx, prices, width, height) {
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

  ctx.beginPath();
  ctx.strokeStyle = "rgb(0,0,255)";

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
