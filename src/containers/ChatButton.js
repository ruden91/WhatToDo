import React, { Component } from 'react';

class ChatButton extends Component {
  constructor(props) {
    super(props);

    this.handleChatButton = this.handleChatButton.bind(this);
  }

  handleChatButton() {
    console.log('handleChatButton');
  }

  render() {
    return (
      <button 
        className="todo-app__chat-button"
        onClick={this.handleChatButton}
      >
        <i className="far fa-comment-alt"></i>
      </button>
    )
  }
}

export default ChatButton;