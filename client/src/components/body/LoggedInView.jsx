import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions.js';
import store from '../../store';

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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTopicModalOpenClose = this.handleAddTopicModalOpenClose.bind(this);
    this.handleAddTopic = this.handleAddTopic.bind(this);
    this.handleCreateEventModalOpenClose = this.handleCreateEventModalOpenClose.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.clearAllCreateEventInfo = this.clearAllCreateEventInfo.bind(this);
    this.handleClickEventTitle = this.handleClickEventTitle.bind(this);
  }

  // load user events and info
  // componentDidMount() {
  //   axios.get('/api/userEvents')
  //     .then(result => this.setState({events: result.data}));
  // }
  componentDidMount() {
    this.props.fetchPosts();

    
  }

/*
componentWillReceiveProps(nextProps) {
  if (nextProps.newPost) {
    this.props.posts.unshift(nextProps.newPost);
  }
}



*/

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

  handleClickEventTitle(event) {
    this.setState({topicBoards: []});
    axios.get(`/api/topicBoards?EventId=${event.id}`)
      .then(({ data }) => {
        this.setState({ topicBoards: data });
      })
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
      })
    } else {
      axios.post('/api/addTopicBoard', {
        eventId: eventId,
        addTopicTitle: this.state.addTopicTitle
      })
        .then((data) => {
          this.handleAddTopicModalOpenClose();
        })
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
      })
    } else if (this.state.createEventLocation === '') {
      this.setState({
        createEventError: 'Please insert an event location.'
      })
    } else {
      axios.post('/api/createEvent', {
        createEventTitle: this.state.createEventTitle,
        createEventLocation: this.state.createEventLocation
      })
        .then((data) => {
          axios.get('/api/userEvents')
            .then(result => {
              this.setState({ events: result.data });
              this.handleCreateEventModalOpenClose();
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
    console.log('this.props', this.props);
    console.log('state', this.state);
   return (
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
          events={this.props.posts}
        />
        <Dashboard 
          events={this.state.events}
        />
      </div>
    )
  }
}

// LoggedInView.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   events: PropTypes.array.isRequired,
//   newPost: PropTypes.object
// };

const mapStateToProps = state => ({
  events: state.posts.events,
  newEvent: state.posts.event
});
// console.log('after map:', this.props);
export default connect(mapStateToProps, { fetchPosts })(LoggedInView); 
