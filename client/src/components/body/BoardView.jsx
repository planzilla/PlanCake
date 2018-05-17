import React, {Component} from 'react';
import io from 'socket.io-client';
import Promise from 'bluebird';

class Chat extends Component{
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      allMessages: [],
    }
    this.socket = io.connect();
    this.socket.on('connection', () => { console.log('boardview connection'); });
    this.input = this.input.bind(this);
    this.send = this.send.bind(this);
    this.socket.on('chatMessage', message => {
      if (message.includes(this.props.userData.username)) { message = message.split(': ')[1]; } 
      let { allMessages } = this.state;
      let newAllMessages = allMessages.concat([message]);
      this.setState({ allMessages: newAllMessages });
    });
  }

  componentDidMount() {
    this.socket.emit('room', (17 << 2).toString().concat(this.props.selected));
  }

  input(e) {
    this.setState({ message: e.target.value });
  }

  send(e) {
    e.preventDefault();
    const { username } = this.props.userData;
    const message = Promise.resolve(this.socket.emit('chatMessage', `${username}: ${this.state.message}`));
    message.then(() => { this.setState({ message: '' }); });
  }

  render() {
    return (
      <div className="chat-view chat grid">
        <div id="messages">
          {this.state.allMessages.map((message, key) => {
            if (message.includes(':')) {
              return <div className="received-message" key={key}><span>{message}</span></div>
            } else {
              return <div key={key} className="user-message"><span>{message}</span></div>
            };
          })}
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