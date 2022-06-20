// DOM elements
const grid = document.getElementById('grid');
const startBtn = document.getElementById('startlongest');
const form = document.getElementById('longestform');
const inputs = form.getElementsByTagName('input');
const playerInput = document.getElementById('longestinput');
const submit = document.getElementById('longestsubmit');
const player = document.getElementById('longestplayer');
const result = document.getElementById('longestresult');
const longesLatest = document.getElementById('longestlatest');

let startAnswer;
let endAnswer;
let gridLetters = [];

const toggleInput = () => {
  inputs[0].formNoValidate = true;
  inputs[0].style.opacity = 1;
  inputs[1].disabled = Boolean(inputs[1].disabled) ? false : true;
  inputs[2].disabled = Boolean(inputs[2].disabled) ? false : true;
}
toggleInput();
form.style.opacity = 0.5;

// GET new grid longest_words
const newGrid = () => {
  startAnswer = new Date;
  console.log(startAnswer);
  grid.style.opacity = 1;
  grid.innerHTML = '';
  fetch('https://julwicrapi.herokuapp.com/api/v1/longest_words/new')
  .then(response => response.json())
  .then(data => {
    appendLetters(data);
    gridLetters = data;
  });
  toggleInput();
  form.style.opacity = 1;
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

// getting the answer
form.addEventListener('submit', (e) => {
  endAnswer = new Date;
  e.preventDefault();

  const answer = {
    player: player.value,
    answer: playerInput.value,
    grid: gridLetters,
    time: (endAnswer - startAnswer)
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answer)
  };

  // POST longest_words
  postAnswer('https://julwicrapi.herokuapp.com/api/v1/longest_words', requestOptions)
  .then(response => {
    console.log(response);
    appendResult(response);
  }).catch(error => {
    console.log('ERROR', error);
  });
  toggleInput();
})


async function postAnswer(url, request) {
  const response = await fetch(url, request);
  return response.json();
}

// inject result function
const appendResult = (results) => {
  const element = document.createElement('div');
  element.classList.add('longest-word-result-item');
  element.innerHTML = `${results.result} <br> Score: <strong>${results.score}</strong> Time: ${results.time/1000} seconds.`;
  result.appendChild(element);
}


// latest games

fetch('https://julwicrapi.herokuapp.com/api/v1/longest_words')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 5; i++) {
      appendLatestGame(data[i]);
    }
  });

  // inject result function
const appendLatestGame = (game) => {
  const element = document.createElement('div');
  element.classList.add('longest-word-result-item');
  element.innerHTML = `${game.player} - Score: ${game.score} Time: ${game.time/1000} seconds.`;
  longesLatest.appendChild(element);
}
