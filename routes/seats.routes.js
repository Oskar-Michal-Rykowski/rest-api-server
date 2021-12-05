const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const message = require('./message');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter((item) => item.id === req.params.id));
});

router.route('/seats/:id').post((req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    ...req.body,
  };
  db.seats.push(newTestimonial);
  res.json(message);
});

router.route('/seats/:id').put((req, res) => {
  const editedTestimonial = db.seats.find((item) => item.id === req.params.id);
  const indexOfTestimonial = db.seats.indexOf(editedTestimonial);
  const newTestimonial = {
    ...editedTestimonial,
    ...req.body,
  };
  db.seats[indexOfTestimonial] = newTestimonial;
  res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
  const editedTestimonial = db.seats.find((item) => item.id === req.params.id);
  const indexOfTestimonial = db.seats.indexOf(editedTestimonial);
  db.seats.splice(indexOfTestimonial, 1);
  res.json(message);
});

module.exports = router;
