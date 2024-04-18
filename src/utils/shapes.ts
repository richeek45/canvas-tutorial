export const createTriangle = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

export const createAdjacentTriangles = (ctx: CanvasRenderingContext2D) => {
  // 1. Filled triangle
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(100, 20);
  ctx.lineTo(20, 100);
  ctx.fill();

  // 2. Stroked triangle
  ctx.beginPath();
  ctx.moveTo(120, 120);
  ctx.lineTo(120, 40);
  ctx.lineTo(40, 120);
  ctx.closePath();
  ctx.stroke();
}

export const createArc = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();

      const x = 25 + j * 50;
      const y = 25 + i * 50;
      const radius = 20;
      const startAngle = 0;
      const endAngle = Math.PI + (Math.PI * j) / 2;
      const counterClockwise = (i % 2)!== 0;

      
      ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}

export const createSmileyFace = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI, true);
  ctx.moveTo(90, 60);
  ctx.arc(80, 60, 10, 0, 2 * Math.PI, true);
  ctx.moveTo(130, 60);
  ctx.arc(120, 60, 10, 0 , 2 * Math.PI, true);
  ctx.moveTo(135, 75);
  ctx.arc(100, 75, 35, 0, 1 * Math.PI, false); // mouth
  ctx.stroke();
}

export const createRect = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgb(0 0 200 / 50%)";
    ctx.fillRect(30, 30, 50, 50)
}

export const createThreeTriangle = (ctx: CanvasRenderingContext2D) => {
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}

export const createSpeechBubble = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();
}


export const createTransparentCircles = (ctx: CanvasRenderingContext2D) => {
  // draw background
  ctx.fillStyle = "#FD0";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#6C0";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#09F";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#F30";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "#FFF";

  // set transparency value
  ctx.globalAlpha = 0.2;

  // Draw semi transparent circles
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }

}

export const createRectangleFill = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)} 0)`; // modifying the red and green values

      ctx.fillRect(j * 55, i * 55, 55, 55); // fills the rectangle of size 55 with colors
    }
  }
}

export const createCircleStroke = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0 ${255 - 42.5 * i} ${255 - 42.5 * j})`;

      ctx.beginPath();
      ctx.arc(25 + 25 * i, 25 + 25 * j, 10, 0, 2 * Math.PI, true);
      ctx.stroke();

    }
  }
}

export const createLineWidth = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = i + 1;

    ctx.beginPath();
    ctx.moveTo(5 + i * 20, 5);
    ctx.lineTo(5 + i * 20, 150);
    ctx.stroke();
  }
}

export const drawShapes = (ctx: CanvasRenderingContext2D) => {
  // createRect(ctx);

      // Drawing three rectangle
      // createThreeTriangle(ctx);

      // Drawing a triangle 
      // createTriangle(ctx);
      
      // Drawing a smiley face
      // createSmileyFace(ctx);

      // Drawing two adjacent triangles
      // createAdjacentTriangles(ctx);

      // Draw arcs
      // createArc(ctx);

      // Draw Speech Bubble - Quadratic Bezier curve
      // createSpeechBubble(ctx);

      // Create transparent circular rings inside windows logo
      // createTransparentCircles(ctx);

      // Create Rectangle fill
      // createRectangleFill(ctx);

      // Create circular stroke
      // createCircleStroke(ctx);

      // Create line width
      createLineWidth(ctx);
}