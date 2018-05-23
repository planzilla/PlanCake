import React, {Component} from 'react';
import io from 'socket.io-client';
import Promise from 'bluebird';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import VoteView from './VotingView.jsx';


class Chat extends Component{
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
    this.socket = io.connect();
    this.socket.on('connection', () => { console.log('boardview connection'); });
    this.socket.on('chatMessage', (user) => {
      this.props.setAllMessages(this.props.allMessages.concat([user]));
    });
    this.socket.on('pinMessage', (pins) => {
      this.props.setPinnedMessages(pins); 
    }); 
    this.input = this.input.bind(this);
    this.send = this.send.bind(this);
    //TODO need to send a get request for any pins with a boardid of boardid
      //TODO clear pinnedMessages everytime the get request returns anything that is defined

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
    function User(userId, boardId, message, username) {
      this.username = username;
      this.boardId = boardId;
      this.userId = userId;
      this.text = message;
    }

    if (this.state.message.length < 1) {
      return;
    } else if (this.state.message.slice(0, 4) === '/pin'){
      Promise.resolve(this.socket.emit('pinMessage', new User(id, boardId, this.state.message.slice(5), this.props.username)))
      .then(() => { this.setState({ message: '' }); })
    } else {
      Promise.resolve(this.socket.emit('chatMessage', new User(id, boardId, this.state.message, this.props.username)))
      .then(() => { this.setState({ message: '' }); });
    }
  }

  method() {
    //set state of sibling component (pin view) 
  }

  render() {
    return (
      <div className="chat-view chat grid">
      {<div className="connected-user">{`You've connected to ${this.props.selected}`}</div>}
        <div id="messages">
          {this.props.allMessages.map((user, key, array) => {
          if (user.username !== this.props.username) {
            return <div className="received-message" key={key}><p><strong>{`${user.username} : `}</strong>{`${user.text}`}</p></div>
          } else {
            return <div key={key} className="user-message"><p className="user-message-text">{user.text}</p></div>
          };
          })}
          <div ref={(e) => { this.messageEnd = e }}></div>
        </div>
        <form className="chat-form">
          <input onChange={this.input} value={this.state.message} id="m" autoComplete="off"/>
          <button onClick={this.send} type="submit" id="send-button"><Icon name="send"/></button>
        </form>
        <VoteView 
        pinnedMessages={this.props.pinnedMessages}
        liked={this.props.liked}
        />
      </div>
    )
  }
}

export default Chat;