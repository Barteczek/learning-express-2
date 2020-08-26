const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addElement = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    
    if(day && seat && client && email) {

      if(Seat.find({ day: { $eq: day }, seat: { $eq: seat}})) {
        res.json({message: 'The slot is already taken...'});
      }

      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      req.io.emit('seatsUpdated', req.body);
      console.log(req.body)
      res.json({ message: 'OK' });
    } else {
      res.json({message: 'Please fill all fields!'});
    }  

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.changeElement = async (req, res) => {
  const { day, seat, client, email  } = req.body;

  try {
    const seat = await(Seat.findById(req.params.id));
    if(seat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
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
    const seat = await(Seat.findById(req.params.id));
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};