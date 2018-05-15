import React, {Component} from 'react';
import io from 'socket.io-client';
import Promise from 'bluebird';


// socket.emit('chatMessage', '[message]') //you will see this message log to console

// socket.on('chatMessage', (message) => { 
  //   console.log(message); // logs any messages sent to chatMessage
  // });
  
  class Chat extends Component{
    constructor(props) {
      super(props)
      this.state = {
        message: '',
        allMessages: [],
      }
      this.socket = io.connect();
      
      this.socket.on('connect', (message) => { //listens for socket to connect
        console.log('boardview connection', message)
      })
    this.input = this.input.bind(this);
    this.send = this.send.bind(this);
    this.socket.on('chatMessage', message => {
      let { allMessages } = this.state;
      let newAllMessages = allMessages.concat([message]);
      this.setState({ allMessages: newAllMessages });
    })
  }

  input(e) {
    this.setState({ message: e.target.value });
  }

  send() {
    const promise = Promise.resolve(this.socket.emit('chatMessage', this.state.message));
    promise.then(() => {
      this.setState({ message: '' });
    });
  }
    
  render() {
    return (
      <div className="chat-view grid">
        <ul className="messages">
          {this.state.allMessages.map((message, key) => <li key={key}>{message}</li>)}
        </ul>
        <form className="chat-form">
          <input onChange={this.input} value={this.state.message} id="m" autoComplete="off"/>
          <button onClick={this.send} type="button">Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;