import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';
import axios from 'axios';

export default class LoggedInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [{
        id: '',
        title: '',
        location: '',
        createdAt: '',
        updatedAt: ''
      }],
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: '',
      createEventError: ''
    };
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // load user events and info
  componentDidMount() {
    axios.get('/api/userEvents')
    .then(result => this.setState({events: result.data}));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCreateEvent(event) {
    event.preventDefault();
    if (this.state.createEventTitle === '') {
      this.setState({
        createEventError: 'Please insert an event title.'
      })
    } else if (this.state.createEventLocation === '') {
      this.setState({
        createEventError: 'Please insert an event location.'
      })
    }else {
      axios.post('/api/createEvent', {
        createEventTitle: this.state.createEventTitle,
        createEventLocation: this.state.createEventLocation
      })
      .then((data) => {
        console.log('data line 30 logginedinview', data)
        // TODO: close modal and redirect to new board
      })
      .catch((err) => {
        this.setState({
          createEventError: 'An error occurred. Please try again.'
        });
      })
    }
  }

  render() {
   return (
    <div className="dashboard grid">
        <SideBar
          handleCreateEvent={this.handleCreateEvent}
          handleInputChange={this.handleInputChange}
          createEventError={this.state.createEventError}
          events={this.state.events}
        />
        <Dashboard />
      </div>
   )}
}