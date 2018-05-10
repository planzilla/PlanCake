import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';

export default class LoggedInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: ''
    };
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCreateEvent(event) {
    event.preventDefault();
    console.log(this.state);
    axios.post('/api/createEvent', {
      createEventTitle: this.state.createEventEmails,
      createEventLocation: this.state.createEventLocation
    })
      .then((data) => {
        // TODO: close modal and redirect to new board
      })
      .catch((err) => {
        // TODO: give error in modal
      })
  }

  render() {
   return (
    <div className="dashboard grid">
        <SideBar
          handleCreateEvent={this.handleCreateEvent}
          handleInputChange={this.handleInputChange}
        />
        <Dashboard />
      </div>
   )}
}