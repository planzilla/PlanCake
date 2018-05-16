import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class EventSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card fluid color="teal">
        <Card.Content header={this.props.event.title} />
        <Card.Content>
          <h5>{this.props.event.location}</h5>



        </Card.Content>
        <Card.Content extra>
          <Icon name='map pin' />
          {this.props.event.location}
        </Card.Content>

      </Card>
    )
  }



}