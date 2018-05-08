import React, { Component } from 'react';
import axios from 'axios';
import Login from '../header/Login.jsx';
import Modal from 'react-modal';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  sendLogin(credentials) {
    return axios.post('/api/user', credentials)
  }

  render() {
    return(
      <Modal>
        <h5>Hello World</h5>
        </Modal>
    )
  }

}