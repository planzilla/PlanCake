import React, { Component } from 'react';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';
import Modal from 'react-modal';
import axios from 'axios';
import Logout from './Logout.jsx';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      view: 'login',
      status: 'not authenticated',
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleView = this.handleView.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  handleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen})
  }

  handleView(view) {
    this.setState({view: view})
  }
  
  authenticate() {
    this.setState({ status: 'authenticated' })
  }

  sendLogin(credentials) {
    return axios.post('/api/login', credentials)
  }
  
  logout() {
    axios.get('/api/logout')
    .then(() => {
      this.setState({
        status: 'not authenticated',
        view: 'login',
      })
    })
  }

  render() {
    return(
      <div className="header grid">
      <img className="logo jsas" src="plancake2.png" alt="plancake2.png"/>
        <div className="nav-links">
          <h3>About Us</h3>
          <h3>How It Works</h3>
          {this.state.view === 'logout' ? null : <h3 onClick={this.handleModal.bind(this)}>Login</h3>}
        {this.state.status === 'authenticated' 
        ? <Logout  logout={this.logout} /> : null}
        </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            >
            {this.state.view === 'login' 
            ? <Login 
            handleView={this.handleView}
            handleModal={this.handleModal}
            sendLogin={this.sendLogin}
            setUser={this.props.setUser}
            authenticate={this.authenticate}
            /> 
            : <Signup 
            handleModal={this.handleModal}
            sendLogin={this.sendLogin}
            setUser={this.props.setUser}
            />}
          </Modal>
      </div>
    )
  }
}