import earthImage from "../assets/earth.png";
import moonImage from "../assets/moon.png";
import sunImage from "../assets/sun.png";
import { draw } from "./draw";

const sun = new Image();
const moon = new Image();
const earth = new Image();

export function init() {

  sun.src = sunImage;
  moon.src = moonImage;
  earth.src = earthImage;

  // window.requestAnimationFrame(drawAnimations);
  window.requestAnimationFrame(draw);
}

export const drawAnimations = () => {

  const canvas = document.getElementById("tutorial") as HTMLCanvasElement;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.globalCompositeOperation = "destination-over";
      ctx.clearRect(0, 0, 300, 300);

      ctx.fillStyle = "rgb(0 0 0 / 40%)";
      ctx.strokeStyle = "rgb(0 153 255 / 40%)";
      ctx.save();
      ctx.translate(150, 150);

      // Earth
      const time = new Date();
      ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
      ctx.translate(105, 0); // currently at earth's position
      ctx.fillRect(0, -12, 40, 24); // Shadow

      ctx.drawImage(earth, -12, -12, 25, 25);

      // Moon
      ctx.save();
      ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds(),
      );
      ctx.translate(0, 28.5);
      ctx.drawImage(moon, -3.5, -3.5, 10, 10);
      ctx.restore();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
      ctx.stroke();

      ctx.drawImage(sun, 0, 0, 300, 300);

    }
  }

  window.requestAnimationFrame(drawAnimations);
}