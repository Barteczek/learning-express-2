const express = require('express');
const router = express.Router();
const db = require('./../db');
const { uuid } = require('uuidv4');


router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  for(let i = 0; i < db.seats.length; i++) {
    if(db.seats[i].id == req.params.id) {
      res.json(db.seats[i]);
    }
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  
  if(day && seat && client && email) {
    for(let i = 0; i < db.seats.length; i++) {
      if(db.seats[i].day == day && db.seats[i].seat == seat) {
        res.json({message: 'The slot is already taken...'});
      }
    }

    const newElement = {}
    newElement.id = uuid();
    newElement.day = day;
    newElement.seat = seat;
    newElement.client = client;
    newElement.email = email;

    db.seats.push(newElement);
    
    req.io.emit('seatsUpdated', db.seats);
    
  } else {
    res.json({message: 'Please fill all fields!'});
  }
  
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  for(let i = 0; i < db.seats.length; i++) {
    if(db.seats[i].id == req.params.id) {
      db.seats[i].day = day;
      db.seats[i].seat = seat;
      db.seats[i].client = client;
      db.seats[i].email = email;
    }
  }
  res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  for(let i = 0; i < db.length; i++) {
    if(db[i].id == req.params.id) {
      db.seats.splice(i, 1);
    }
  }
  res.json({message: 'OK'});
});

module.exports = router;