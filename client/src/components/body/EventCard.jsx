import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Todo from './Todo.jsx';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <Link to={`/events/${this.props.id}`}>
      <Card fluid color='teal' onClick={() => this.props.handleClickEventTitle(this.props.event)}>
          <Card.Content header={this.props.title} />
        <Card.Content>
          <Todo 
            todos={this.props.todos}
            event={this.props.event}
          />
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
