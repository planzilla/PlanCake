import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/header/NavBar.jsx';
import SplashPage from './components/body/SplashPage.jsx'
import LoggedInView from './components/body/LoggedInView.jsx';
import EventSummary from './components/body/EventSummary.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData:
        {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          username: null,
          createdAt: null,
          updatedAt: null
        }
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(obj) {
    this.setState({userData: obj});
  }

  render() {
    return (
        <Switch>
          <Route exact path="/" component={ SplashPage } />
          <Route path="/loggedinview" render={() => <LoggedInView userData={this.state.userData} /> } />
          {/* <Route path={`/events/${eventId}`} render={() => <EventSummary userData={this.state.userData} /> } /> */}
        </Switch>
    )
  }
};
