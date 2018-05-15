import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';
import EventSummary from './EventSummary.jsx';

const EventCard = ({ id, title, location }) => (
  <Card fluid color='teal'>
    <Link to={`/events/${id}`} component={ EventSummary }>
      <Card.Content header={title} />
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
      {location}
    </Card.Content>
    <Route path={`/events/:eventId`} component={ EventSummary } />
  </Card>

)

export default EventCard;
