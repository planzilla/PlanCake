import React from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, TextArea, Message } from 'semantic-ui-react';

const CreateEvent = ({ handleCreateEvent, handleInputChange, handleCreateEventModalOpenClose, createEventError, createEventModalOpen }) => (
  <Modal
    trigger={<Button onClick={handleCreateEventModalOpenClose}>Create an Event</Button>}
    open={createEventModalOpen}
    onClose={handleCreateEventModalOpenClose}
    size='tiny'
    closeIcon
  >
    <Modal.Header>Create an Event <Icon name="map" /></Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-title'
            control={Input}
            label='Title'
            placeholder='Title'
            name='createEventTitle'
            onChange={handleInputChange}
          />
          <Form.Field
            id='form-input-control-location'
            control={Input}
            label='Location'
            placeholder='Location'
            name='createEventLocation'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Input
          id='form-textarea-control-invite'
          control={TextArea}
          label='Invite Friends'
          placeholder='Enter email addresses'
          name='createEventEmails'
          onChange={handleInputChange}
        />
      </Form>
      {
        createEventError !== ''
          ? <Message
            error
            header='There was an error.'
            content={createEventError}
          />
          : null
      }
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={handleCreateEventModalOpenClose} inverted>
        <Icon name='checkmark' /> Create
      </Button>
    </Modal.Actions>
  </Modal>
);

export default CreateEvent;