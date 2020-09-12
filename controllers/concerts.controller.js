const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const concertsDB = await Concert.find();
    const seats = await Seat.find();
    const emptySeats = {
      1: 50 - seats.filter((element) => element.day === 1).length,
      2: 50 - seats.filter((element) => element.day === 2).length,
      3: 50 - seats.filter((element) => element.day === 3).length,
    }
    const concerts = [];
    
    concertsDB.forEach(element => {
      const el = {
        performer: element.performer,
        price: element.price,
        genre: element.genre,
        day: element.day,
        image: element.image,
        seats: emptySeats[element.day],
      }
      concerts.push(el)   
    });

    res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addElement = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = sanitize(req.body);
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeElement = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const concert = await(Concert.findById(req.params.id));
    if(concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteElement = async (req, res) => {
  try {
    const concert = await(Concert.findById(req.params.id));
    if(concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};