import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Logout = (props) => (
    <Link to="/">
      <h3 onClick={props.logout}>Logout</h3>
    </Link>
)

export default Logout;