import React from 'react';
import { Button, Header, Icon, Modal, Form, Input, TextArea, Message } from 'semantic-ui-react';

const AddPlan = ({ handleInputChange, handleAddPlan, addPlanError }) => (
  <Modal trigger={<Button>Add a Plan</Button>} closeIcon size='tiny'>
    <Header icon='add to calendar' content='Add to Itinerary' />
    <Modal.Content>
      <Form>
        <Form.Field
          id='form-input-control-title'
          control={Input}
          label='Title *'
          placeholder='Hike Rattlesnake Ledge'
          name='addPlanTitle'
          onChange={handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-contro-date'
            control={Input}
            label='Date *'
            placeholder='05/26/2018'
            name='addPlanDate'
            onChange={handleInputChange}
          />
          <Form.Field
            id='form-input-control-time'
            control={Input}
            label='Time'
            placeholder='2:30 PM'
            name='addPlanTime'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Field
          id='form-input-control-address'
          control={Input}
          label='Address'
          placeholder='1234 Pike Street, Seattle, WA 98101'
          name='addPlanAddress'
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-cost'
          control={Input}
          label='Cost'
          placeholder='$15.00'
          name='addPlanCost'
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-textarea-control-notes'
          control={TextArea}
          label='Notes'
          placeholder='Important information, notes, etc.'
          name='addPlanNotes'
          onChange={handleInputChange}
        />
      </Form>
      <br />
      * Required
      {
        addPlanError === null
          ? null
          : <Message
            error
            header='Error'
            content={addPlanError}
          />
      }
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' inverted onClick={handleAddPlan}>
        <Icon name='plus' /> Add
      </Button>
    </Modal.Actions>
  </Modal>
)

export default AddPlan;