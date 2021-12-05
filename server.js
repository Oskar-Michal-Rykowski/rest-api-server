const express = require('express');
const { arch } = require('process');
const { v4: uuidv4 } = require('uuid');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

const message = { message: 'OK' };

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter((item) => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: uuidv4(),
    author: author,
    text: text,
  };
  db.push(newTestimonial);
  res.json(message);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const editedTestimonial = db.find((item) => item.id == req.params.id);
  const indexOfTestimonial = db.indexOf(editedTestimonial);
  const newTestimonial = {
    ...editedTestimonial,
    author: author,
    text: text,
  };
  db[indexOfTestimonial] = newTestimonial;
  res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
  const editedTestimonial = db.find((item) => item.id == req.params.id);
  const indexOfTestimonial = db.indexOf(editedTestimonial);
  db.splice(indexOfTestimonial, 1);
  res.json(message);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
