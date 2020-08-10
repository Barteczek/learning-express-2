const express = require('express');
const router = express.Router();
const db = require('./../db');
const { uuid } = require('uuidv4');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  for(let i = 0; i < db.concerts.length; i++) {
    if(db.concerts[i].id == req.params.id) {
      res.json(db.concerts[i]);
    }
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  
  const newElement = {}
  newElement.id = uuid();
  newElement.performer = performer;
  newElement.genre = genre;
  newElement.price = price;
  newElement.day = day;
  newElement.image = image;

  db.concerts.push(newElement);
  res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  for(let i = 0; i < db.concerts.length; i++) {
    if(db.concerts[i].id == req.params.id) {
      db.concerts[i].performer = performer;
      db.concerts[i].genre = genre;
      db.concerts[i].price = price;
      db.concerts[i].day = day;
      db.concerts[i].image = image;
    }
  }
  res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
  for(let i = 0; i < db.length; i++) {
    if(db[i].id == req.params.id) {
      db.concerts.splice(i, 1);
    }
  }
  res.json({message: 'OK'});
});

module.exports = router;