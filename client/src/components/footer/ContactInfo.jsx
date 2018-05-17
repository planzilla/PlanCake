import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    // }
  }

  render() {
    return(
      <div className="footer">
      {/* <h2>This is our footer</h2>
      <h2>If there is a bug report it</h2>
      <h3>Call support at 1-800-ghostBusters</h3> */}
      <h1>Contact</h1>
      <div>
        <a href="">brandon.villiados@gmail.com</a>
      </div>
      <div>
        <a href="">willvha@gmail.com</a>
      </div>
      <div>
        <a href="">ceyuen@gmail.com</a>
      </div>
      </div>
    )
  }
}