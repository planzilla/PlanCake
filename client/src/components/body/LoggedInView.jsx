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
      invites: [], //array of events
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
      groupTodos: [], //array of objects of todos
      addTopicTitle: '',
      addTopicModalOpen: false,
      addTopicError: '',
      createEventTitle: '',
      createEventLocation: '',
      createEventEmails: '',
      createEventError: '',
      createEventModalOpen: false,
      selected: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTopicModalOpenClose = this.handleAddTopicModalOpenClose.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleCreateEventModalOpenClose = this.handleCreateEventModalOpenClose.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.clearAllCreateEventInfo = this.clearAllCreateEventInfo.bind(this);
    this.handleClickEventTitle = this.handleClickEventTitle.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.getInvitesByUserId = this.getInvitesByUserId.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.ignoreInvite = this.ignoreInvite.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userEvents')
      .then(result => {
        this.setState({ events: result.data });
      });
      
    axios.get('/api/todos')
      .then(result => {
        // console.log('todos in LIV: ', result.data);
        this.setState({ todos: result.data });
      });

    axios.get('/api/invitesByEmail')
      .then(({ data }) => {
        this.setState({ invites: data })
      })
      .catch(err => {console.log('err in get invites', err)})
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
    axios.get(`/api/topicBoard?EventId=${event.id}`)
      .then(({ data }) => {
        this.setState({ topicBoards: data });
      });

    axios.get(`/api/groupTodo?EventId=${event.id}`)
    .then(({ data }) => {
      this.setState({groupTodos: data});
    })
    .catch(err => {console.log('err in grouptodo', err)})
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
          axios.get(`/api/topicBoard?EventId=${eventId}`)
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
      })
      .then(result => {
        this.setState({ events: result.data });
        this.handleCreateEventModalOpenClose();
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
  getInvitesByUserId() {
    return axios.get('/api/invitesByUserId')
      .then(({ data }) => {
        this.setState({ invites: data })
      })
      .catch(err => {console.log('err in get invites', err)})
  }

  sendEmailInvites(emails, data) {
    return axios.post('/api/sendEmailInvites', {
      validatedEmails: emails,
      event: data
    })
  }

  acceptInvite(EventId) {
    return axios.patch(`/api/acceptInvite/?EventId=${EventId}`)
      .then(() => {
        this.getInvitesByUserId();
        return axios.post(`/api/addUserToEvent`, {id: EventId})
      })
      .then(() => {
        return axios.get('/api/userEvents')
      })
      .then(result => {
        this.setState({ events: result.data });
      })
      .catch(err => { console.log(err) })
  }

  ignoreInvite(EventId) {
    return axios.patch(`/api/ignoreInvite/?EventId=${EventId}`)
      .then(() => {
        this.getInvitesByUserId();
      })
      .catch(err => { console.log(err) })
  }

  /* ----------- Render ------------- */

  /* -----------  MISC  ------------- */

  setLoggedIn(selected) {
    this.setState({ selected: selected });
  }

  render() {
    // if (this.state.events.length === 0) {
    //   return '...loading??';
    // } else {
      return (
        <BrowserRouter>
          <div className="dashboard grid">
          <NavBar 
            view={this.state.view}
            invites={this.state.invites}
            acceptInvite={this.acceptInvite}
            ignoreInvite={this.ignoreInvite}
            setUser={this.setUser} 
            view={this.props.userData.username}
            userData={this.props.userData}
            />
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
            setLoggedIn={this.setLoggedIn}
          />

        <div className="placeholder"></div>

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
            groupTodos={this.state.groupTodos}
            /> } 
          />
          <Route path="/board/:id" render={() => 
            <TopicBoardView
              topicBoards={this.state.topicBoards}
              userData={this.props.userData}
              selected={this.state.selected}
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
