import React, {Component} from 'react';
import io from 'socket.io-client';
import Promise from 'bluebird';
import axios from 'axios';

class Chat extends Component{
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      allMessages: [],
      connected: '',
    }
    axios.get(`/api/getChatMessages?boardId=${this.props.boardId}`)
    .then(({ data }) => { 
      if (!!data) { this.setState({ allMessages: data.concat(this.state.allMessages) }) };
    });
    this.socket = io.connect();
    this.socket.on('connection', () => { console.log('boardview connection'); });
    this.socket.on('chatMessage', (user) => {
      this.setState({ allMessages: this.state.allMessages.concat([user]) })
      console.log(this.state.allMessages)
    })
    this.input = this.input.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    const { selected, username, boardId } = this.props;
    function user(roomname, username, boardId) {
      this.username = username;
      this.roomname = roomname;
      this.boardId = boardId;
      this.text = '';
    }
    this.socket.emit('room', new user(selected, username, boardId));
    this.socket.on('enterRoom', user => {
      this.setState({ connected: user.text})
    });
  }

  componentDidUpdate() {
    // this.messageEnd.scrollIntoView( {behavior: 'smooth'} )
    const messageList = document.getElementById('messages');
    messageList.scrollTop = messageList.scrollHeight;
  }

  input(e) {
    this.setState({ message: e.target.value });
  }

  send(e) {
    e.preventDefault();
    function user(userId, boardId, message, username) {
      this.userId = userId;
      this.boardId = boardId;
      this.text = message;
      this.username = username;
    }
    const { username, id } = this.props.userData;
    const { boardId } = this.props;
    const message = Promise.resolve(this.socket.emit('chatMessage', new user(id, boardId, this.state.message, this.props.username)));
    message.then(() => { this.setState({ message: '' }); });
  }

  render() {
    return (
      <div className="chat-view chat grid">
        <div id="messages">
          {this.state.allMessages.map((user, key, array) => {
            if (user.username !== this.props.username) {
              return <div className="received-message" key={key}><span><strong>{`${user.username} : `}</strong>{`${user.text}`}</span></div>
            } else {
              return <div key={key} className="user-message"><span><p>{user.text}</p></span></div>
            };
          })}
          {<div className="chat-connected">{this.state.connected}</div>}
          <div ref={(e) => { this.messageEnd = e }}></div>
        </div>
        <form className="chat-form">
          <input onChange={this.input} value={this.state.message} id="m" autoComplete="off"/>
          <button onClick={this.send} type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;