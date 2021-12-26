const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getOne);

router.post('/testimonials', TestimonialController.createOne);

router.put('/testimonials/:id', TestimonialController.changeOne);

router.delete('/testimonials/:id', TestimonialController.deleteOne);

module.exports = router;
