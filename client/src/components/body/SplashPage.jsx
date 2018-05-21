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
                <h2 className="brandon-about-name">Brandon Villiados</h2>
                <h2 className="xtina-about-name">Elaine Yuen</h2>
                <h2 className="will-about-name">Will Ha</h2>
                <h4 className="brandon-about">I aim to make planning as seemless as possible for friends and family. It's fun to plan, but planning should be simple and centralized. Plancake offers support to make planning exciting!</h4>
                <h4 className="xtina-about">Plancake is my passion because it is an application that organizes everything about upcoming trips. Also, I think planning should be a piece of cake!</h4>
                <h4 className="will-about">Plans are hard to coordinate. I wanted to create an environment where everyone can plan as easy as possible. We have accomplished in making a platform that is both easy and fun to use.</h4>
              </div>
          </div>
        <ContactInfo />
      </div>
    )
  }
}