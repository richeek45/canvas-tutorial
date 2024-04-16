
import { useEffect } from 'react';
import './App.css'

function App() {


  function draw() {
    const canvas = document.getElementById("tutorial") as HTMLCanvasElement;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // ctx.fillStyle = "rgb(200, 0, 0)";
        // ctx.fillRect(10, 10, 50, 50);

        // ctx.fillStyle = "rgb(0 0 200 / 50%)";
        // ctx.fillRect(30, 30, 50, 50)

        // Drawing three rectangle
        // ctx.fillRect(25, 25, 100, 100);
        // ctx.clearRect(45, 45, 60, 60);
        // ctx.strokeRect(50, 50, 50, 50);

        // Drawing a triangle 
        // ctx.beginPath();
        // ctx.moveTo(75, 50);
        // ctx.lineTo(100, 75);
        // ctx.lineTo(100, 25);
        // ctx.fill();
        
        // Drawing a smiley face
        // ctx.beginPath();
        // ctx.arc(100, 75, 50, 0, 2 * Math.PI, true);
        // ctx.moveTo(90, 60);
        // ctx.arc(80, 60, 10, 0, 2 * Math.PI, true);
        // ctx.moveTo(130, 60);
        // ctx.arc(120, 60, 10, 0 , 2 * Math.PI, true);
        // ctx.moveTo(135, 75);
        // ctx.arc(100, 75, 35, 0, 1 * Math.PI, false); // mouth
        // ctx.stroke();

        // // Drawing two adjacent triangles
        // // 1. Filled triangle
        // ctx.beginPath();
        // ctx.moveTo(20, 20);
        // ctx.lineTo(100, 20);
        // ctx.lineTo(20, 100);
        // ctx.fill();

        // // 2. Stroked triangle
        // ctx.beginPath();
        // ctx.moveTo(120, 120);
        // ctx.lineTo(120, 40);
        // ctx.lineTo(40, 120);
        // ctx.closePath();
        // ctx.stroke();

        

      }
    }
  }
  
  useEffect(() => {
    window.addEventListener("load", draw);
    
    return () => window.removeEventListener("load", draw)
  }, [])

  return (
    <>
      <div>
      <canvas width="500" height="500" style={{ background: "lightgreen"}} id="tutorial">
      Testing Canvas Drawing
     </canvas>
      </div>
    </>
  )
}

export default App
