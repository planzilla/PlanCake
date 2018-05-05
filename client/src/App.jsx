import React, { Component } from 'react';
import NavBar from './components/header/NavBar.jsx';
import SplashPage from './components/body/SplashPage.jsx';
import ContactInfo from './components/footer/ContactInfo.jsx';
import Dashboard from './components/body/Dashboard.jsx';
// import Test from './test.jsx' (used to test rendering of components)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div className="splash grid">
      //   <NavBar />
      //   <SplashPage />
      //   <ContactInfo />
      // </div>

      <div className="dashboard grid">
      <NavBar />
      <Dashboard />
      <ContactInfo />
      </div>
    )
  }
};