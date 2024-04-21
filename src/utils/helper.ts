import { Circle } from "./Circle";

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

export const generateCircles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, circleArray: Circle[], circleCount?: number) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const count = circleCount ?? 500;

  for (let i = 0; i < count; i++) {
    const radius = 20 ?? (getRandom(10) + 5);
    let x = Math.floor(getRandom(canvasWidth - radius * 2)) + radius;
    let y = Math.floor(getRandom(canvasHeight - radius * 2)) + radius;
    const color = `rgb(${getRandom(255)} 255 ${getRandom(255)})`

    const dx = Math.floor((Math.random() - 0.5) * 10);
    const dy = Math.floor((Math.random() - 0.5) * 10);

    // make sure there are more than 1 circle while comparing the overlap of circles
    if (i > 0) {
      for (let j = 0; j < circleArray.length; j++) {
        if (getDistance(x, y, circleArray[j].x, circleArray[j].y) - (2 * radius) < 0) {
          // circles are colliding, then regenerate the x, y coordinates again
          x = Math.floor(getRandom(canvasWidth - radius * 2)) + radius;
          y = Math.floor(getRandom(canvasHeight - radius * 2)) + radius;

          j = -1; // resetting the loop for checking for collision
        }
      }
    }

    const circle = new Circle(x, y, radius, dx, dy, color, ctx, canvas);
    circleArray.push(circle);
  }
}

export const rotate = (velocity: { x: number, y: number }, angle: number) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  }

  return rotatedVelocities;
}

// From conservation of kinetic energy - 1/2*m1*u1^2 + 1/2*m2*u2^2 = 1/2*m1*v1^2 + 1/2*m2*u2^2 in 1 dimension collision

// v1 = (u1 * (m1 - m2)/(m1 + m2)) + (u2 * (2*m2 / (m1 + m2)))
// v2 = (u1 * (2*m1)/(m1 + m2)) + (u2 * ((m2 - m1)/(m1 + m2)))

// Ref for particle collision: 
// https://en.wikipedia.org/wiki/Elastic_collision#:~:text=One%2Ddimensional%20Newtonian,-Duration%3A%209%20minutes&text=In%20any%20collision%2C%20momentum%20is,1%2C%20v2%20after%20collision.
export const particleCollision = (particle1: Circle, particle2: Circle) => {
  const xVelocityDiff = (particle1.dx - particle2.dx);
  const yVelocityDiff = (particle1.dy - particle2.dy);

  const xDist = (particle1.x - particle2.x);
  const yDist = (particle1.y - particle2.y);


  // Particle overlapping condition
  if ((xVelocityDiff * xDist + yVelocityDiff * yDist) <= 0) {

    // first rotate the collision plane angle by (θ) to fit the 1-dimension plane
    const angle = -Math.atan2(yDist, xDist);

    const m1 = particle1.mass;
    const m2 = particle2.mass;

    const u1 = rotate({ x: particle1.dx, y: particle1.dy }, angle);
    const u2 = rotate({ x: particle2.dx, y: particle2.dy }, angle);

    // Velocity after 1d collision equation
    const v1 = { x: (u1.x * (m1 - m2) + 2 * u2.x * m2 ) / (m1 + m2), y: u1.y };
    const v2 = { x: (u2.x * (m2 - m1) + 2 * u1.x * m1 ) / (m1 + m2), y: u2.y };


    // reversing the angle to (-θ) to move it to original 2-d plane
    const v1Final = rotate({ x: v1.x, y: v1.y }, -angle);
    const v2Final = rotate({ x: v2.x, y: v2.y }, -angle);

    // const u1 = particle1.dx * Math.cos(angle) + particle1.dy * Math.sin(angle);
    // const u2 = particle2.dx * Math.cos(angle) + particle2.dy * Math.sin(angle);

    // const v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
    // const v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);

    // particle1.dx = v1 * Math.cos(angle) - particle1.dy * Math.sin(angle);
    // particle1.dy = v1 * Math.sin(angle) + particle1.dy * Math.cos(angle);
    // particle2.dx = v2 * Math.cos(angle) - particle2.dy * Math.sin(angle);
    // particle2.dy = v2 * Math.sin(angle) + particle2.dy * Math.cos(angle);

    particle1.dx = v1Final.x;
    particle1.dy = v1Final.y;
    particle2.dx = v2Final.x;
    particle2.dy = v2Final.y;
  }

}