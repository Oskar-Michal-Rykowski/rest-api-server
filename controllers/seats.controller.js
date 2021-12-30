const socket = require('socket.io');
const sanitize = require('mongo-sanitize');
const message = require('../controllers/message');
const server = require('../server');
const io = socket(server);
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const se = await Seat.findById(req.params.id);
    if (!se) res.status(404).json({ message: 'Not found' });
    else res.json(se);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createOne = async (req, res) => {
  try {
    const clean = sanitize(req.body);
    const { day, seat, client, email } = clean;

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
      const se = await Seat.find();
      req.io.emit('seatsUpdated', se);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
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
};

exports.deleteOne = async (req, res) => {
  try {
    const se = await Seat.findById(req.params.id);
    if (se) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(message);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
