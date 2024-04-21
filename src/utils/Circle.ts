import { mouse } from "./animations";
import { getDistance, particleCollision } from "./helper";

const maxRadius = 40;
const speed = 2;
const friction = 0.97;

export class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  mass: number;
  minR: number;
  color: string;
  opacity: number;
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
    this.mass = 1;
    this.opacity = 0;

    this.color = color;
    this.ctx = ctx;
    this.minR = r;
    this.canvas = canvas;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.restore();

    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
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

  hasCollidedMouseEvent() {
    const xProximity = mouse.x && ((this.x - mouse.x) < 50) && ((this.x - mouse.x) > -50);
    const yProximity = mouse.y && ((this.y - mouse.y) < 50) && ((this.y - mouse.y) > -50)
    if (xProximity && yProximity && this.r < maxRadius) {
      this.ctx.fillStyle = "red";
      this.r += 1;
    } else if (this.r > this.minR) {
      this.r -= 2;
    }
  }


  updateCollision(circles: Circle[]) {
    this.draw();

    for(let i = 0; i < circles.length; i++) {
      if (this === circles[i]) continue; // skip the same circle comparison 

      if ((getDistance(this.x, this.y, circles[i].x, circles[i].y) - (2 * this.r)) < 0) {
        particleCollision(this, circles[i]);
      }
    }

    this.bounceWalls();
  }

  mouseCollisionDetection() {
    if ((getDistance(mouse.x, mouse.y, this.x, this.y) - (2 * this.r)) < 150 && this.opacity < 0.5) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity = Math.max(0, this.opacity - 0.02);
    }
  }

  bounceWalls() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    if (this.x + this.r > canvasWidth || this.x - this.r < 0) {
      this.dx = - this.dx;
    }
  
    if (this.y + this.r > canvasHeight || this.y - this.r < 0) {
      this.dy = - this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;

    this.mouseCollisionDetection()

  }

  update() {
    this.draw();
    this.bounceWalls();
    this.hasCollidedMouseEvent();
  }
}


