import React, { Component } from 'react';
import Login from './Login.jsx'
import Modal from '../helpers/Modal.jsx';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      view: 'login'
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleModal() {
    this.setState(
      {
        modalIsOpen: !this.state.modalIsOpen
      }
    )
  }

  handleView() {
    this.setState(
      {
        view: this.state.view === 'login' ? 'singup' : 'login'
      }
    )
  }

  render() {
    return(
      <div className="header grid">
        <div className="img">
          <img src="plancake2.png" alt="plancake.png"/>
        </div>
        <div className="login jsas">
          <a onClick={this.handleModal.bind(this)}>Login</a>
          {/* <Modal /> */}
        </div>
      </div>
    )
  }
}