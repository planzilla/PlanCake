import React, { Component } from 'react';
import { Card, Icon, Message, Grid, Segment, List } from 'semantic-ui-react';
import Todo from './Todo.jsx';
import GroupStatusTable from './GroupStatusTable.jsx';
import AddPlan from './AddPlan.jsx';

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
            <Grid columns='equal'>
              <Grid.Column>
                <Segment><b>Itinerary</b><br /><br />
                  <AddPlan />
                  <List celled size="large">
                    <List.Item>
                      <b>Check in at airbnb</b>

                      <List.List>
                        <List.Item>05/27/18 at 3:30 PM</List.Item>
                        <List.Item>1234 Street, SF, CA 92131</List.Item>
                        <List.Item>$3000</List.Item>
                      </List.List>
                    </List.Item>
                    <List.Item>
                      <b>Go to HR </b>

                      <List.List>
                        <List.Item>5/29/18 at 9:00 AM</List.Item>
                        <List.Item>Somwhere in SF</List.Item>
                        <List.Item>Notes: Take bus.</List.Item>
                      </List.List>
                    </List.Item>
                  </List>

                </Segment>
              </Grid.Column>
              <Grid.Column >
                <Segment>
                  <b>Todo</b>
                  <Todo
                    todos={this.props.todos}
                    event={this.props.event}
                  />
                </Segment>
              </Grid.Column>
            </Grid>

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
                <GroupStatusTable className="table" groupTodos={this.props.groupTodos} />
              </Card.Content>
          }
        </Card>
      </div>
    )
  }



}