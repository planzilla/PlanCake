import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';
import TopicBoardView from './BoardView.jsx'
import NavBar from '../header/NavBar.jsx';
import ContactInfo from '../footer/ContactInfo.jsx';
import { fetchPosts } from '../../actions/postActions.js';

export class LoggedInView extends Component {

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
      topicBoards: [{
        id: null,
        EventId: null,
        title: null,
        createdAt: null,
        updatedAt: null
      }],
      addTopicTitle: '',
      addTopicModalOpen: false,
      addTopicError: '',
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: '',
      createEventError: '',
      createEventModalOpen: false,
      view: 'dashboard',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTopicModalOpenClose = this.handleAddTopicModalOpenClose.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleCreateEventModalOpenClose = this.handleCreateEventModalOpenClose.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.clearAllCreateEventInfo = this.clearAllCreateEventInfo.bind(this);
    this.handleClickEventTitle = this.handleClickEventTitle.bind(this);
    this.handleBodyView = this.handleBodyView.bind(this);
    this.getInvites = this.getInvites.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.getInvites();
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearAllCreateEventInfo() {
    this.setState({
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: '',
      createEventError: '',
    })
  }

  handleClickEventTitle(event) {
    this.setState({ topicBoards: [] });
    axios.get(`/api/topicBoards?EventId=${event.id}`)
      .then(({ data }) => {
        this.setState({ topicBoards: data });
      });
  }

  /* -------------- AddTopic -------------- */
  handleAddTopicModalOpenClose() {
    let openCloseState = !this.state.addTopicModalOpen;
    this.clearAllCreateEventInfo();
    this.setState({ addTopicModalOpen: openCloseState });
  }

  handleAddTopic(e, eventId) {
    e.preventDefault();
    if (this.state.addTopicTitle === '') {
      this.setState({
        addTopicError: 'Please insert a discussion topic.'
      });
    } else {
      axios.post('/api/addTopicBoard', {
        eventId: eventId,
        addTopicTitle: this.state.addTopicTitle
      })
        .then((data) => {
          this.handleAddTopicModalOpenClose();
          axios.get(`/api/topicBoards?EventId=${eventId}`)
            .then(({ data }) => {
              this.setState({ topicBoards: data });
            });
        });
    }
  }

  /* ----------- CreateEvent ------------- */
  handleCreateEventModalOpenClose() {
    let openCloseState = !this.state.createEventModalOpen;
    this.clearAllCreateEventInfo();
    this.setState({ createEventModalOpen: openCloseState });
  }

  handleCreateEvent(e) {
    e.preventDefault();
    if (this.state.createEventTitle === '') {
      this.setState({
        createEventError: 'Please insert an event title.'
      });
    } else if (this.state.createEventLocation === '') {
      this.setState({
        createEventError: 'Please insert an event location.'
      })
    } else if (this.state.createEventEmails === '') {
      this.postCreateEvent();
    } else {
      let emails = this.state.createEventEmails.split(', ');
      this.validatedEmails(emails)
        ? this.postCreateEvent(emails)
        : this.setState({ createEventError: 'Please insert valid email addresses.' })
    }
  }

  postCreateEvent(emails) {
    return axios.post('/api/createEvent', {
      createEventTitle: this.state.createEventTitle,
      createEventLocation: this.state.createEventLocation
    })
      .then(({ data }) => {
        if (emails) {
          this.sendEmailInvites(emails, data);
        }
        return axios.get('/api/userEvents')
          .then(result => {
            this.setState({ events: result.data });
            this.handleCreateEventModalOpenClose();
          });
      })
      .catch((err) => {
        this.setState({
          createEventError: 'An error occurred. Please try again.'
        });
      })
  }

  validatedEmails(emails) {
    let validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (var i = 0; i < emails.length; i++) {
      let email = emails[i].trim();
      if (!validator.test(email)) {
        return false;
      }
    }
    return true;
  }

  /* ------------- Invites --------------- */
  getInvites(){
    return axios.get('/api/invites')
      .then(() => {console.log('in getinvites then')})
      .catch(err => {console.log('err in get invites', err)})
  }

  sendEmailInvites(emails, data) {
    return axios.post('/api/sendEmailInvites', {
      validatedEmails: emails,
      event: data
    })
  }

  /* -----------     View    ------------- */
  handleBodyView(e, view) {
    this.setState({ view: view })
  }

  renderView() {
    if (this.state.view === 'dashboard') {
      return (
        <Dashboard
          events={this.props.events.data}
        />
      )
    } else if (this.state.view === 'topicboardview') {
      return (
        <TopicBoardView
          userData={this.props.userData}
        />
      )
    }
  }


  /* ----------- Render ------------- */

  render() {
    if (this.state.events.length === 0) {
      return '...loading??';
    } else {
      return (
        <div className="dashboard grid">
          <NavBar view={this.state.view} />
          <SideBar
            topicBoards={this.state.topicBoards}
            handleInputChange={this.handleInputChange}
            handleAddTopic={this.handleAddTopic}
            handleAddTopicModalOpenClose={this.handleAddTopicModalOpenClose}
            addTopicModalOpen={this.state.addTopicModalOpen}
            addTopicError={this.state.addTopicError}
            handleCreateEvent={this.handleCreateEvent}
            handleCreateEventModalOpenClose={this.handleCreateEventModalOpenClose}
            createEventModalOpen={this.state.createEventModalOpen}
            createEventError={this.state.createEventError}
            handleClickEventTitle={this.handleClickEventTitle}
            events={this.props.events.data}
            handleBodyView={this.handleBodyView}
          />
          {this.renderView()}
          <div className="placeholder"></div>
          <ContactInfo />
        </div>
      )
    }
  }
}

// for redux but doesnt play along nicely so commented
// LoggedInView.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   events: PropTypes.array.isRequired,
//   newPost: PropTypes.object
// };

const mapStateToProps = state => ({
  events: state.posts.events,
  newEvent: state.posts.event
});

export default connect(mapStateToProps, { fetchPosts })(LoggedInView); 
