import React, { Component } from 'react';

export default class LoginSignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  render() {
    //button tag is a placeholder for modal
    return(
      <div className="modal">
        <h1>LOGIN/SIGNUP</h1>
      </div>
    )
  }
}