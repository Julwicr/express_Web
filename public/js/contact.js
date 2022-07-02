const form = document.getElementById("form");
const notif = document.getElementById("form-status");
notif.style.opacity = '0';

    // message sent notification
    async function handleSubmit(event) {
      notif.style.opacity = '1';
      event.preventDefault();
      const data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          notif.innerHTML = "Message sent ✓";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              notif.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              notif.innerHTML = "Oops! There was a problem, please try again."
            }
          })
        }
      }).catch(error => {
        notif.innerHTML = "Oops! There was a problem, please try again."
      });
    }
    form.addEventListener("submit", handleSubmit)


// CANVAS

const canvas = document.getElementById('contactcanvas');
const ctx = canvas.getContext('2d');
let drawings = [];

const resizeCanvas = () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}
window.addEventListener('resize', () => {
  resizeCanvas();
  // solves issue of black drawings when resized
  canvasSetting('green', 'blue', 'green', 0.8, 0.6, 0.2);

  drawDrawing(10);
});
resizeCanvas();

// canvas settings

const canvasSetting = (fillC, shadowC, strokeC, fillA, shadowA, strokeA) => {
  function setColor(color) {
    switch (color) {
      case 'red':
      return '255, 0, 0';
      case 'green':
      return '0, 255, 0';
      case 'blue':
      return '0, 0, 255';
    }
  }
  ctx.fillStyle = `rgba(${setColor(fillC)}, ${fillA})`;
  ctx.shadowColor = `rgba(${setColor(shadowC)}, ${shadowA})`;
  ctx.strokeStyle = `rgba(${setColor(strokeC)}, ${strokeA})`;

  ctx.globalCompositeOperation = 'destination-over';
  ctx.lineWidth = 0.2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 2;
}

canvasSetting('blue', 'green', 'blue', 0.4, 0.8, 0.1);

// Generate random drawings

class Drawing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = {
      x: Math.random() * 4 - 3,
      y: Math.random() * 4 - 3
    };
    this.maxSize = Math.random() * 10 + 40;
    this.size = Math.random() * 1 + 1;
    this.vs = Math.random() * 0.2 + 0.4;
    this.angleX = Math.random() * 6;
    this.vax = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6;
    this.vay = Math.random() * 0.6 - 0.3;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.01;
  }

  update() {
    this.x += this.speed.x + Math.sin(this.angle);
    this.y += this.speed.y + Math.sin(this.angle);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    this.angle += this.va;
    if (this.size < this.maxSize) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillRect(0, 0, this.size, this.size);
      ctx.strokeRect(0, 0, this.size, this.size);
      requestAnimationFrame(this.update.bind(this));
      ctx.restore();
    }
  }
}

const drawDrawing = (number) => {
  for (let i = 0; i < number; i++) {
    const spawn = {
      x: (innerWidth/10) + Math.random() * (innerWidth - (innerWidth/5)),
      y: (innerHeight/10) + Math.random() * (innerHeight - (innerHeight/5))
    };
    const drawing = new Drawing(spawn.x, spawn.y);
    drawing.update();
    drawings.push(drawing);
  }
}

const onloadDrawings = innerWidth / innerHeight * 10
// drawDrawing(onloadDrawings); OFF

// Refires existing
const redrawDrawing = () => {
  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i];
    drawing.size = Math.random() * 5;
    drawing.angle += Math.random() * 90;
    drawing.x += Math.random() * 25;
    drawing.y += Math.random() * 10;
    drawing.update();
  }
}

form.addEventListener('keyup', () => redrawDrawing());


// Draw on click

class Draw {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 1;
    // this.vs = Math.random() * 0.2 + 0.4;
    // this.angleX = Math.random() * 6;
    // this.vax = Math.random() * 0.6 - 0.3;
    // this.angleY = Math.random() * 6;
    // this.vay = Math.random() * 0.6 - 0.3;
    this.angle = 0;
    // this.va = Math.random() * 0.1 + 0.01;
  }

  draw() {
    const height = this.size * Math.cos(Math.PI / 6);
    const start = {
      x: this.x - (this.size/2),
      y: this.y + height / 2,
    }

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x + this.size, start.y);
    ctx.lineTo(start.x + (this.size / 2), start.y - height);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    console.log('updated');
    // this.size ++;

    // this.angle ++;

    // ctx.save();
    // ctx.rotate(this.angle);
    // this.draw();
    // requestAnimationFrame(this.update.bind(this));
    // ctx.restore();
  }
}



let isDrawing = false;
let userDraw = [];

const userDrawing = (e) => {
  if (!isDrawing) return
  const draw = new Draw(e.x, e.y);
  draw.draw();
  userDraw.push(draw);
}

const updateDraw = () => {
  userDraw.forEach(draw => {
      console.log('update function');
      draw.update;
  });
};

addEventListener('mousedown', () => isDrawing = true);
addEventListener('mouseup', () => isDrawing = false);
addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('mousemove', (e) => {
  userDrawing(e);
  updateDraw();
});

canvas.addEventListener('mouseup', () => console.log(userDraw));
