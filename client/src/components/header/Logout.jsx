import React, { Component } from 'react'

const Logout = (props) => (
    <a href="/">
      <h3 className="logout-nav" onClick={props.logout}>Logout</h3>
    </a>
)

export default Logout;