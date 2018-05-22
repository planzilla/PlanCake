import React, { Component } from 'react';
import { Card, Icon, Grid, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/events/${this.props.id}`}>
        <Card fluid onClick={() => this.props.handleClickEventTitle(this.props.event)}>
          <Card.Content header={`${this.props.title} Overview`} />
          <Card.Content>
            {
              this.props.itinerary.length === 0
                ? <Message info>
                  <Message.Header>
                    Nothing has been set in stone. 
                  </Message.Header>
                  <p>
                    Start planning by clicking on this event and starting a discussion!
                  </p>
                </Message>
                : <Grid celled columns='equal' className="table">
                  <Grid.Row>
                    {this.props.itinerary.map(item => (
                      <Grid.Column className="table-col-itinerary">
                        <b>{item.title}</b>
                        <br />
                        {Moment(item.date).format('LLLL')}
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
            }
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
