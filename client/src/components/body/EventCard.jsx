import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(event) {
  //   this.props.handleClickEventTitle(event);
  // }

  render() {  
    return (
      <Link to={`/events/${this.props.id}`}>
      <Card fluid color='teal' onClick={() => this.props.handleClickEventTitle(this.props.event)}>

          <Card.Content header={this.props.title} />

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
      </Card>
      </Link>
      )
  }
}
