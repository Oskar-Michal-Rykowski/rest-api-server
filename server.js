const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

//show our react app in every link the server didn't match with any endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//other
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect(
  `mongodb+srv://${process.env.UserDB}:${process.env.PasswordDB}@cluster0.n6j0j.mongodb.net/NewWaveDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New Socket!');
  socket.on('seatsUpdated', (seats) => {
    socket.broadcast.emit('seatsUpdated', seats);
  });
});

module.exports = server;
