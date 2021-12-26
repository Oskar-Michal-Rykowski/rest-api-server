const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const socket = require('socket.io');

const db = require('../db');
const message = require('./message');
const server = require('../server');
const io = socket(server);
const Seat = require('../models/seat.model');

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const se = await Seat.findById(req.params.id);
    if (!se) res.status(404).json({ message: 'Not found' });
    else res.json(se);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const seatAlreadyTaken = await Seat.findOne({ day: day, seat: seat });

    if (seatAlreadyTaken) {
      res.json({ message: 'The slot is already taken...' });
    } else {
      const newSeat = new Seat({
        day,
        seat,
        client,
        email,
      });
      await newSeat.save();
      res.json(message);
      //adding event emiter all clients
      req.io.emit('seatsUpdated', db.seats);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/seats/:id', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const se = await Seat.findById(req.params.id);
    if (se) {
      await Seat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            ...(day && { day }),
            ...(seat && { seat }),
            ...(client && { client }),
            ...(email && { email }),
          },
        }
      );
      res.json(message);
      // const newSeat = {
      // db.seats[indexOfSeat] = newSeat;
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/seats/:id', async (req, res) => {
  try {
    const se = await Seat.findById(req.params.id);
    if (se) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(message);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
