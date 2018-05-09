import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props){

    super(props);

    this.state = {
      username: null,
      password: null,
      failedLogin: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  //start typing set the state to empty  string
  //if failed login false render this

  handleLogin(e) {
    this.props.sendLogin(this.state)
    .then(data => {
      this.props.history.push('/locations');
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
          <a onClick={this.props.handleView}>SignUp</a>
          <input
              value="SUBMIT"
              type="submit"
              onClick={this.handleLogin}
          />
        </form>
    )
  }
}