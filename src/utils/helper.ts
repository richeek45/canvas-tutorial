import { Circle } from "./playground";

export const getRandom = (value: number) => {
  return Math.floor(Math.random() * value);
}

export const randomIntFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomColors = (colors: string[]) => {
  return colors[Math.floor(Math.random() * colors.length)];
} 

export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
  const xDistance = (x2 - x1);
  const yDistance = (y2 - y1);

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

export const generateCircles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
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