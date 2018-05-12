import React, { Component } from 'react';
import EventCard from './EventCard.jsx';
import { Card } from 'semantic-ui-react'

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
        {console.log(this.props.events)}
        <Card.Group>
        {this.props.events.map((event, i) => {
          return(
              <EventCard title={event.title} location={event.location} key={i}/>
          )
        })}
        </Card.Group>
        </div>
      </div>
    )
  }
}