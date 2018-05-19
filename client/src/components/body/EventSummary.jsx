import React, { Component } from 'react';
import { Card, Icon, Message } from 'semantic-ui-react';
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
        {
          this.props.groupTodos.length === 0 
          ? <Card.Content>
              <Message info>
              <Message.Header>
                Want to see what everyone has accomplished?
              </Message.Header>
              <p>
                Assign a group task by clicking on the todo icon.
              </p>
              </Message>
            </Card.Content>
          : <Card.Content className="table-container">
              <GroupStatusTable className="table" groupTodos={this.props.groupTodos}/>
            </Card.Content>
        }
      </Card>
      </div>
    )
  }



}