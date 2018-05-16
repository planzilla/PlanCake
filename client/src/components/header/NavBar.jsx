import React, { Component } from 'react';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';
import axios from 'axios';
import Logout from './Logout.jsx';
import Inbox from './Inbox.jsx';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      navView: 'login',
      // status: 'not authenticated',
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleView = this.handleView.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // Modal.setAppElement('body');
  }

  handleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen})
  }

  handleView(view) {
    this.setState({navView: view})
  }
  
  sendLogin(credentials) {
    return axios.post('/api/login', credentials)
  }
  
  logout() {
    axios.get('/api/logout')
    .then(() => {
      this.setState({
        status: 'not authenticated',
        navView: 'login',
      })
    })
  }
// TODO need to render logout
  render() {
    return(
      <div className="header grid">
        <Inbox />
      <img className="logo jsas" src="plancake2.png" alt="plancake2.png"/>
        <div className="nav-links">
          <h3>About Us</h3>
          <h3>How It Works</h3>
          {this.props.view === 'dashboard' ? <Logout  logout={this.logout} /> : <h3 onClick={this.handleModal.bind(this)}>Login</h3>}
        </div>
            {this.state.navView === 'login' 
            ? <Login 
            handleModal={this.handleModal}
            sendLogin={this.sendLogin}
            setUser={this.props.setUser}
            handleView={this.handleView}
            modalIsOpen={this.state.modalIsOpen}
            /> 
            : <Signup 
            handleModal={this.handleModal}
            sendLogin={this.sendLogin}
            setUser={this.props.setUser}
            modalIsOpen={this.state.modalIsOpen}            
            />}
      </div>
    )
  }
}