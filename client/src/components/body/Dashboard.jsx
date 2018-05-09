import React, { Component } from 'react';
//import sidebar
//import event cards

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return(
      <div className="dashboard grid">
        <div className="sidebar">sidebar</div>
        <div className="event-cards">eventcards</div>
      </div>
    )
  }
}