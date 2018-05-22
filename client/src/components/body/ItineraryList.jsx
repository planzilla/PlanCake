import React from 'react';
import { List, Message } from 'semantic-ui-react';
import Moment from 'moment';

const ItineraryList = ({ itinerary }) => {
  if (itinerary.length === 0) {
    console.log('in intinerary list zero')
    return (
      <Message info>
          <Message.Header>
            Want to see some finalized plans?
          </Message.Header>
          <p>
            Click "Add a Plan" to contribute to the itinerary!
          </p>
      </Message>
    )
  } else {
    return (
      <List celled size="large" className="grid-event-summary">
      {
        itinerary.map(plan => (
          <List.Item>
            <b>{plan.title}</b>
            <List.List>
              {plan.date ? <List.Item>{Moment(plan.date).format('LLLL')}</List.Item> : null}
              {plan.address ? <List.Item>{plan.address}</List.Item> : null}
              {plan.cost ? <List.Item>Cost: {plan.cost}</List.Item> : null}
              {plan.notes ? <List.Item>Notes: {plan.notes}</List.Item> : null}
            </List.List>
          </List.Item>
        ))
      }
    </List>
    )
  }
}

export default ItineraryList;