import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';
import axios from 'axios';

export default class LoggedInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],

    }
  }

  // load user events and info
  componentDidMount() {
    console.log(this.props);
    axios.get('/api/userEvents', this.props.userData.id).then(data => console.log(data));
  }

  render() {
   return (
    <div className="dashboard grid">
        <SideBar />
        <Dashboard />
      </div>
   )}
}