import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';

import './SeatChooser.scss';

import io from 'socket.io-client';

class SeatChooser extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io('localhost:8000');
    this.state = {
      seatsNumber: 50,
      emptySeats: {}
    }
  }

  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    loadSeats();
    this.socket.on('seatsUpdated', (seats) => {
      loadSeatsData(seats);
      this.seatsCounter(seats);
    });
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  seatsCounter = (seats) => {
    const emptySeats = {
      1: this.state.seatsNumber - seats.filter((element) => element.day === 1).length,
      2: this.state.seatsNumber - seats.filter((element) => element.day === 2).length,
      3: this.state.seatsNumber - seats.filter((element) => element.day === 3).length,
    }
    
    this.setState({emptySeats})
  }

  render() {

    const { prepareSeat } = this;
    const { requests, loadSeatsData, chosenDay } = this.props;

    this.socket.on('seatsUpdated', (seats) => {
      loadSeatsData(seats);
      this.seatsCounter(seats);
      
    });

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(this.state.seatsNumber)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        <h4>{`Free seats ${this.state.emptySeats[chosenDay]}/${this.state.seatsNumber}`}</h4>
      </div>
    )
  };
}

export default SeatChooser;