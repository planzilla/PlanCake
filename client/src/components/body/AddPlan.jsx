import React from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea } from 'semantic-ui-react'

const AddPlan = () => (
  <Modal trigger={<Button>Add a Plan</Button>} closeIcon size='tiny'>
    <Header icon='add to calendar' content='Add to Itinerary' />
    <Modal.Content>
        <Form>
    <Form.Field id='form-input-control-title' control={Input} label='Title *' placeholder='Hike Rattlesnake Ledge' />
    <Form.Group widths='equal'>
      <Form.Field id='form-input-contro-date' control={Input} label='Date *' placeholder='05/26/2018' />
      <Form.Field id='form-input-control-time' control={Input} label='Time' placeholder='2:30 PM' />
    </Form.Group>
    <Form.Field id='form-input-control-address' control={Input} label='Address' placeholder='1234 Pike Street, Seattle, WA 98101' />
    <Form.Field id='form-input-control-cost' control={Input} label='Cost' placeholder='$15.00' />
    <Form.Field id='form-textarea-control-notes' control={TextArea} label='Notes' placeholder='Important information, notes, etc.' />
  </Form>
  <br/>
    * Required
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' inverted>
        <Icon name='plus' /> Add
      </Button>
    </Modal.Actions>
  </Modal>
)

export default AddPlan