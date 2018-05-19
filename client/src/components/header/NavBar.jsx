import React, { Component } from 'react';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';
import axios from 'axios';
import Logout from './Logout.jsx';
import Inbox from './Inbox.jsx';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      navView: 'login',
      error: ''
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleView = this.handleView.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleError(errorMsg) {
    this.setState({ error: errorMsg })
  }

  handleModal() {
    if (!this.state.modalIsOpen) {
      this.handleView('login')
    }
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      error: ''
    })
  }

  handleView(view) {
    this.setState({ navView: view })
  }

  sendLogin(credentials) {
    return axios.post('/api/login', credentials)
  }

  logout() {
    axios.get('/api/logout')
      .then(() => {
        this.setState({
          status: 'not authenticated',
        })
      })
  }
  // TODO need to render logout
  render() {
    return (
      <div className="header-navbar grid">
        <img className="logo jsas" src="plancakepng.png" />
        {
          this.props.username !== null
            ? <div className="nav-links-loggedIn">
              <div>
                <Inbox
                  invites={this.props.invites}
                  acceptInvite={this.props.acceptInvite}
                  ignoreInvite={this.props.ignoreInvite}
                />
              </div>
              <div>
                <Link to='/loggedInView' className="header-icon"><Icon name='home' size='large' /></Link>
              </div>
              <div >
                <h3 className="nav-name">{this.props.userData.firstName}</h3>
              </div>
              <div >
                <Logout logout={this.logout} className="nav-name"/>
              </div>
            </div>
            : <div className="nav-links">
              <h3>About Us</h3>
              <h3>How It Works</h3>
              <h3 onClick={this.handleModal.bind(this)}>Login</h3>
            </div>
        }
        {
          this.state.navView === 'login'
            ? <Login
              handleModal={this.handleModal}
              sendLogin={this.sendLogin}
              setUser={this.props.setUser}
              handleView={this.handleView}
              modalIsOpen={this.state.modalIsOpen}
              error={this.state.error}
              handleError={this.handleError}
            />
            : <Signup
              handleModal={this.handleModal}
              sendLogin={this.sendLogin}
              setUser={this.props.setUser}
              modalIsOpen={this.state.modalIsOpen}
              error={this.state.error}
              handleError={this.handleError}
              handleView={this.handleView}
            />
        }
      </div>
    )
  }
}