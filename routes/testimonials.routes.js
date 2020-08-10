const express = require('express');
const router = express.Router();
const db = require('./../db');
const { uuid } = require('uuidv4');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  for(let i = 0; i < db.testimonials.length; i++) {
    if(db.testimonials[i].id == req.params.id) {
      res.json(db.testimonials[i]);
    }
  }
});

router.route('/testimonials/random').get((req, res) => {
  const random = Math.floor(Math.random() * db.length);
  res.json(db.testimonials[random]);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newElement = {}
  newElement.id = uuid();
  newElement.author = author;
  newElement.text = text;
  db.testimonials.push(newElement);
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  for(let i = 0; i < db.testimonials.length; i++) {
    if(db.testimonials[i].id == req.params.id) {
      db.testimonials[i].author = author;
      db.testimonials[i].text = text;
    }
  }
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  for(let i = 0; i < db.length; i++) {
    if(db[i].id == req.params.id) {
      db.testimonials.splice(i, 1);
    }
  }
  res.json({message: 'OK'});
});

module.exports = router;