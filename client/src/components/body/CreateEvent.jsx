import React from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

const FormExampleFieldControlId = () => (
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
    <Form.Field
      id='form-button-control-public'
      control={Button}
      content='Confirm'
      label='Create Event'
    />
  </Form>
);

export default FormExampleFieldControlId;