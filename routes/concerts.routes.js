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
  const newConcert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };
  db.concerts.push(newConcert);
  res.json(message);
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const editedConcert = db.concerts.find((item) => item.id === req.params.id);
  const indexOfConcert = db.concerts.indexOf(editedConcert);
  const newConcert = {
    ...editedConcert,
    ...(performer && { performer }),
    ...(genre && { genre }),
    ...(price && { price }),
    ...(day && { day }),
    ...(image && { image }),
  };
  db.concerts[indexOfConcert] = newConcert;
  res.json(message);
});

router.route('/concerts/:id').delete((req, res) => {
  const editedConcert = db.concerts.find((item) => item.id === req.params.id);
  const indexOfConcert = db.concerts.indexOf(editedConcert);
  db.concerts.splice(indexOfConcert, 1);
  res.json(message);
});

module.exports = router;
