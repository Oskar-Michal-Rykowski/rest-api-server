const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);

router.get('/seats/:id', SeatsController.getOne);

router.post('/seats', SeatsController.createOne);

router.put('/seats/:id', SeatsController.changeOne);

router.delete('/seats/:id', SeatsController.deleteOne);

module.exports = router;
