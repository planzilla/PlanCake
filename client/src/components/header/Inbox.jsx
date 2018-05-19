import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const Inbox = ({ invites, acceptInvite, ignoreInvite }) => (
  <Dropdown 
    icon='mail' 
    text={invites.length ? `${invites.length}` : null}
    className="header-icon"
  >
    <Dropdown.Menu>
      {invites.length === 0
        ? <Dropdown.Item>
            <b>Nothing new here! Sorry!</b>
          </Dropdown.Item>
        : invites.map((invite, i) =>
          <Dropdown.Item key={i}>
            <b>{invite.title}</b>
            <br />
            <i>{invite.location}</i>
            <br /><br />
            <Button.Group>
              <Button color='teal' onClick={() => acceptInvite( invite.id)}> Accept</Button>
              <Button.Or />
              <Button onClick={() => ignoreInvite(invite.id)}>Ignore</Button>
            </Button.Group>
          </Dropdown.Item>
        )
      }
    </Dropdown.Menu>
  </Dropdown>
);

export default Inbox;
