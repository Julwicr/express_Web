const canvas = document.getElementById('homecanvas');
const ctx = canvas.getContext('2d');
const frame = document.getElementsByClassName('canvas-container');

// resizing canvas

let height = frame[0].clientHeight;
let width = frame[0].clientWidth;

const resizeCanvas = () => {
  let height = frame[0].clientHeight;
  let width = frame[0].clientWidth;
  canvas.height = height;
  canvas.width = width;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', () => {
  // console.log(getRandomInt(2))
  if (getRandomInt(5) == 1) {
    const rndx = getRandomInt(width);
    const rndy = getRandomInt(height);
    moveCircles(ctx, rndx, rndy, getRandomInt(5));
  } else {

  }
})

document.addEventListener('click', () => {
  console.log('hey', frame[0].style.display)
  frame[0].style.display = "none";
})



// Set line width
ctx.lineWidth = 15;

const moveCircles = (ctx, x, y, z) => {
  ctx.beginPath();
  ctx.arc(x, y, z, 0, 2 * Math.PI);
  ctx.stroke();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
