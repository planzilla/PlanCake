import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
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
      </Card>
      )
  }
}
