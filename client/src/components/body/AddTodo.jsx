import React, { Component } from 'react';
import { Modal, Header, Icon, Form, Input, Radio, Button, Select, Checkbox } from 'semantic-ui-react';


const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  
]



export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'false'
    };
    this.handleChange = this.handleChange.bind(this);
  }

// ({ handleInputChange, handleAddTodo, handleAddTodoModalOpenClose, addTodoModalOpen }) => (
  
  getUsers() {
    
  }

  handleChange (e, {value}) {
    this.setState({ value: value });
    console.log(this.state.value);
  }
  
  renderPickSomeone() {
    if (this.state.value !== 'someone') {
      return (
        <Form.Field fluid control={Select} label='name' options={options} placeholder='Pick one' disabled />
      )
    } else {
      return (
        <Form.Field fluid control={Select} label='name' options={options} placeholder='Pick one' />
      )
    }
  }

  render() {
    return (
    <Modal
      trigger={<Button onClick={this.props.handleAddTodoModalOpenClose}>Add Todo</Button>}
      open={this.props.addTodoModalOpen}
      onClose={this.props.handleAddTodoModalOpenClose}
      size='tiny'
      closeIcon
    >
      <Modal.Header><Icon name="pencil" />  Add Todo </Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Todo'
              placeholder='Book flights'
              name='addTodoTask'
              onChange={this.props.handleInputChange}
            />
          </Form.Group>



          <Form.Group inline>
          <label>Assign to:</label>
          <Form.Radio label='Everyone' value='everyone' checked={this.state.value === 'everyone'} onChange={this.handleChange} />
          <Form.Radio label='Myself' value='myself' checked={this.state.value === 'myself'} onChange={this.handleChange} />
          <Form.Radio label='Someone' value='someone' checked={this.state.value === 'someone'} onChange={this.handleChange} />
          {/* <Form.Field fluid control={Select} label='name' options={options} placeholder='Pick one' /> */}
          { this.renderPickSomeone() }
          </Form.Group>

          <Form.Select control={Select} name='assignee' label='hello' options={options} />


          <Form.Group>
          <h3>Due Date</h3>
            <div className="ui calendar" id="example2">
              <div className="ui input left icon">
                <Icon name="calendar"></Icon>
                <input type="text" placeholder="Date" />
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.props.handleAddTodo} inverted>
          <Icon name='checkmark' /> Add
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}
