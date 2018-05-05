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
        <h5>Planzilla (Nav Bar)</h5>
        <h5>Insert Logo Here</h5>
        <div className="login jsas">
        <LoginSignUp />
        </div>
      </div>
    )
  }
}