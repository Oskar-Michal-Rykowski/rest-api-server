const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const message = require('./message');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter((item) => item.id === req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    author,
    text,
  };
  db.testimonials.push(newTestimonial);
  res.json(message);
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const editedTestimonial = db.testimonials.find(
    (item) => item.id === req.params.id
  );
  const indexOfTestimonial = db.testimonials.indexOf(editedTestimonial);
  const newTestimonial = {
    ...editedTestimonial,
    ...(author && { author }),
    ...(text && { text }),
  };
  db.testimonials[indexOfTestimonial] = newTestimonial;
  res.json(message);
});

router.route('/testimonials/:id').delete((req, res) => {
  const editedTestimonial = db.testimonials.find(
    (item) => item.id === req.params.id
  );
  const indexOfTestimonial = db.testimonials.indexOf(editedTestimonial);
  db.testimonials.splice(indexOfTestimonial, 1);
  res.json(message);
});

module.exports = router;
