const canvas = document.getElementById('homecanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sizing canvas
const resizeCanvas = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  canvas.height = height;
  canvas.width = width;
}
window.addEventListener('resize', resizeCanvas);

// get mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/100) * (canvas.width/100)
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#0000ff';
    ctx.fill();
  }
  // particles within canvas
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    //set collision
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 1.5) {
        this.x += 1.5;
      }
      if (mouse.x > this.x && this.x > this.size * 1.5) {
        this.x -= 1.5;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 1.5) {
        this.y += 1.5;
      }
      if (mouse.y > this.y && this.y > this.size * 1.5) {
        this.y -= 1.5;
      }
    }
    // Move particle
    this.x += this.directionX / 2;
    this.y += this.directionY / 2;
    // draw particle
    this.draw();
  }
}

// create particle array
const init = () => {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 50000;
  // Set number of particles
  for (let i = 0; i < numberOfParticles/2; i++) {
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2) - (size * 2)) + size * 2)
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = '#0000ff'

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// animation loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

// draw line between particles
const connect = () => {
  let opacity;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
      + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      // setting lines length
      if (distance < (canvas.width/9) * (canvas.height/9)) {
        opacity = 1 - (distance/15000);
        ctx.strokeStyle=`rgba(0,0,255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }

  }
}

// mouse out event
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
})

// start canvas animation
init();
animate();


// modify animation on logo click
const logo = document.getElementById('logo')

const addParticles = () => {
  for (let i = 0; i < (Math.random() * 15); i++) {
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = '#0000ff'

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

const changeParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    const particle = particlesArray[i];
    const rndSize = (Math.random() * 3) + 1;
    particle.size = rndSize;
  }
}

logo.addEventListener('click', () => {
  addParticles();
  changeParticles();
});
