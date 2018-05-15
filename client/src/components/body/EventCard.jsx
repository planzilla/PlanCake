import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';
import EventSummary from './EventSummary.jsx';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  // = ({ id, title, location }) => {
  

  handleClick(event) {
    // console.log('id in eventcard is: ', id);
    this.props.handleClickEventTitle(event);
  }

  render() {  
  return (
  <Card fluid color='teal'>
    <Link to={`/events/${this.props.id}`}>
      <Card.Content header={this.props.title} onClick={() => this.handleClick(this.props.event)} />
    </Link>
    <Card.Content>
      <p><b>ToDo</b></p>
      <ul>
        <li> Book Flights </li>
        <li> Contact Airbnb Host </li>
      </ul>
    </Card.Content>
    <Card.Content extra>
      <Icon name='map pin' />
      {this.props.location}
    </Card.Content>
    {/* <Route path={`/events`} render={() => <EventSummary /> } /> */}
  </Card>

  )
  }
}

// export default EventCard;
// onClick={() => this.handleClickEventTitle(event)}
