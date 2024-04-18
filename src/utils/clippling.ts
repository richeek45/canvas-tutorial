export const clipComposition = (ctx: CanvasRenderingContext2D) => {

  // Draw stars
  drawStars(ctx);

}


export const drawStars = (ctx: CanvasRenderingContext2D) => {
  const rectSize = 300;
  const circleRadius = 90;
  // Rectangle box
  ctx.fillRect(0, 0, rectSize, rectSize);
  ctx.translate(rectSize / 2, rectSize / 2);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.rect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);
  ctx.arc(0, 0, circleRadius, 0, 2 * Math.PI, true);
  ctx.clip();

  // Draw background
  const lingrad = ctx.createLinearGradient(0, -rectSize / 2, 0, rectSize / 2);
  lingrad.addColorStop(0, "#232256");
  lingrad.addColorStop(1, "#143778");

  ctx.fillStyle = lingrad;
  ctx.fillRect(-rectSize / 2, -rectSize / 2, rectSize, rectSize);

  generateStars(ctx, rectSize);

}

const generateStars = (ctx: CanvasRenderingContext2D, boundary: number) => {
  const starCount = 150;
  for (let i = 0; i < starCount; i++) {
    ctx.save();
    ctx.fillStyle = "#fff"; // white colored star fill 
    ctx.translate(
      boundary / 2 - Math.floor(Math.random() * boundary),
      boundary / 2 - Math.floor(Math.random() * boundary)
    );
    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore();
  }
}

const drawStar = (ctx: CanvasRenderingContext2D, r: number) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);

  // for 10 lines of a star shape
  for (let i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5); // 5 segments of a star
    if (i % 2 === 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}