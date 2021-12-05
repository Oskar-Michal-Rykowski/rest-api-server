const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const message = require('./message');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter((item) => item.id === req.params.id));
});

router.route('/concerts').post((req, res) => {
  const newTestimonial = {
    id: uuidv4(),
    ...req.body,
  };
  db.concerts.push(newTestimonial);
  res.json(message);
});

router.route('/concerts/:id').put((req, res) => {
  const editedTestimonial = db.concerts.find(
    (item) => item.id === req.params.id
  );
  const indexOfTestimonial = db.concerts.indexOf(editedTestimonial);
  const newTestimonial = {
    ...editedTestimonial,
    ...req.body,
  };
  db.concerts[indexOfTestimonial] = newTestimonial;
  res.json(message);
});

router.route('/concerts/:id').delete((req, res) => {
  const editedTestimonial = db.concerts.find(
    (item) => item.id === req.params.id
  );
  const indexOfTestimonial = db.concerts.indexOf(editedTestimonial);
  db.concerts.splice(indexOfTestimonial, 1);
  res.json(message);
});

module.exports = router;
