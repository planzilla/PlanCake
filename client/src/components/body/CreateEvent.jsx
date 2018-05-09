import React from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, TextArea } from 'semantic-ui-react';

const CreateEvent = () => (
  <Modal trigger={<Button>Create an Event</Button>} closeIcon>
    <Modal.Header>Create an Event</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-title'
            control={Input}
            label='Title'
            placeholder='Title'
          />
          <Form.Field
            id='form-input-control-location'
            control={Input}
            label='Location'
            placeholder='Location'
          />
        </Form.Group>
        <Form.Input
          id='form-textarea-control-invite'
          control={TextArea}
          label='Invite Friends'
          placeholder='Enter email addresses'
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red'>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green'>
        <Icon name='checkmark' /> Create
      </Button>
    </Modal.Actions>
  </Modal>
);

export default CreateEvent;