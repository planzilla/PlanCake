import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

const EventCard = ({ title, location }) => (
  <Card fluid color='teal'>
    <Card.Content header={title} />
    <Card.Content>
      <p><b>ToDo</b></p>
      <ul>
        <li> Book Flights </li>
        <li> Contact Airbnb Host </li>
      </ul>
    </Card.Content>
    <Card.Content extra>
      <Icon name='map pin' />
      {location}
    </Card.Content>
  </Card>
)

export default EventCard;