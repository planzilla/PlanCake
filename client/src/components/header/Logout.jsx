import React, { Component } from 'react'

const Logout = (props) => (
    <a href="/" className="logout-nav">
      <h3 onClick={props.logout}>Logout</h3>
    </a>
)

export default Logout;