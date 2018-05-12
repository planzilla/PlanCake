import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';

const AddTopic = ({ handleInputChange, handleAddTopic, handleAddTopicModalOpenClose, addTopicModalOpen, eventId }) => (
  <Modal
    trigger={
      <Button onClick={handleAddTopicModalOpenClose}>
        <Icon name='plus' />
        Discussion
      </Button>
    }
    open={addTopicModalOpen}
    onClose={handleAddTopicModalOpenClose}
    size='mini'
    closeIcon
  >
    <Modal.Header>
    <Icon name='chat' />  Add a Discussion Topic  
    </Modal.Header>
    <Modal.Content>
      <Form >
        <Form.Input 
          label='Topic'
          placeholder='Activities' 
          name='addTopicTitle' 
          onChange={handleInputChange}
        />
        <Message
          error
          header='Action Forbidden'
          content='You can only sign up for an account once with a given e-mail address.'
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={handleAddTopic} inverted>
        <Icon name='checkmark' /> Add
        </Button>
    </Modal.Actions>
  </Modal>
)

export default AddTopic;