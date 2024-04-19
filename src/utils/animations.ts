import { circleCollision } from "./circleCollision";
import { getRandom } from "./helper";
import { Circle, playground } from "./playground";

interface Mouse {
  x: number | null;
  y: number | null;
}

export const mouse: Mouse = {
  x: 10,
  y: 10 
}

const generateCircles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const count = 500;

  for (let i = 0; i < count; i++) {
    const radius = getRandom(10) + 5;
    const x = Math.floor(getRandom(canvasWidth - radius * 2)) + radius;
    const y = Math.floor(getRandom(canvasHeight - radius * 2)) + radius;
    const color = `rgb(${getRandom(255)} 255 ${getRandom(255)})`

    const dx = (Math.random() - 0.5) * 3;
    const dy = (Math.random() - 0.5) * 3;
    const circle = new Circle(x, y, radius, dx, dy, color, ctx, canvas);
    circleArray.push(circle);
  }
}

const circleAnimations = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const circleArray: Circle[] = [];
  generateCircles(canvas, ctx, circleArray);

  window.addEventListener("resize", () => {
    // circleArray = []; // this is wrong -> reassinging array loses the reference to the original array
    circleArray.length = 0;
    generateCircles(canvas, ctx, circleArray);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })

  if (canvas && ctx) {
    window.requestAnimationFrame(() =>   circleAnimationLoop(canvas, ctx, circleArray));
  }
}

export function init() {
  const canvas = document.getElementById("tutorial") as HTMLCanvasElement;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  })

  // circleAnimations(canvas, ctx);

  circleCollision(canvas, ctx);
}

export const circleAnimationLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  // playground - for testing different objects
  playground(canvas, ctx, circleArray)

  window.requestAnimationFrame(() => circleAnimationLoop(canvas, ctx, circleArray));
}

