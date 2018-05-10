import React, { Component } from 'react';

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  render() {
    return(
      <div>hello this is event card
        <div className="ui raised segment">
          <p>Pellentesque habitant morbi</p>
        </div>
      </div>
    )
  }
}