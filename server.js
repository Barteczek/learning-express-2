const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const socket = require('socket.io');
const helmet = require('helmet');

// connects our backend code with the database
mongoose.connect(`mongodb+srv://${process.env.dblogin}:${process.env.dbpass}@cluster0.jt1hf.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true });

//local DB
// mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(helmet());

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const io = socket(server);


io.on('connection', (socket) => {
  console.log('New socket');
  
  socket.on('seatsUpdated', () => {
    socket.emit('seatsUpdated')
  });
});

module.exports = server;