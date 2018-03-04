import React, { Component } from 'react';
import { database } from 'database/firebase';
import { findDOMNode } from 'react-dom';

import { map } from 'lodash';
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.dispatchMessageData = this.dispatchMessageData.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    const messagesContainer = findDOMNode(this.messagesContainer);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  dispatchMessageData() {
    const { message } = this.state;
    const { uid, displayName } = this.props.currentUser;
    const timestamp = new Date().getTime();

    database.ref('messages').push().set({
      sender: displayName,
      message,      
      timestamp
    })
  }

  handleMessageChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    if (this.state.message === '') {
      return;
    }

    this.dispatchMessageData();

    this.setState({
      message: ''
    })
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
       this.scrollToBottom();
  }

  render() {
    const { messages } = this.props;
    const { message } = this.state;

    return (
      <div>
        <ul className="todo-app__chat-content" ref={(el) => { this.messagesContainer = el; }}>
          {messages && map(messages, (value, key) => (
            <li key={key}>{value.sender}: {value.message}</li>
          ))}
        </ul>
        <form onSubmit={ this.handleMessageSubmit }>
          <input 
            placeholder="메시지를 입력해주세요" 
            value={ message }
            onChange={ this.handleMessageChange } 
          />
          <button type="submit">
            <i className="far fa-paper-plane"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default Chat;