import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';


class SignUp extends Component {
  constructor(props){

    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      failedSignUp: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
  }

  handleSignup(credentials) {
     return axios.post('/api/signup', credentials)
      .then(() => {
        this.props.setUser(this.state);
        this.props.handleModal();
        this.props.handleView('logout');
        this.props.sendLogin(this.state);
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return(
      <Modal
        open={this.props.modalIsOpen}
        onClose={this.props.handleModal}
        size='mini'
        closeIcon
      >
        <Modal.Header>
          <Icon name='add user' />  Sign Up
      </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='First Name'
              placeholder='Ex: Johnny'
              name="firstName"
              type="text"
              onChange={this.handleChange}
            />
          <Form.Input
              label='Last Name'
              placeholder='Ex: Apple'
              name="lastName"
              type="text"
              onChange={this.handleChange}
          />
           <Form.Input
              label='Email'
              placeholder='Ex: johnnyapple@gmail.com'
              name="email"
              type="text"
              onChange={this.handleChange}
          />
          <Form.Input
              label='Username'
              placeholder='Ex: JohnnyApple'
              name="username"
              type="text"
              onChange={this.handleChange}
          />
          <Form.Input
              label='Password'
              placeholder='Ex: Smoothie123!'
              name="username"
              type="text"
              onChange={this.handleChange}
          />
          </Form>
          {
            this.state.failedSignUp !== ''
              ?
              <Message
                error
                header='Error'
                content={this.state.failedSignUp}
              />
              : null
          }
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleSignup} inverted>
            <Icon name='sign in' /> Sign Up
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(SignUp);
