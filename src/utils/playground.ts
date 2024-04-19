import { mouse } from "./animations";

const maxRadius = 40;
const speed = 2;
const friction = 0.97;

export class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  minR: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement

  constructor(
    x: number, 
    y: number, 
    r: number, 
    dx: number, 
    dy: number, 
    color: string,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;

    this.color = color;
    this.ctx = ctx;
    this.minR = r;
    this.canvas = canvas;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  gravity() {
    if (this.y + this.r + this.dy > this.canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += speed;
    }

    const rightSide = this.x + this.r + this.dx > this.canvas.width;
    const leftSide = this.x - this.r < 0; 
    if (leftSide || rightSide) {
      this.dx = - this.dx;
    }
    
    this.draw();

    this.y += this.dy;
    this.x += this.dx;

  }

  update() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.draw();

    if (this.x + this.r > canvasWidth || this.x - this.r < 0) {
      this.dx = - this.dx;
    }
  
    if (this.y + this.r > canvasHeight || this.y - this.r < 0) {
      this.dy = - this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;

    const xProximity = mouse.x && ((this.x - mouse.x) < 50) && ((this.x - mouse.x) > -50);
    const yProximity = mouse.y && ((this.y - mouse.y) < 50) && ((this.y - mouse.y) > -50)
    if (xProximity && yProximity && this.r < maxRadius) {
      this.ctx.fillStyle = "red";
      this.r += 1;
    } else if (this.r > this.minR) {
      this.r -= 2;
    }

  }
}


export const playground = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}