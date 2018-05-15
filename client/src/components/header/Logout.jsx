import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Logout = (props) => (
    <Link to="/">
      <h3 className="logout-nav" onClick={props.logout}>Logout</h3>
    </Link>
)

export default Logout;