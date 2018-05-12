import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Card fluid color='teal'>
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
    )
  }
}