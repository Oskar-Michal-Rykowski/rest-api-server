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

router.route('/seats').post((req, res) => {
  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };
  db.seats.push(newSeat);
  res.json(message);
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const editedSeat = db.seats.find((item) => item.id === req.params.id);
  const indexOfSeat = db.seats.indexOf(editedSeat);
  const newSeat = {
    ...editedSeat,
    ...(day && { day }),
    ...(seat && { seat }),
    ...(client && { client }),
    ...(email && { email }),
  };
  db.seats[indexOfSeat] = newSeat;
  res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
  const editedSeat = db.seats.find((item) => item.id === req.params.id);
  const indexOfSeat = db.seats.indexOf(editedSeat);
  db.seats.splice(indexOfSeat, 1);
  res.json(message);
});

module.exports = router;
