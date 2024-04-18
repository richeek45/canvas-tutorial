import { getRandom } from "./helper";
import { Circle, playground } from "./playground";

export function init() {
  const canvas = document.getElementById("tutorial") as HTMLCanvasElement;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const radius = 30;
  const count = 100;

  const circleArray: Circle[] = [];

  for (let i = 0; i < count; i++) {
    const x = getRandom(canvasHeight);
    const y = getRandom(canvasWidth);
    const dx = getRandom(5);
    const dy = getRandom(5);
    const circle = new Circle(x, y, radius, dx, dy, canvasWidth, canvasHeight, ctx);
    circleArray.push(circle);
  }

  if (canvas && ctx) {
    window.requestAnimationFrame(() =>   animationLoop(canvas, ctx, circleArray));
  }
}

export const animationLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  // playground - for testing different objects
  playground(canvas, ctx, circleArray)
  
  window.requestAnimationFrame(() => animationLoop(canvas, ctx, circleArray));
}