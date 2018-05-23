import React, { Component } from 'react';
import { List, Icon } from 'semantic-ui-react';

const ActiveList = ({ currentEvent, activeEventsUsers, eventAttendees }) => {
  let set = new Set();
  let activeUsersInThisEvent = [];
  let unActiveUsersInThisEvent = [];
  for (var key in activeEventsUsers[currentEvent.id]) {
    activeUsersInThisEvent.push(key);
    set.add(key);
  }

  eventAttendees.map(attendee => {
    if (!set.has(attendee.name)) {
      set.add(attendee.name);
      unActiveUsersInThisEvent.push(attendee.name);
    }
  })

  return (
    <List>
      {
        activeUsersInThisEvent.sort().map(user => (
          <List.Item>
            <Icon name='circle' color="green" />
            <List.Content>
              {user}
            </List.Content>
          </List.Item>
        ))
      }
      {
        unActiveUsersInThisEvent.sort().map(user => (
          <List.Item>
            <Icon name='circle thin' />
            <List.Content>
              {user}
            </List.Content>
          </List.Item>
        ))
      }
    </List>
  )
}

export default ActiveList;
