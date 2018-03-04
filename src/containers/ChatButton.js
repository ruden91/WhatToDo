import React, { Component } from 'react';

class ChatButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatContainerIsOpen: false
    };

    this.openChatContainer = this.openChatContainer.bind(this);
    this.closeChatContainer = this.closeChatContainer.bind(this);
  }

  openChatContainer() {
    this.setState({
      chatContainerIsOpen: true
    })
  }

  closeChatContainer() {
    this.setState({
      chatContainerIsOpen: false
    })
  }

  render() {
    const style = {
      backgroundColor: this.props.settings ? this.props.settings.backgroundColor : ""
    }
    const chatClass = this.state.chatContainerIsOpen ? 'chat-button-open' : '';
    return (
      <div>
        <button 
          className="todo-app__chat-button"
          onClick={ this.openChatContainer }
          style={ style }
        >
          <i className="far fa-comment-alt"></i>
        </button>
        <div 
          className={`todo-app__chat-container ${chatClass}`}
        >
          <header>
            <p>chat application</p>
            <button onClick={ this.closeChatContainer }>close</button>
          </header>
          <div>
            chat content
          </div>
        </div>
      </div>
    )
  }
}

export default ChatButton;