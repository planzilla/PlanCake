import React from 'react';
import { Button, Header, Icon, Image, Modal, Form, Input, TextArea, Message } from 'semantic-ui-react';

const CreateEvent = ({ handleCreateEvent, handleInputChange, handleCreateEventModalOpenClose, createEventError, createEventModalOpen }) => (
  <Modal
    trigger={<Button onClick={handleCreateEventModalOpenClose} id='semantic-button'>Create an Event</Button>}
    open={createEventModalOpen}
    onClose={handleCreateEventModalOpenClose}
    size='tiny'
    closeIcon
  >
    <Modal.Header><Icon name="map" />  Create an Event </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-title'
            control={Input}
            label='Title'
            placeholder='Annual Camping Trip'
            name='createEventTitle'
            onChange={handleInputChange}
          />
          <Form.Field
            id='form-input-control-location'
            control={Input}
            label='Location'
            placeholder='Yosemite National Park'
            name='createEventLocation'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Input
          id='form-textarea-control-invite'
          control={TextArea}
          label='Invite Friends'
          placeholder='Example@domain.com, John@abc.com, ...'
          name='createEventEmails'
          onChange={handleInputChange}
        />
      </Form>
      {
        createEventError !== ''
          ? <Message
            error
            header='Error'
            content={createEventError}
          />
          : null
      }
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={handleCreateEvent} inverted>
        <Icon name='checkmark' /> Create
      </Button>
    </Modal.Actions>
  </Modal>
);

export default CreateEvent;