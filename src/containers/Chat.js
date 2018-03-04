import React, { Component } from 'react';
import { database } from 'database/firebase';
import { findDOMNode } from 'react-dom';

import { map } from 'lodash';
import moment from 'moment';
import 'moment/locale/ko';
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }

    moment.locale('ko');

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.dispatchMessageData = this.dispatchMessageData.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    const messagesContainer = findDOMNode(this.messagesContainer);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  getCreatedDate(value) {
    return moment(value).fromNow();
  }

  dispatchMessageData() {
    const { message } = this.state;
    const { uid, displayName, photoURL } = this.props.currentUser;
    const timestamp = new Date().getTime();

    database.ref('messages').push().set({
      sender: displayName,
      senderImg: photoURL,
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
    const { messages, settings } = this.props;
    const { message } = this.state;

    const styles = {
      color: settings ? settings.backgroundColor : ""
    }
    const sampleImg = 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/c14.0.48.48/p48x48/10354686_10150004552801856_220367501106153455_n.jpg?oh=26830885109cf41da057908f11c5ec33&oe=5B0FF559';
    return (
      <div>
        <ul className="todo-app__chat-content" ref={(el) => { this.messagesContainer = el; }}>
          {messages && map(messages, (value, key) => (
            <li key={key}>
              <span>
                <img src={ value.senderImg ? value.senderImg : sampleImg } alt={value.sender} />
              </span>
              <em>{value.sender}</em>
              <p>
                {value.message}
                <span>{this.getCreatedDate(value.timestamp)}</span>
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={ this.handleMessageSubmit }>
          <input 
            placeholder="메시지를 입력해주세요" 
            value={ message }
            onChange={ this.handleMessageChange } 
          />
          <button type="submit" style={styles}>
            <i className="far fa-paper-plane"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default Chat;