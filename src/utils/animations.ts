import { getDistance, getRandom, randomIntFromRange } from "./helper";
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

const circleCollision = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
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

export const colllisionLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circle1: Circle, circle2: Circle) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  circle1.draw();
  circle2.x = mouse.x as number;
  circle2.y = mouse.y as number;
  circle2.update();

  const distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);
  console.log(distance);
  if (distance < circle1.r + circle2.r) {
    circle1.color = "blue";
  } else {
    circle1.color = "green";
  }


  window.requestAnimationFrame(() => colllisionLoop(canvas, ctx, circle1, circle2));
}