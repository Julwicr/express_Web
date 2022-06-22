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

// Toggle form
// sendMessage = document.getElementById('send-message');
// let toggle = 0;
// sendMessage.addEventListener('click', (event) => {
//   if (toggle === 0) {
//     form.style.transform = 'translateY(0px)';
//     form.style.opacity = '1';
//     toggle++;
//   } else {
//     form.style.transform = 'translateY(-300px)';
//     form.style.opacity = '0';
//     toggle--;
//   }
// })


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
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 2;
}

canvasSetting('green', 'blue', 'green', 0.8, 0.6, 0.2);



class Drawing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = {
      x: Math.random() * 4 - 2,
      y: Math.random() * 4 - 2
    };
    this.maxSize = Math.random() * 10 + 40;
    this.size = Math.random() * 1 + 3;
    this.vs = Math.random() * 0.2 + 0.5;
    this.angleX = Math.random() * 6.2;
    this.vax = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6.2;
    this.vay = Math.random() * 0.6 - 0.3;
    this.angle = 0;
    this.va = Math.random() * 0.2 + 0.08;
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

const drawDrawings = (x, y, times) => {
  for (let i = 0; i < times; i++) {
    const drawing = new Drawing(x, y);
    drawing.update();
    drawings.push(drawing);
  }
}


// Refires existing
const redrawDrawing = () => {
  for (let i = 0; i < drawings.length; i++) {
    const drawing = drawings[i];
    drawing.size = Math.random() * 20;
    drawing.angle = Math.random() * 50;
    drawing.x += Math.random() * 250;
    drawing.y += Math.random() * 100;
    drawing.update();
  }
}

form.addEventListener('keyup', () => redrawDrawing());

canvas.addEventListener('click', (e) => drawDrawings(e.x, e.y - (innerHeight / 35), 4));

const onloadDrawings = innerWidth / innerHeight * 5
drawDrawing(onloadDrawings);
