const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getById); 

router.get('/testimonials/random', TestimonialController.getRandom);

router.post('/testimonials', TestimonialController.addElement); 

router.put('/testimonials/:id', TestimonialController.changeElement);

router.delete('/testimonials/:id', TestimonialController.deleteElement);

module.exports = router;