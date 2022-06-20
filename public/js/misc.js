// DOM elements
const grid = document.getElementById('grid');
const startBtn = document.getElementById('startlongest');

let startAnswer;
let endAnswer;


// GET new grid longest_words
const newGrid = () => {
  startAnswer = new Date;
  console.log(startAnswer);
  grid.style.opacity = 1;
  grid.innerHTML = '';
  fetch('https://julwicrapi.herokuapp.com/api/v1/longest_words/new')
  .then(response => response.json())
  .then(data => appendLetters(data));
}

// inject grid letters
const appendLetters = (letters) => {
  letters.forEach(letter => {
    const element = document.createElement('span');
    element.classList.add('letter');
    element.textContent = letter;
    grid.appendChild(element);
  });
}

startBtn.addEventListener('click', newGrid);

const answer = {
  player: "10heure57",
  answer: "HELLO",
  grid: ["A", "B", "E", "H", "L", "L", "O", "K", "V"],
  time: 60000
}

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(answer)
};

// POST longest_words
async function postAnswer(url, request) {
  const response = await fetch(url, request);
  return response.json();
}

// postAnswer('https://julwicrapi.herokuapp.com/api/v1/longest_words', requestOptions)
// .then(response => {
//   console.log(response);
// }).catch(error => {
//   console.log('ERROR', error);
// });
