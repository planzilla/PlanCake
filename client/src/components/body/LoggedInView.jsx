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
    // this.handleBodyView = this.handleBodyView.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.events !== nextProps.events) {
  //     this.props.fetchPosts();
  //   }
  // }


  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleModalOpenClose () {
    let openCloseState = !this.state.createEventModalOpen;
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

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /* --------------- EventSummary ------------*/

  handleClickEventTitle(event) {
    this.setState({topicBoards: []});
    this.setState({currentEvent: event});
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
    } else {
      this.props.createPost({
        createEventTitle: this.state.createEventTitle,
        createEventLocation: this.state.createEventLocation
      })
      .then((data) => {
        axios.get('/api/userEvents')
          .then(result => {
            this.setState({ events: result.data });
            this.handleCreateEventModalOpenClose();
          });
      })
      .catch((err) => {
        this.setState({
          createEventError: 'An error occurred. Please try again.'
        });
      });
    }
  }

  // /* -----------     View    ------------- */
  // handleBodyView(e, view) {
  //   this.setState({ view: view })
  // }

  // renderView() {
  //   if (this.state.view === 'dashboard') {
  //     return (
  //       <Dashboard 
  //       events={this.props.events.data}
  //       />
  //     )
  //   } else if (this.state.view === 'topicboardview') {
  //     return (
  //       <TopicBoardView 
  //       userData={this.props.userData}
  //       />
  //     )
  //   }
  // }

  render() {
    if (this.state.events.length === 0) {
      return '...loading??';
    } else {
      return (
        <BrowserRouter>
        <div className="splash grid">
          <NavBar setUser={this.setUser} view={this.state.view} />
          <div className="dashboard grid">
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

        {/* {this.renderView()} */}
        {/* <div className="placeholder"></div> */}


          <Route path="/loggedinview" render={() => 
            <Dashboard 
              events={this.props.events.data} 
              handleClickEventTitle={this.handleClickEventTitle}
              
              /> } />
          <Route path="/events/:id" render={() => 
            <EventSummary 
              topicBoards={this.state.topicBoards}  
              event={this.state.currentEvent} 
            /> } 
          />
          <Route path="/board/:id" render={() => 
            <TopicBoardView
              topicBoards={this.state.topicBoards}
              userData={this.props.userData}
            /> }
          />

          {/* <Link to="/loggedinview">events here</Link>
          <Link to="/events/:eventId">eventpage</Link> */}
          <ContactInfo />
          </div>
        </div>
        </BrowserRouter>
      )
    }
  }
}

// {this.renderView()}
//           <div className="placeholder"></div>
//           <ContactInfo />

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
