import React, { Component } from 'react';
import io from 'socket.io-client';
import Promise from 'bluebird';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import VoteView from './VotingView.jsx';
import RightSideBar from './RightSideBar.jsx';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
    this.socket = io('/room');
    this.socket.on('connection', () => { console.log('boardview connection'); });
    this.socket.on('chatMessage', (user) => {
      this.props.setAllMessages(this.props.allMessages.concat([user]));
    });
    this.socket.on('pinMessage', (pins) => {
      this.props.setPinnedMessages(pins); 
    }); 
    this.input = this.input.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    const { selected, username, boardId } = this.props;
    function user(roomname, username, boardId) {
      this.username = username;
      this.boardId = boardId;
      this.roomname = roomname;
    };
    this.socket.emit('room', new user(selected, username, boardId));
  }

  componentDidUpdate() {
    const messageList = document.getElementById('messages');
    const votingList = document.getElementsByClassName('vote-container');
    votingList.scrollTop = votingList.scrollHeight;
    messageList.scrollTop = messageList.scrollHeight;
  }

  input(e) {
    this.setState({ message: e.target.value });
  }

  send(e) {
    e.preventDefault();
    const { username, id } = this.props.userData;
    const { boardId } = this.props;
    function User(userId, boardId, message, firstName, lastName) {
      this.user = `${firstName} ${lastName.slice(0, 1)}.`;
      this.boardId = boardId;
      this.userId = userId;
      this.text = message;
    }

    if (this.state.message.length < 1) {
      return;
    } else if (this.state.message.slice(0, 4) === '/pin'){
      Promise.resolve(this.socket.emit('pinMessage', new User(id, boardId, this.state.message.slice(5), this.props.userData.firstName, this.props.userData.lastName)))
      .then(() => { this.setState({ message: '' }); })
    } else {
      Promise.resolve(this.socket.emit('chatMessage', new User(id, boardId, this.state.message, this.props.userData.firstName, this.props.userData.lastName)))
      .then(() => { this.setState({ message: '' }); });
    }
  }

  render() {
    return (
      <div className="chat-view chat grid">
        {<div className="connected-user">{`You've connected to ${this.props.selected}`}</div>}
        <div id="messages">
          {this.props.allMessages.map((message, key, array) => {
            if (message.userId !== this.props.userData.id) {
              return <div className="received-message" key={key}><p><strong>{`${message.user} : `}</strong>{`${message.text}`}</p></div>
            } else {
              return <div key={key} className="user-message"><p className="user-message-text">{message.text}</p></div>
            };
          })}
          <div ref={(e) => { this.messageEnd = e }}></div>
        </div>
        <form className="chat-form">
          <input onChange={this.input} value={this.state.message} id="m" autoComplete="off" />
          <button onClick={this.send} type="submit" id="send-button"><Icon name="send" /></button>
        </form>
        <div className="right-sidebar">
          <RightSideBar
            currentEvent={this.props.currentEvent}
            activeEventsUsers={this.props.activeEventsUsers}
            eventAttendees={this.props.eventAttendees}
            pinnedMessages={this.props.pinnedMessages}
            liked={this.props.liked}
          />
        </div>
      </div>
    )
  }
}

export default Chat;