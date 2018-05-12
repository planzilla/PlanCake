import React, { Component } from 'react';
import EventCard from './EventCard.jsx';

//import sidebar
//import event cards

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return(
      <div className="dashboard grid">
        <div className="event-cards">
        {this.props.events.map((event, i) => {
          return(
              <EventCard title={event.title} location={event.location} key={i}/>
          )
        })}
        </div>
      </div>
    )
  }
}