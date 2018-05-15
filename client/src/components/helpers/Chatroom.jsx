import React, { Component } from 'react';

export default class Chatroom extends Component{
  constructor(props){
    super(props, context);
    
    const { chatHistory } = props;
    
    this.state = {
      chatHistor,
      input: '',
    }

    this.updateChatHistory = this.updateChatHistory.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  componentDidMount() {
    this.props.registerHandler(this.onMessageReceived)
  }

  componentDidUpdate() {
    this.scrollChatToBottom()
  }

  componentWillMount() {
    this.props.unregisterHandler()
  }

  updateChatHistory(entry) {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
  }

  onSendMessage() {
    if (!this.state.input) {
      return;
    }
    this.props.onSendMessage(this.state.inpit, (err) => {
      if (err) {
        return console.error(err)
      }
      return this.setState({ input: '' })
    })
  }

}