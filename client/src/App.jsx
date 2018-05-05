import React, { Component } from 'react';
<<<<<<< HEAD
import NavBar from './components/header/NavBar.jsx';
import SplashPage from './components/body/SplashPage.jsx';
import ContactInfo from './components/footer/ContactInfo.jsx';
import Dashboard from './components/body/Dashboard.jsx';
// import Test from './test.jsx' (used to test rendering of components)
=======
import { Route, Switch } from 'react-router-dom';
>>>>>>> bcccd3fd9f8a5d7dd17d29f510fff6416fb4b1ff

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
<<<<<<< HEAD
      // <div className="splash grid">
      //   <NavBar />
      //   <SplashPage />
      //   <ContactInfo />
      // </div>

      <div className="dashboard grid">
      <NavBar />
      <Dashboard />
      <ContactInfo />
=======
      <div style={{backgroundColor: "#fffff"}}>

        <Switch>
          <Route exact path="/" render={ props => <h1>hello react</h1> } />
          {/* <Route path="/example" component={ Example } /> */}
          {/* <Route path="/example2" render={ props => {
            return (
              <Example2 function={ function }/>
            )}}
          /> */}

          </Switch>
>>>>>>> bcccd3fd9f8a5d7dd17d29f510fff6416fb4b1ff
      </div>
    )
  }
};