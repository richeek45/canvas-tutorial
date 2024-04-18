import { Circle, playground } from "./playground";

const x = 200;
const y = 200;
const dx = 5;
const dy = 5;
const radius = 30;

export function init() {
  const canvas = document.getElementById("tutorial") as HTMLCanvasElement;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const circle = new Circle(x, y, radius, dx, dy, canvasWidth, canvasHeight, ctx);

  if (canvas && ctx) {
    window.requestAnimationFrame(() =>   animationLoop(canvas, ctx, circle));
  }
}

export const animationLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circle: Circle) => {
  // playground - for testing different objects
  playground(canvas, ctx, circle)
  
  window.requestAnimationFrame(() => animationLoop(canvas, ctx, circle));
}