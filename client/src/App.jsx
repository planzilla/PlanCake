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

    }
  }

  // componentDidMount() {
  //   axios.get('/api/user').then(() => {console.log('success')});
  // }

  render() {
    return (
      <div className="splash grid">
      <NavBar />

      <Switch>
        <Route exact path="/" component={ SplashPage } />
        <Route path="/dashboard" component={ Dashboard } />
      </Switch>

      <Link to="/dashboard">dashboard</Link>
      <ContactInfo />
      </div>


      // {/* </div> */}
      // == route to splash if not logged in ==

      <div className="full-height-width grid">
      <NavBar/>

      <LoggedInView />
      <ContactInfo />
      </div>
      // == route after login is authenitcated == 

        // <Switch>
        //   <Route exact path="/" render={ props => <h1>hello react</h1> } />
        //   <Route path="/example" component={ Example } />
        //   <Route path="/example2" render={ props => {
        //     return (
        //       <Example2 function={ function }/>
        //     )}}
        //   />

        //   </Switch> 
    )
  }
};