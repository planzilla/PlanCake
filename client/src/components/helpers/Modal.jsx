import React, { Component } from 'react';
import axios from 'axios';
import Login from '../header/Login.jsx';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  sendLogin(credentials) {
    return axios.post('/api/user', credentials)
  }



}