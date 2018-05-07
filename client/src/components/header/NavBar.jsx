import React, { Component } from 'react';
import LoginSignUp from './LoginSignUp.jsx'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    // }
  }

  render() {
    return(
      <div className="header grid">
        <img src="plancake2.png" alt="plancake.png"/>
        <div className="login jsas">
          <LoginSignUp />
        </div>
      </div>
    )
  }
}