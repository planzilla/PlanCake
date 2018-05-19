import React from 'react';
import { List } from 'semantic-ui-react';

const ItineraryList = (props) => (
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
)

export default ItineraryList;