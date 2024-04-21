import { mouse } from "./animations";
import { generateCircles, getDistance, getRandom } from "./helper";
import { Circle } from "./Circle";

export const circleCollision = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const radius = getRandom(10) + 5;
  const x = Math.floor(getRandom(canvasWidth - radius * 2)) + radius;
  const y = Math.floor(getRandom(canvasHeight - radius * 2)) + radius;
  const color1 = `rgb(${getRandom(255)} 255 ${getRandom(255)})`
  const color2 = `rgb(255 ${getRandom(255)} ${getRandom(255)})`

  const dx = (Math.random() - 0.5) * 3;
  const dy = (Math.random() - 0.5) * 3;
  const circle1 =new Circle(400, 400, 150, dx, dy, color1, ctx, canvas);
  const circle2 = new Circle(x, y, 30, dx, dy, color2, ctx, canvas);

  window.requestAnimationFrame(() => colllisionLoop(canvas, ctx, circle1, circle2))
}

const detectCollision = (circle1: Circle, circle2: Circle) => {
  circle1.draw();
  circle2.x = mouse.x as number;
  circle2.y = mouse.y as number;
  circle2.update();

  const distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);
  if (distance < circle1.r + circle2.r) {
    circle1.color = "blue";
  } else {
    circle1.color = "green";
  }
}

export const collisionEffect = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)  => {
  const circles: Circle[] = [];
  const circleCount = 100;

  generateCircles(canvas, ctx, circles, circleCount);

  window.requestAnimationFrame(() => collisionBounceLoop(canvas, ctx, circles));

}

export const collisionBounceLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circles: Circle[]) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => circle.updateCollision(circles));

  window.requestAnimationFrame(() => collisionBounceLoop(canvas, ctx, circles));
}

export const colllisionLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circle1: Circle, circle2: Circle) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  detectCollision(circle1, circle2);

  window.requestAnimationFrame(() => colllisionLoop(canvas, ctx, circle1, circle2));
}