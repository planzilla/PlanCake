import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props){

    super(props);

    this.state = {
      username: null,
      password: null,
      failedLogin: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.sendLogin = this.props.sendLogin.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogin(e) {
    this.props.sendLogin(this.state)
    .then(data => {
      this.props.handleModal();
      this.props.handleView('logout');
      this.props.history.push('/loggedinview');
      return data;
    })
    .then(({ data }) => this.props.setUser(data))
    .catch(err => this.setState({
      failedLogin: 'Incorrect username or password.'
    }));
  }

  render() {
    return(
        <form>
          <input
              placeholder="Username"
              name="username"
              type="text"
              onChange={this.handleChange}
          />
          <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
          />
          <a onClick={() => this.props.handleView('signup')}>SignUp</a>
          <input
              value="SUBMIT"
              type="button"
              onClick={this.handleLogin}
          />
        </form>
    )
  }
}

export default withRouter(Login);
