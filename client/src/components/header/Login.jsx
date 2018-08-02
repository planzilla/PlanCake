import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {

    super(props);

    this.state = {
      username: null,
      password: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.sendLogin = this.props.sendLogin.bind(this);
  }

  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value,
    })
  }

  handleGuest(e) {
    let guest = { username: 'wvha', password: 'wvha' };
    this.props.sendLogin(guest)
      .then(data => {
        this.props.handleModal();
        this.props.handleView('logout');
        this.props.history.push('/loggedinview');
        return data;
      })
      .then(({ data }) => this.props.setUser(data))
  };
  

  handleLogin(e) {
    this.props.sendLogin(this.state)
      .then(data => {
        this.props.handleModal();
        this.props.handleView('logout');
        this.props.history.push('/loggedinview');
        return data;
      })
      .then(({ data }) => this.props.setUser(data))
      .catch(err => {
        this.props.handleError('Incorrect username or password');
      });
  }

  render() {
    return (
      <Modal
        open={this.props.modalIsOpen}
        onClose={this.props.handleModal}
        size='mini'
        closeIcon
      >
        <Modal.Header>
          <Icon name='user circle outline' />  Login
      </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='Username'
              placeholder='Username'
              name='username'
              type='text'
              onChange={this.handleChange}
            />
          <Form.Input
              label='Password'
              placeholder='Password'
              name='password'
              type='password'
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
        <Button basic color='grey' onClick={() => this.handleGuest()}>Guest</Button>
        <Button basic color='grey' onClick={() => this.props.handleView('signup')}>Sign Up</Button>
          <Button color='green' onClick={this.handleLogin} inverted>
            <Icon name='sign in' /> Login
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(Login);

