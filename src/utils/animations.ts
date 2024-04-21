import { collisionEffect } from "./circleCollision";
import { generateCircles } from "./helper";
import { Circle } from "./Circle";

interface Mouse {
  x: number;
  y: number;
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

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })

  // circleAnimations(canvas, ctx);

  // circleCollision(canvas, ctx);

  // circleGravity(canvas, ctx);

  collisionEffect(canvas, ctx);
}

const circleAnimationLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  // playground - for testing different objects
  playground(canvas, ctx, circleArray)

  window.requestAnimationFrame(() => circleAnimationLoop(canvas, ctx, circleArray));
}

const playground = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}