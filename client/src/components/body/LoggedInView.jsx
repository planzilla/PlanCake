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
import io from 'socket.io-client';

export class LoggedInView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEvent: {},
      currentTodo: {},
      invites: [], //array of events
      eventAttendees: [],
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
      boardId: null,
      pinnedMessages: [],
      allMessages: [],
      allItineraries: {}, //object of arrays of objects (plans)
      itinerary: [], //array of objects (plans)
      addPlanTitle: null,
      addPlanDate: null,
      addPlanTime: null,
      addPlanAddress: null,
      addPlanCost: null,
      addPlanNotes: null,
      addPlanError: null,
      addPlanModalOpen: false,
      activeEventsUsers : {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTopicModalOpenClose = this.handleAddTopicModalOpenClose.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleCreateEventModalOpenClose = this.handleCreateEventModalOpenClose.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.clearAllCreateEventInfo = this.clearAllCreateEventInfo.bind(this);
    this.handleClickEventTitle = this.handleClickEventTitle.bind(this);
    this.setSelectedBoard = this.setSelectedBoard.bind(this);
    this.getInvitesByUserId = this.getInvitesByUserId.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.ignoreInvite = this.ignoreInvite.bind(this);
    this.handleAddPlan = this.handleAddPlan.bind(this);
    this.setAllMessages = this.setAllMessages.bind(this);
    this.handleHomeReloadItineraries = this.handleHomeReloadItineraries.bind(this);
    this.handleAddPlanModalOpenClose = this.handleAddPlanModalOpenClose.bind(this);
    this.setPinnedMessages = this.setPinnedMessages.bind(this);
    this.ioEvents;
    this.removeActiveUser = this.removeActiveUser.bind(this);
  }
  

  componentDidMount() {
    axios.get('/api/userEvents')
    .then(result => {
      this.setState({ events: result.data });
      let eventsStr = result.data.map(event => event.id).toString();
      return axios.get(`/api/allItineraries?eventIdStr=${eventsStr}`)
    })
    .then(({ data }) => {
      this.setState({ allItineraries: data })
      this.ioEvents = io('/events');
      this.ioEvents.on('connect', (socket) => {
        let name = `${this.props.userData.firstName.slice(0,1).toUpperCase()}${this.props.userData.firstName.slice(1).toLowerCase()} ${this.props.userData.lastName.slice(0,1).toUpperCase()}.`;
          this.state.events.forEach((event) => {
            this.ioEvents.emit('events', event, name)
          })
        })
        this.ioEvents.on('activeUsers', (EventId, activeUsers) => {
          let newActiveEventsUsers = Object.assign({}, this.state.activeEventsUsers);
          newActiveEventsUsers[EventId] = activeUsers;
          this.setState({ activeEventsUsers: newActiveEventsUsers })
        })
      })

    axios.get('/api/todos')
      .then(result => {
        this.setState({ todos: result.data });
      });

    axios.get('/api/invitesByEmail')
      .then(({ data }) => {
        this.setState({ invites: data })
      })
      .catch(err => {console.error('err in get invites', err)})
  }

  removeActiveUser() {
    let name = `${this.props.userData.firstName.slice(0,1).toUpperCase()}${this.props.userData.firstName.slice(1).toLowerCase()} ${this.props.userData.lastName.slice(0,1).toUpperCase()}.`;
    this.state.events.forEach((event) => {
      this.ioEvents.emit('logout', event, name)
    })
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

  /* --------------- EventSummary ------------*/

  handleClickEventTitle(event) {
    this.setState({ topicBoards: [] });
    this.setState({ currentEvent: event });
    axios.get(`/api/topicBoard?EventId=${event.id}`)
      .then(({ data }) => {
        this.setState({ topicBoards: data });
      });
    this.fetchEventAttendees(event);

    axios.get(`/api/groupTodo?EventId=${event.id}`)
    .then(({ data }) => {
      this.setState({ groupTodos: data });
    })
    .catch(err => {console.log('Error in retrieving groupTodos: ', err)});

    axios.get(`/api/itinerary?EventId=${event.id}`)
      .then(({ data }) => {
        this.setState({ itinerary : data})
      })
      .catch(err => {console.log('Error in retrieving itinerary: ', err)});
  }

  fetchEventAttendees(event) {
    axios.get(`/api/eventAttendees?EventId=${event.id}`)
      .then(({data}) => {
        this.setState({ eventAttendees: data });
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

  /* ----------- Itinerary ------------- */

  handleAddPlan() {
    if (!this.state.addPlanTitle) {
      this.setState({ addPlanError: 'Please enter a plan title.' })
    } else if (!this.state.addPlanDate) {
      this.setState({ addPlanError: 'Please enter a date.' })
    } else {

      let dateAndTime = new Date(`${this.state.addPlanDate} ${this.state.addPlanTime}`)
      const requestObj = {
        EventId: this.state.currentEvent.id,
        date: dateAndTime,
        title: this.state.addPlanTitle,
        cost: this.state.addPlanCost,
        address: this.state.addPlanAddress,
        notes: this.state.addPlanNotes,
      }
      return axios.post('/api/addPlan', requestObj)
        .then(({ data }) => {
          this.setState({ itinerary: data })
          this.handleAddPlanModalOpenClose();
        })
        .catch(err => {
          this.setState({ addPlanError: 'Something went wrong. Please try again.' })
        })

    }
  }

  handleAddPlanModalOpenClose() {
    let openCloseState = !this.state.addPlanModalOpen;
    this.setState({ 
      addPlanModalOpen: openCloseState,
      addPlanTitle: null,
      addPlanDate: null,
      addPlanTime: null,
      addPlanAddress: null,
      addPlanCost: null,
      addPlanNotes: null,
      addPlanError: null,
     });
  }

  /* -----------  MISC  ------------- */

  clearDomOfActiveSidebar() {
    var domElement = document.getElementsByClassName("activeSidebar");
    [].forEach.call(domElement, function(el) {
      el.classList.remove("activeSidebar");
    });
  }

  setSelectedBoard(selected, boardId) {
    this.clearDomOfActiveSidebar();

    Promise.resolve(
      this.setState({ 
        selected: selected,
        boardId: boardId,
        allMessages: [],
        pinnedMessages: [{username: "Example", text: 'Type in "/pin" before a url pin a message'}],
      }))
      .then(() => {
        document.getElementById(`${selected}-${boardId}`).classList.add("activeSidebar");
        return axios.get(`/api/getChatMessages?boardId=${this.state.boardId}`);
      })
      .then(({ data }) => { 
        if (!!data) { this.setState({ allMessages: data.concat(this.state.allMessages) }) };
      })
      .then(() => {
        return axios.get(`/api/getPins?boardId=${this.state.boardId}`);
      })
      .then(({ data }) => {
        this.setPinnedMessages(data);
      });
    
      
  }

  setAllMessages(message) {
    this.setState({ allMessages: message });
  }

  setPinnedMessages(pin) {
    if (!pin) {
      return;
    } else {
      this.setState({ pinnedMessages: pin });
    ;}
  }
  
  handleHomeReloadItineraries() {
    this.clearDomOfActiveSidebar();
    
    console.log('in handleHomeReloadItineraries', this.state.events)
    let eventsStr = this.state.events.map(event => event.id).toString();
    return axios.get(`/api/allItineraries?eventIdStr=${eventsStr}`)
      .then(({ data }) => {
        console.log('in handleHomeReloadItineraries then', data)
        this.setState({ allItineraries: data })
      })
      .catch(err => {console.log(err)});
  }

  liked(bool, pinId) {
    axios.patch('/api/patchLikes', {BoardId: this.state.boardId, UserId: this.props.userId, PinId: pinId, liked: bool})
    .then(({ data }) => {
      this.setState({ pinnedMessages: data });
    });
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
            handleHomeReloadItineraries={this.handleHomeReloadItineraries}
            removeActiveUser={this.removeActiveUser}
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
            setSelectedBoard={this.setSelectedBoard}
          />

          <Route path="/loggedinview" render={() => 
            <Dashboard 
              events={this.state.events} 
              handleClickEventTitle={this.handleClickEventTitle}
              allItineraries={this.state.allItineraries}
            />} />
          <Route path="/events" render={() =>
            <EventSummary
              topicBoards={this.state.topicBoards}
              event={this.state.currentEvent}
              groupTodos={this.state.groupTodos}
              handleInputChange={this.handleInputChange}
              handleAddPlan={this.handleAddPlan}
              addPlanError={this.state.addPlanError}
              itinerary={this.state.itinerary}
              handleAddPlanModalOpenClose={this.handleAddPlanModalOpenClose}
              addPlanModalOpen={this.state.addPlanModalOpen}
              eventAttendees={this.state.eventAttendees}
              userId={this.props.userData.id}
              currentEvent={this.state.currentEvent}
              activeEventsUsers={this.state.activeEventsUsers}
              eventAttendees={this.state.eventAttendees}
            />}
          />
          <Route path="/board" render={() => 
            <TopicBoardView
              topicBoards={this.state.topicBoards}
              userData={this.props.userData}
              selected={this.state.selected}
              username={this.props.userData.username}
              boardId={this.state.boardId}
              allMessages={this.state.allMessages}
              setAllMessages={this.setAllMessages}
              setPinnedMessages={this.setPinnedMessages}
              pinnedMessages={this.state.pinnedMessages}
              liked={this.liked.bind(this)}
              currentEvent={this.state.currentEvent}
              activeEventsUsers={this.state.activeEventsUsers}
              eventAttendees={this.state.eventAttendees}
            />}
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
