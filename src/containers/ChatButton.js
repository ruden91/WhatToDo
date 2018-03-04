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
    const style = {
      backgroundColor: this.props.settings ? this.props.settings.backgroundColor : ""
    }

    return (
      <button 
        className="todo-app__chat-button"
        onClick={this.handleChatButton}
        style={ style }
      >
        <i className="far fa-comment-alt"></i>
      </button>
    )
  }
}

export default ChatButton;