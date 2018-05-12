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
      createEventError: '',
      createEventModalOpen: false
    };
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModalOpenClose = this.handleModalOpenClose.bind(this);
    this.clearAllCreateEventInfo = this.clearAllCreateEventInfo.bind(this);
  }

  // load user events and info
  componentDidMount() {
    axios.get('/api/userEvents')
      .then(result => this.setState({events: result.data}));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleModalOpenClose () {
    let openCloseState = !this.state.createEventModalOpen
    this.clearAllCreateEventInfo();
    this.setState({ createEventModalOpen: openCloseState })
  }

  clearAllCreateEventInfo() {
    this.setState({
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: '',
      createEventError: '',
    })
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
        axios.get('/api/userEvents')
          .then(result => {
            this.setState({events: result.data});
            this.handleModalOpenClose();
          });
        // TODO: redirect to new board
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
          handleModalOpenClose={this.handleModalOpenClose}
          createEventError={this.state.createEventError}
          createEventModalOpen={this.state.createEventModalOpen}
          events={this.state.events}
        />
        <Dashboard 
          events={this.state.events}
        />
      </div>
   )}
}