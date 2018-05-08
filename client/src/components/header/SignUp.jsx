import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props){

    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      loggedIn: false,
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e){
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
  }

  handleSignup(credentials) {
    return axios.post('/api/signup', credentials)
      .then(() => {
        this.props.sendLogin(this.state);
        console.log('successs')
      })
      
      .catch(() => {
        this.setState({
          status: false
        })
      })
  }

  render() {
    return(
        <form>
        <input
              placeholder="First"
              name="firstName"
              type="text"
              onChange={this.handleChange}
          />
          <input
              placeholder="Last Name"
              name="lastName"
              type="text"
              onChange={this.handleChange}
          />
          <input
              placeholder="Email"
              name="email"
              type="text"
              onChange={this.handleChange}
          />
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
          <input
              value="SUBMIT"
              type="submit"
              onClick={this.handleSignup}
          />
        </form>
    )
  }
}