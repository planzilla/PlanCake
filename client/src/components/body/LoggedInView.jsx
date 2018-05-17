import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../header/NavBar.jsx';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, createPost } from '../../actions/postActions.js';
import EventSummary from './EventSummary.jsx';
import TopicBoardView from './BoardView.jsx'
import ContactInfo from '../footer/ContactInfo.jsx';

export class LoggedInView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEvent: {},
      currentTodo: {},
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
      todos: [{
        id: null,
        text: null,
        completed: null,
        EventId: null,
        UserId: null,
        AssignerId: null,
        deadline: null
      }],
      addTopicTitle: '',
      addTopicModalOpen: false,
      addTopicError: '',
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: '',
      createEventError: '',
      createEventModalOpen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTopicModalOpenClose = this.handleAddTopicModalOpenClose.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleCreateEventModalOpenClose = this.handleCreateEventModalOpenClose.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.clearAllCreateEventInfo = this.clearAllCreateEventInfo.bind(this);
    this.handleClickEventTitle = this.handleClickEventTitle.bind(this);
    this.getInvites = this.getInvites.bind(this);
  }

  componentDidMount() {
    // this.props.fetchPosts();
    axios.get('/api/userEvents')
      .then(result => {
        this.setState({ events: result.data });
      });
    axios.get('/api/todos')
      .then(result => {
        console.log('todos in LIV: ', result.data);
        this.setState({ todos: result.data });
      });
    this.getInvites();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.events !== nextProps.events) {
  //     this.props.fetchPosts();
  //   }
  // }


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

  /* --------------- EventSummary ------------*/

  handleClickEventTitle(event) {
    this.setState({ topicBoards: [] });
    this.setState({ currentEvent: event });
    // console.log('event id is: ', event);
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
      });
    // *-----if redux-----* //
    // } else {
    //   this.props.createPost({
    //     createEventTitle: this.state.createEventTitle,
    //     createEventLocation: this.state.createEventLocation
    //   })
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

  /* ----------- Render ------------- */

  render() {
    // if (this.state.events.length === 0) {
    //   return '...loading??';
    // } else {
      return (
        <BrowserRouter>
          <div className="dashboard grid">
          <NavBar setUser={this.setUser} view={this.state.view} />
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
            events={this.state.events}
          />

        <div className="placeholder">placeholder</div>

          <Route path="/loggedinview" render={() => 
            <Dashboard 
              events={this.state.events} 
              handleClickEventTitle={this.handleClickEventTitle}
              todos={this.state.todos}
              /> } />
          <Route path="/events/:id" render={() => 
            <EventSummary 
              topicBoards={this.state.topicBoards}  
              event={this.state.currentEvent} 
              todos={this.state.todos}
            /> } 
          />
          <Route path="/board/:id" render={() => 
            <TopicBoardView
              topicBoards={this.state.topicBoards}
              userData={this.props.userData}
            /> }
          />

          <Link to="/loggedinview">events here</Link>
          <Link to="/events/:eventId">eventpage</Link>
          <ContactInfo />
          </div>
        </BrowserRouter>
      )
    }
  }
// }

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

export default connect(mapStateToProps, { fetchPosts, createPost })(LoggedInView); 
