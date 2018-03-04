import React, { Component } from 'react';

import Chat from 'containers/Chat';

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
    const { currentUser, messages, settings } = this.props;
    const style = {
      backgroundColor: settings ? settings.backgroundColor : ""
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
          <header style={ style } >
            <button onClick={ this.closeChatContainer }>close</button>
          </header>
          <div>
            <Chat currentUser={ currentUser } messages={ messages } settings={ settings } />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatButton;