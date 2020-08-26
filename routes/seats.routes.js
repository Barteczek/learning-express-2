const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById); 

router.post('/seats', SeatController.addElement); 

router.put('/seats/:id', SeatController.changeElement);

router.delete('/seats/:id', SeatController.deleteElement);

module.exports = router;