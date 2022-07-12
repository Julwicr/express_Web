const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// Listening
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/works', (req, res) => {
  res.render('works');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// 404 not found
app.use((req, res) => {
  res.status(404).render('404');
});
