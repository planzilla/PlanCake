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
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignup(credentials) {
    return axios.post('/api/signup', credentials)
      .then(() => {
        this.props.sendLogin(this.state)
           .then(data => {
              this.props.handleModal();
              this.props.handleView('logout');
              this.props.history.push('/loggedinview');
              return data;
            })
      })
      .catch(() => {
        this.props.handleError('An error occurred. Please try again.')
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
              name="password"
              type="text"
              onChange={this.handleChange}
          />
          </Form>
          {
            this.props.error !== ''
              ?
              <Message
                error
                header='Error'
                content={this.props.error}
              />
              : null
          }
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => {this.handleSignup(this.state)}} inverted>
            <Icon name='sign in' /> Sign Up
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(SignUp);
