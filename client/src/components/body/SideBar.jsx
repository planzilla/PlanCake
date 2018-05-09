import React, { Component } from 'react';
import CreateEvent from './CreateEvent.jsx';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="sidebar">
        <CreateEvent />        
      </div>
    )
  }
}