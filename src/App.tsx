
import { useEffect } from 'react';
import './App.css'
import { draw } from './utils/draw';
import { init } from './utils/animations';

const createText = (ctx: CanvasRenderingContext2D) => {
  ctx.font = "60px serif";
  // ctx.fillText("Hello world", 20, 120, 200);
  ctx.strokeText("Hello world", 20, 120, 200);
}

function App() {

  
  useEffect(() => {
    // window.addEventListener("load", draw);
    
    // return () => window.removeEventListener("load", draw)
    window.addEventListener("load", init);
    
    return () => window.removeEventListener("load", init)
  }, [])

  return (
    <>
      <canvas style={{ background: "black"}} id="tutorial">
      Testing Canvas Drawing
     </canvas>
    </>
  )
}

export default App
