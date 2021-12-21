const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const message = require('./message');
const server = require('../server');
const socket = require('socket.io');
const io = socket(server);

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter((item) => item.id === req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };
  if (
    db.seats.some(
      (seat) => seat.day == newSeat.day && seat.seat == newSeat.seat
    )
  ) {
    res.json({ message: 'The slot is already taken...' });
  } else {
    db.seats.push(newSeat);
    res.json(message);
    //adding event emiter all clients
    io.on('connection', (socket) => {
      socket.on('seatsUpdated', () => {
        socket.broadcast.emit('seatsUpdated', db.seats);
      });
    });
  }
  //Dlaczego poniższy kod nie działa? Czy chodzi o to że this się gdzieś zapodział?
  // function seatBooked(element) {
  //   element.day == newSeat.day && element.seat == newSeat.seat;
  // }
  // if (db.seats.some(seatBooked,db.seats)) {
  //   res.json({ message: 'The slot is already taken...' });
  // } else {
  //   db.seats.push(newSeat);
  //   res.json(message);
  // }
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
