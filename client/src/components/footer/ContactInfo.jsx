import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    // }
  }

  render() {
    return (
      <div className="footer info">
        <hr className="hr-grid" />
        <div className="footer-containers">

          <div className="footer-container-navigate">
            <h4>Navigate</h4>
            <div>
              <a href="http://plancake.co/#about-us">About Us</a>
              <br/>
              <a href="http://plancake.co/#how-it-works">How it Works</a>
              <br/>
              <a href="http://plancake.co/">FAQ</a>
            </div>
          </div>


          <div className="footer-container-contribute">
            <h4>Suggestions</h4>
            <div>
              <a href="https://github.com/planzilla/PlanCake"><Icon name="github"/>GitHub</a>
              <br/>
              <a href="mailto:plancake.co@gmail.com"><Icon name="mail outline" />Email</a>
            </div>
          </div>

          <div className="footer-container-contact">
            <h4>Contact Us</h4>
            <div>
              <a href="https://www.linkedin.com/in/brandon-villiados-7b242274"><Icon name="linkedin"/>Brandon Villiados</a>
              <br/>
              <a href="https://www.linkedin.com/in/ceyuen/"><Icon name="linkedin"/>Christina Yuen</a>
              <br/>
              <a href="https://www.linkedin.com/in/wvha17"><Icon name="linkedin"/>William Ha</a>
            </div>
          </div>

        </div>
      </div>
    )
  }
}