import { getRandom } from "./helper";


export class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number, 
    y: number, 
    r: number, 
    dx: number, 
    dy: number, 
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgb(${getRandom(255)} 255 ${getRandom(255)})`;
    this.ctx.fill();
  }

  update() {
    this.draw();
    if (this.x + this.r > this.width || this.x - this.r < 0) {
      this.dx = - this.dx;
    }
  
    if (this.y + this.r > this.height || this.y - this.r < 0) {
      this.dy = - this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;

  }
}


export const playground = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[]) => {
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  // for (let i = 0; i < count; i++) {
  //   const x = Math.floor(Math.random() * canvas.width);
  //   const y = Math.floor(Math.random() * canvas.height);
  //   const r = Math.floor(Math.random() * 50);
  //   ctx.beginPath();
  //   ctx.fillStyle = `rgb(${getRandom(255)} ${getRandom(255)} ${getRandom(255)})`;
  //   ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  //   ctx.fill();
  // }


}