// DOM elements
const grid = document.getElementById('grid');
const startBtn = document.getElementById('startlongest');
const form = document.getElementById('longestform');
const inputs = form.getElementsByTagName('input');
const playerInput = document.getElementById('longestinput');
const submit = document.getElementById('longestsubmit');
const player = document.getElementById('longestplayer');
const result = document.getElementById('longestresult');
const longestLatest = document.getElementById('longestlatest');
const longestTop = document.getElementById('longesttop');

let startAnswer;
let endAnswer;
let gridLetters = [];

const toggleInput = () => {
  inputs[0].formNoValidate = true;
  inputs[0].style.opacity = 1;
  inputs[1].disabled = Boolean(inputs[1].disabled) ? false : true;
  inputs[2].disabled = Boolean(inputs[2].disabled) ? false : true;
  result.style.display = 'none';
}
toggleInput();
form.style.opacity = 0.5;

// GET new grid longest_words
const newGrid = () => {
  startAnswer = new Date;
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
  startBtn.hidden = true;
}

startBtn.addEventListener('click', newGrid);

// inject grid letters
const appendLetters = (letters) => {
  letters.forEach(letter => {
    const element = document.createElement('span');
    element.classList.add('letter');
    element.textContent = letter;
    grid.appendChild(element);
  });
}

// highlight letter when typed
playerInput.addEventListener('keyup', () => {
  const lettersInput = playerInput.value.toUpperCase().split('');
  const letters = Array.from(document.querySelectorAll('.letter'));

  letters.forEach(letter => {
    if (lettersInput.includes(letter.innerHTML)) {
      const index = lettersInput.indexOf(letter.innerHTML);
      letter.classList.add("typed");
      lettersInput.splice(index, 1);
    } else  {
      letter.classList.remove("typed");
    }
  });

})
const highlightLetter = (letter) => {

}

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
    appendResult(response);
    result.style.display = '';
    startBtn.hidden = false;
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
  result.innerHTML = '';
  element.innerHTML = `${results.result} <br> Score: <strong>${results.score}</strong> Time: ${results.time/1000} seconds.`;
  result.appendChild(element);
}


async function getScores(url) {
  const response = await fetch(url);
  return response.json();
}

// latest games

getScores('https://julwicrapi.herokuapp.com/api/v1/longest_words')
.then(data => {
    for (let i = 0; i < 5; i++) {
      appendGames(longestLatest, data[i]);
    }
  });

// top games

getScores('https://julwicrapi.herokuapp.com/api/v1/longest_words/top').then(data => {
  data.forEach(game => {
    appendGames(longestTop, game);
  });
});


  // inject result function
const appendGames = (target, game) => {
  const element = document.createElement('div');
  element.classList.add('longest-word-result-item');
  element.innerHTML = `${game.player} scored: <strong>${game.score}</strong> in ${Math.round(game.time/1000)}s with ${game.answer.toUpperCase()}`;
  target.appendChild(element);
}
