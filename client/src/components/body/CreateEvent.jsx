import React from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, TextArea } from 'semantic-ui-react';

const CreateEvent = ({ handleCreateEvent, handleInputChange, handleModalOpenClose, createEventError, createEventModalOpen }) => (
  <Modal 
    trigger={<Button onClick={handleModalOpenClose}>Create an Event</Button>} 
    open={createEventModalOpen}
    onClose={handleModalOpenClose}
    closeIcon
    >
    <Modal.Header>Create an Event</Modal.Header>
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
      <p className='error'>{createEventError}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' onClick={handleModalOpenClose}>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green' onClick={handleCreateEvent}>
        <Icon name='checkmark' /> Create
      </Button>
    </Modal.Actions>
  </Modal>
);

export default CreateEvent;