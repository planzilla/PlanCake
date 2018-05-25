import React, { Component } from 'react';
import NavBar from '..//header/NavBar.jsx';
import ContactInfo from '../footer/ContactInfo.jsx';
import AOS from 'aos';
import $ from 'jquery';

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar setUser={this.props.setUser} username={this.props.username} />
      <div className="splash grid">
        <div className="body grid">
          <img className="splash-image" src="splashtext3.png" alt="splashtext3png" />
          <div className="how-it-works grid">
            <h1 className="how-title jsas">How It Works</h1>
            <div className="how-row1 grid">
              <img src="invite.png" className="how-it-works-img how-pic1" 
                data-aos="flip-right"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
              <p className="how-description">
                Thinking about going somewhere?
                <br />
                Invite your friends and start planning together!
              </p>
            </div>
            <div className="how-row2 grid" id="how-it-works">
              <p className="how-description how-words2">
                Discuss each topic on its own message board.
                <br />
                No more getting lost in the conversation!
            </p>
              <img src="discuss.png" className="how-it-works-img how-pic2" 
                data-aos="flip-left"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
            </div>
            <div className="how-row3 grid">
              <img src="vote.png" className="how-it-works-img how-pic3" 
                data-aos="flip-right"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
              <p className="how-description">
                Can't decide on where to eat or what to see?
                <br />
                Put it to a vote!
              </p>
            </div>
            <div className="how-row4 grid">
              <p className="how-description how-words4">
                Need something done?
                <br />
                Assign tasks individually or to the group!
            </p>
              <img src="goals.png" className="how-it-works-img how-pic4" 
                data-aos="flip-left"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
            </div>
            <div className="how-row5 grid">
              <img src="done.png" className="how-it-works-img how-pic5" 
                data-aos="flip-right"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
              <p className="how-description">
                Get an overview of where everyone is in the process.
              </p>
            </div>
            <div className="how-row6 grid">
              <p className="how-description how-words6">
                Once you’ve committed to something, set it in stone!
                <br />
                By the day of the trip you’ll be glad it’s all planned out.
            </p>
              <img src="bonvoyage.png" className="how-it-works-img how-pic6" 
                data-aos="flip-left"
                data-aos-duration="1000" 
                data-aos-delay="100"
                data-aos-once="false"
              />
            </div>
          </div>
          <div className="about-us grid" id="about-us">
            <h1 className="about-title jsas">About Us</h1>
            <img src="BrandonSp.png" alt="BrandonSp.png" className="brandon-pic"
              data-aos="flip-right"
              data-aos-duration="1000" 
              data-aos-delay="100"
              data-aos-once="false"
            />
            <img src="XtinaSp.png" alt="XtinaSp.png" className="christina-pic"
              data-aos="flip-up"
              data-aos-duration="1000" 
              data-aos-delay="100"
              data-aos-once="false"
            />
            <img src="WillSp.png" alt="WillSp.png" className="will-pic"
              data-aos="flip-left"
              data-aos-duration="1000" 
              data-aos-delay="100"
              data-aos-once="false"
            />
            <h2 className="brandon-about-name">Brandon Villiados</h2>
            <h2 className="xtina-about-name">Christina Yuen</h2>
            <h2 className="will-about-name">William Ha</h2>
            <h4 className="brandon-about">I aim to make planning as seamless as possible for friends and family. It's fun to plan, but planning should be simple and centralized. PlanCake offers support to make planning exciting!</h4>
            <h4 className="xtina-about">Hanging out with friends is super fun, but the planning process can be tiring and tedious. I needed an application like PlanCake to easily coordinate amongst friends for different events.</h4>
            <h4 className="will-about">Plans are hard to coordinate. I wanted to create an environment where everyone can plan as easy as possible. We have accomplished in making a platform that is both easy and fun to use.</h4>
          </div>
        </div>
        <ContactInfo />
      </div>
      </div>
    )
  }
}