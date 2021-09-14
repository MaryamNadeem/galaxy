import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

let canvas, context, particles;
let radians = 0;
let alpha = 1;
let mouseDown = false;
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
function App() {
  useEffect(() => {
    canvas = document.getElementById('canvas1');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();
  }, []);

  const init = () => {
    particles = [];
    for (let i = 0; i < 400; i++) {
      // will be getting a value from zero to the width of the canvas
      // we did canvas.width/2 subrartion beacuse we are translating
      const canvasWidth = canvas.width + 300; // because we are seeing empty edges during rotation
      const canvasHeight = canvas.height + 300;
      const x = Math.random() * canvasWidth - canvasWidth / 2;
      const y = Math.random() * canvasHeight - canvasHeight / 2;
      const radius = 2 * Math.random();
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, radius, color));
    }
  };
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  window.addEventListener('mousedown', () => {
    mouseDown = true;
  });
  window.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    context.fillStyle = `rgba(10, 10,10, ${alpha})`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(radians);
    particles.forEach(particle => {
      particle.draw();
    });
    context.restore();

    radians += 0.003;
    if (mouseDown && alpha >= 0.03) {
      alpha -= 0.01;
    } else if (!mouseDown && alpha < 1) {
      alpha += 0.01;
    }
  };

  class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.shadowColor = this.color;
      context.shadowBlur = 15;
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }
  }
  return (
    <div className="App">
      <canvas id="canvas1"></canvas>
    </div>
  );
}

export default App;
