import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Logout = (props) => (
    <a href="/" className="logout-nav">
      <h3 onClick={props.logout}>Logout</h3>
    </a>
)

export default Logout;