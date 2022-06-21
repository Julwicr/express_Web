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
sendMessage = document.getElementById('send-message');
let toggle = 0;
sendMessage.addEventListener('click', (event) => {
  if (toggle === 0) {
    form.style.transform = 'translateY(0px)';
    form.style.opacity = '1';
    toggle++;
    setFilter(120);
    setContactBg(x, y);
  } else {
    form.style.transform = 'translateY(-300px)';
    form.style.opacity = '0';
    toggle--;
    setFilter(0);
  }
})

// change color
const setFilter = (x) => document.body.style.filter = `hue-rotate(${x}deg)`;

// background contact
const contactBg = document.getElementById('contact');
const formInput = document.getElementsByClassName('form-input');

const setContactBg = (x, y) => {
  contactBg.style.backgroundImage = 'linear-gradient(#0000ff 1px, transparent 1px), linear-gradient(95deg, #0000ff 1px, transparent 1px)';
  contactBg.style.backgroundSize = `100px 15px, ${x}px ${y}px, 20px 20px, 20px 20px`;
};

let x = 3;
let y = 15;

for (let i = 0; i < formInput.length; i++) {
  const input = formInput[i];
  input.addEventListener('keyup', (e) => {
    setContactBg(x, y);
    x > 15 ? x = 3 : x++;
    y > 100 ? y = 15 : y += 5;
  });
}


// CANVAS

const rndRgb = () => {
  const rnd = Math.floor(Math.random() * 3);
  switch (rnd) {
   case 0:
     return '#ff0000';
     break;
   case 1:
     return '#00ff00';
     break;
   case 2:
     return '#0000ff';
     break;
  }
 }

 
const canvas = document.getElementById('contactcanvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

ctx.globalCompositeOperation = 'destination-over';
ctx.lineWidth = 0.5;
ctx.fillStyle = rndRgb();
ctx.strokeStyle = rndRgb();

ctx.shadowOffsetY = 5;
ctx.shadowBlur = 3;
ctx.shadowColor = 'rgba(255,0,0,0.7)';

class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = {
      x: Math.random() * 4 - 2,
      y: Math.random() * 4 - 2
    };
    this.maxSize = Math.random() * 7 + 50;
    this.size = Math.random() * 1 + 2;
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

for (let i = 0; i < 30; i++) {
  const spawn = {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight
  }
  const root = new Root(spawn.x, spawn.y);
  root.update();
}
