import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';

const AddTopic = ({ handleInputChange, handleAddTopic, handleAddTopicModalOpenClose, addTopicModalOpen, addTopicError, eventId }) => (
  <Modal
    trigger={
      <Button size='mini' id='semantic-button-small' onClick={handleAddTopicModalOpenClose}>
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
      <Form>
        <Form.Input
          label='Topic'
          placeholder='Activities'
          name='addTopicTitle'
          onChange={handleInputChange}
        />
        </Form>
        {
          addTopicError !== ''
            ?
            <Message
              error
              header='Error'
              content={addTopicError}
            />
            : null
        }
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={(e) => {handleAddTopic(e, eventId)}} inverted>
        <Icon name='checkmark' /> Add
        </Button>
    </Modal.Actions>
  </Modal>
)

export default AddTopic;