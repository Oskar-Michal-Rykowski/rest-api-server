const express = require('express');
const { arch } = require('process');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

const message = { message: 'OK' };

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter((item) => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: uuidv4(),
    author: author,
    text: text,
  };
  db.testimonials.push(newTestimonial);
  res.json(message);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const editedTestimonial = db.testimonials.find(
    (item) => item.id == req.params.id
  );
  const indexOfTestimonial = db.testimonials.indexOf(editedTestimonial);
  const newTestimonial = {
    ...editedTestimonial,
    author: author,
    text: text,
  };
  db.testimonials[indexOfTestimonial] = newTestimonial;
  res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
  const editedTestimonial = db.testimonials.find(
    (item) => item.id == req.params.id
  );
  const indexOfTestimonial = db.testimonials.indexOf(editedTestimonial);
  db.testimonials.splice(indexOfTestimonial, 1);
  res.json(message);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
