import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import SplashPage from './components/body/SplashPage.jsx';
import NavBar from './components/header/NavBar.jsx';
import ContactInfo from './components/footer/ContactInfo.jsx';
import LoggedInView from './components/body/LoggedInView.jsx';

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

          <Route 
            exact path="/" 
            render={() => 
            <SplashPage 
            setUser={this.setUser}
            />}
          />

          <Route 
            exact path="/loggedinview" 
            render={() => 
            <LoggedInView  
            userData={ this.state.userData }
            />} 
          />

        </Switch>
    )
  }
};
