import React, { Component } from 'react';
import { Modal, Header, Icon, Form, Input, Radio, Button, Select, Checkbox, Message } from 'semantic-ui-react';

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'false',
      options: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e, {value}) {
    this.setState({ value: value });
    console.log(this.state.value);
  }
  
  renderPickSomeone() {
    const options = this.props.eventAttendees.map(attendee => ({
      text: attendee.name,
      value: attendee.userId,
    }));
    if (this.state.value !== 'someone') {
      return (
        <Form.Field fluid control={Select} options={options} placeholder='Pick one' disabled />
      )
    } else {
      return (
        <Form.Field fluid control={Select} options={options} placeholder='Pick one' name='assignTo' />
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
            <Form.Radio
              label='Everyone' value='everyone' name='assignTo'
              checked={this.state.value === 'everyone'} onChange={this.handleChange} 
              onClick={this.props.handleInputChange}
              />
            <Form.Radio
              label='Myself' value='myself'
              name='assignTo' checked={this.state.value === 'myself'}
              onChange={this.handleChange} 

            />
            <Form.Radio
              label='Someone' value='someone'
              name='assignTo' checked={this.state.value === 'someone'}
              onChange={this.handleChange} 
              
            />
            { this.renderPickSomeone() }
            </Form.Group>

            <Form.Group>
            <label>Due Date</label>
              <div className="ui calendar" id="example2">
                <div className="ui input left icon">
                  <Icon name="calendar"></Icon>
                  <input
                    type='text'
                    name='deadline'
                    placeholder='12/20/18' 
                    onChange={this.props.handleInputChange} 
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
          {
        this.props.addTodoError !== ''
          ? <Message
            error
            header='Error'
            content={this.props.addTodoError}
          />
          : null
      }
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
