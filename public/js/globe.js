document.addEventListener('mousemove', () => {
  // console.log(getRandomInt(2))
  if (getRandomInt(5) == 1) {
    const rndten = getRandomInt(1000);
    const rndtwo = getRandomInt(1000);
    moveCircles(ctx, rndten, rndtwo, getRandomInt(5));
  } else {

  }
})

document.addEventListener('click', () => {
  console.log('hey', frame[0].style.display)
  frame[0].style.display = "none";
})

const canvas = document.getElementById('homecanvas');
const ctx = canvas.getContext('2d');

const frame = document.getElementsByClassName('canvas-container')

const height = frame[0].clientHeight;
const width = frame[0].clientWidth;
canvas.height = height;
canvas.width = width;


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
