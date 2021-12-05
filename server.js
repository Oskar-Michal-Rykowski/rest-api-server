const express = require('express');
const app = express();
const cors = require('cors');

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

//other
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
