import React, { Component } from 'react';
import NavBar from '..//header/NavBar.jsx';
import ContactInfo from '../footer/ContactInfo.jsx';

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="splash grid">
        <NavBar setUser={this.props.setUser} username={this.props.username} />
          <div className="body grid">
            <img src="splashPhoto.jpg" alt="splashPhoto.jpg"/>
              {/* <div className="how-it-works grid"> */}
                {/* <h1 className="how-title jsas">How It Works</h1>
                <div className="how-row1 grid">
                  <h3 className="how-pic1">image 1</h3>
                </div>
                <div className="how-row2 grid">
                  <h3 className="how-pic2">image 2</h3>
                </div>
                </div>*/}
              <div className="about-us grid">
                <h1 className="about-title jsas">About Us</h1>
                <img src="BrandonSp.png" alt="BrandonSp.png" className="brandon-pic"/>
                <img src="XtinaSp.png" alt="XtinaSp.png" className="christina-pic"/>
                <img src="WillSp.png" alt="WillSp.png" className="will-pic"/>
              </div>
          </div>
        <ContactInfo />
      </div>
    )
  }
}