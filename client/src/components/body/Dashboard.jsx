import React, { Component } from 'react';
import EventCard from './EventCard.jsx';
import { fetchPosts } from '../../actions/postActions.js';
import { connect } from 'react-redux';
import Test from '../header/test.jsx';
import Demo from './BoardView.jsx';
//import sidebar
//import event cards

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    if (!this.props.events) {
      return 'loading';
    } else {
      return(
        <div className="event-cards">
          {this.props.events.map((event, i) => {
            return(
                <EventCard title={event.title} location={event.location} key={i}/>
            )
          })}
        </div>
      )
    }
  }
}
