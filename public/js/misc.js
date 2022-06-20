// GET new grid longest_words
// const newGrid = fetch('https://julwicrapi.herokuapp.com/api/v1/longest_words/new')
// .then(response => response.json())
// .then(data => console.log(data));

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

postAnswer('https://julwicrapi.herokuapp.com/api/v1/longest_words', requestOptions)
.then(response => {
  console.log(response);
}).catch(error => {
  console.log('ERROR', error);
});
