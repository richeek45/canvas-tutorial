export function draw() {
  const canvas = document.getElementById("tutorial") as HTMLCanvasElement;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // drawShapes(ctx);

      // // draw text
      // createText(ctx);

      // transformations
      // drawTransformations(ctx);

      // Clipping and compositions
      // clipComposition(ctx);

    }
  }
}