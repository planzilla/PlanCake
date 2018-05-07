import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/header/NavBar.jsx';
import SplashPage from './components/body/SplashPage.jsx';
import ContactInfo from './components/footer/ContactInfo.jsx';
import Dashboard from './components/body/Dashboard.jsx';
// import Test from './test.jsx' (used to test rendering of components)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  // Goodmorning/afternoon/evening Beautiful peeps. You're amazing engineers.
  // Just a quick note for the team before you both embark on your journey trying
  // to hack stuff together.

  // componentDidMount workers. I've set up the route in routes and in controller
  // I got lost in the O-Auth and the css so I wasn't able to test data persistence
  // with postgres. 

  // Also check out the nav and let me know what you think. I was just messing around
  // with styling it because css is FUN!

  // ++Stand up responses for May 6++
  //   I've finished stubbing out all the classes for the splash page and the dashboard
  //   I need to finish O-Auth
  //   Lastly, there's a learning curve to get o-auth to work and I also get easily lost
  //   styling stuff. I need to work on time boxing especially with css.Dashboard

  // Alright, have a good morning/day and I'll see you both soon

  componentDidMount() {
    axios.post('/api/user', {firstName: "Brandon", lastName: "Villiados"})
    .then((data) => {console.log("post was a success", data)})
  } 

  render() {
    return (
      <div className="splash grid">
        <NavBar />
        <SplashPage />
        <ContactInfo />
      </div>
      // == route to splash if not logged in ==

      // <div className="full-height-width grid">
      // <NavBar/>
      // <Dashboard />
      // <ContactInfo />
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