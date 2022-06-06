const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'public/views');

const PORT = process.env.PORT || 3000;

// Listening
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/about', (req, res) => {
  res.render('/about');
});

// Set static folder
// app.use(express.static(path.join(__dirname, './views/public')));

// 404 not found
app.use((req, res) => {
  res.status(404).render('404');
});
