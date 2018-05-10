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
      userData:
        {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          username: null,
        }
    }

    this.setUser = this.setUser.bind(this);

    axios.get('/api/user')
    .then((result) => 
      this.setState({userData: result.data}));
  }

  setUser(obj) {
    console.log('obj', obj)
    this.setState( obj);
  }

  render() {
    return (
      <div className="splash grid">
      {console.log('userData', this.state.userData)}
        <NavBar setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <Route exact path="/loggedinview" render={() => {
            return ( 
            <LoggedInView userData={this.state.userData} /> 
            )}} 
          />
        </Switch>
        <Link to="/loggedinview">dashboard</Link>
        <ContactInfo />
      </div>
    )
  }
};

