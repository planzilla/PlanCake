import React from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, TextArea, Message } from 'semantic-ui-react';

const AddInvite = () => (
  <Modal
    trigger={<Button className="float-right-button" size='mini'><Icon name="add user" /></Button>}
    size='tiny'
    closeIcon
  >
    <Modal.Header><Icon name="add user" /> Invite friends</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Input
          id='form-textarea-control-invite'
          control={TextArea}
          label='Invite Friends'
          placeholder='Example@domain.com, John@abc.com, ...'
          name='createEventEmails'
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Invite
      </Button>
    </Modal.Actions>
  </Modal>
);

export default AddInvite;