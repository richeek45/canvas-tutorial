import { circleGravity } from "./gravity";
import { generateCircles } from "./helper";
import { Circle, playground } from "./playground";

interface Mouse {
  x: number | null;
  y: number | null;
}

export const mouse: Mouse = {
  x: 10,
  y: 10 
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

  // circleCollision(canvas, ctx);

  circleGravity(canvas, ctx);
}

const circleAnimationLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  // playground - for testing different objects
  playground(canvas, ctx, circleArray)

  window.requestAnimationFrame(() => circleAnimationLoop(canvas, ctx, circleArray));
}

