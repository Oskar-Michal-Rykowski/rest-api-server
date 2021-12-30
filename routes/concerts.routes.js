const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id', ConcertsController.getOne);

router.get('/concerts/performer/:performer', ConcertsController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getByGenre);

router.get(
  '/concerts/price/:price_min/:price_max',
  ConcertsController.getByPrice
);

router.get('/concerts/day/:day', ConcertsController.getByDay);

router.post('/concerts', ConcertsController.createOne);

router.put('/concerts/:id', ConcertsController.changeOne);

router.delete('/concerts/:id', ConcertsController.deleteOne);

module.exports = router;
