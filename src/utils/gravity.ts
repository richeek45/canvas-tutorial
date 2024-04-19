import { generateCircles } from "./helper";
import { Circle } from "./playground";


export const circleGravity = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const circleArray: Circle[] = [];
  generateCircles(canvas, ctx, circleArray);
  window.requestAnimationFrame(() => circleAnimationLoop(canvas, ctx, circleArray));

}

const circleAnimationLoop = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < circleArray.length; i++) {
    circleArray[i].gravity();
  }

  window.requestAnimationFrame(() => circleAnimationLoop(canvas, ctx, circleArray));
}