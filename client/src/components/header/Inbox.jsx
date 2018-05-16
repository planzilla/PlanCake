import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const Inbox = () => (
  <Dropdown icon='mail outline'>
    <Dropdown.Menu>
      <Dropdown.Item>
        <b>You're invited to Camping</b>
        <br />
        <i>Yellowstone National Park</i>
        <br /><br />
        <Button.Group>
          <Button color='teal'> Accept</Button>
          <Button.Or />
          <Button>Ignore</Button>
        </Button.Group>
      </Dropdown.Item>
      <Dropdown.Item>
        <b>You're invited to Week12</b>
        <br />
        <i>San Francisco</i>
        <br /><br />
        <Button.Group>
          <Button color='teal'> Accept</Button>
          <Button.Or />
          <Button>Ignore</Button>
        </Button.Group>        </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default Inbox;
