import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import Dashboard from './Dashboard.jsx';

export default class LoggedInView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
    <div className="dashboard grid">
        <SideBar />
        <Dashboard />
      </div>
   )}
}