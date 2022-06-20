const option = {
}


fetch('https://julwicrapi.herokuapp.com/api/v1/longest_words')
.then(response => response.json())
.then(data => console.log(data));
