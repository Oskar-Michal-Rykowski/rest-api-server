const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
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
