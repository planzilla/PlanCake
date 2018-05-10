import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/header/NavBar.jsx';
import SplashPage from './components/body/SplashPage.jsx';
import ContactInfo from './components/footer/ContactInfo.jsx';
import LoggedInView from './components/body/LoggedInView.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      username: null,
    }

    this.setUser = this.setUser.bind(this);
  }

  setUser(obj) {
    this.setState(obj);
  }

  render() {
    return (
      <div className="splash grid">
      <NavBar setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={ SplashPage } />
          <Route exact path="/loggedinview" component={ LoggedInView } />
        </Switch>
      <Link to="/loggedinview">dashboard</Link>
      <ContactInfo />
      </div>
    )
  }
};