import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Todo from './Todo.jsx';
import GroupStatusTable from './GroupStatusTable.jsx';

export default class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="event-cards">
      <Card fluid color="teal">
        <Card.Content header={this.props.event.title} />
        <Card.Content>
          <h5>{this.props.event.location}</h5>
          <Todo 
            todos={this.props.todos} 
            event={this.props.event}
          />
        </Card.Content>
        <Card.Content extra>
          <Icon name='map pin' />
          {this.props.event.location}
        </Card.Content>
      </Card>
      <Card fluid color="teal"> 
        <Card.Content header="Group Status Table" />
        <Card.Content className="table-container">
        <GroupStatusTable className="table"/>
        </Card.Content>
      </Card>
      </div>
    )
  }



}