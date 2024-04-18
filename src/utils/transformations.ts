export const drawTransformations = (ctx: CanvasRenderingContext2D) => {
  // save and restore diagrams
  // saveRestore(ctx);

  // translate function
  // drawTranslate(ctx);
  
  // rotate function
  // drawRotate(ctx);

  // scale function
  // drawScale(ctx);

  // transform function
  drawTransform(ctx);

}

export const saveRestore = (ctx: CanvasRenderingContext2D) => {

  ctx.fillRect(0, 0, 150, 150);
  ctx.save();

  ctx.fillStyle = "#09F";
  ctx.fillRect(15, 15, 120, 120); // Draw a Blue rectangle with new settings
  ctx.save(); // Save the current state

  ctx.fillStyle = "#FFF"; // Make changes to saved settings
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // Draw a 50%-White rectangle with newest settings

  ctx.restore(); // Restore to previous state
  ctx.fillRect(45, 45, 60, 60); // Draw a rectangle with restored Blue setting

  ctx.restore(); // Restore to original state
  ctx.fillRect(60, 60, 30, 30); // Draw a rectangle with restored Black setting
}

export const drawTranslate = (ctx: CanvasRenderingContext2D) => {
  // translate position of the diagram

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

      ctx.save();
      ctx.fillStyle = `rgb(${45 * i} ${255 - 42 * j} 255)`;
      ctx.translate(25 + i * 50, 25 + j * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }

}

export const drawRotate = (ctx: CanvasRenderingContext2D) => {

  ctx.save();
  // blue rect
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 45);
  // grey rect
  ctx.fillStyle = "#4D4E53";
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore();

  ctx.fillStyle = "#0095DD";
  ctx.fillRect(150, 30, 100, 100);
  ctx.translate(200, 80); // translate to rectangle center
  // x = x + 0.5 * width
  // y = y + 0.5 * height

  ctx.rotate((Math.PI / 180) * 25); // rotate
  ctx.translate(-200, -80); // translate back

  // draw grey rect
  ctx.fillStyle = "#4D4E53";
  ctx.fillRect(150, 30, 100, 100);

}

export const drawScale = (ctx: CanvasRenderingContext2D) => {
  ctx.save();
  ctx.scale(10, 5);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  ctx.translate(70, 50);
  ctx.scale(-1, 1);
  ctx.font = "60px serif";
  ctx.fillText("Richeek", -135, 120);

}

export const drawTransform = (ctx: CanvasRenderingContext2D) => {

  const sin = Math.sin(Math.PI / 6);
  const cos = Math.cos(Math.PI / 6);

  ctx.translate(100, 100);

  // draw 12 lines in circular motion
  let c = 0;
  for (let i = 0; i <= 12; i++) {

    c = Math.floor((255 / 12) * i);
    ctx.fillStyle = `rgb(${c} ${c} ${c})`;
    ctx.fillRect(0, 0, 100, 10);

    const horizontalScaling = cos; // a
    const horizontalSkewing = sin; // b
    const verticalSkewing = -sin; // c
    const verticalScaling = cos; // d
    const horizontalMoving = 0; // e
    const verticalMoving = 0; // f

    // transform matrix 
    // | a c e |
    // | b d f | = matA
    // | 0 0 1 |
    // mul (matA) = a * d - b * c

    ctx.transform(horizontalScaling, horizontalSkewing, verticalSkewing, verticalScaling, horizontalMoving, verticalMoving);

  }

  ctx.setTransform(-1, 0, 0, 1, 150, 200);
  ctx.fillStyle = "rgb(255 128 255 / 50%)";
  ctx.fillRect(0, 50, 100, 100);

}