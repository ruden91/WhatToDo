import React, { Component } from 'react';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleAddTodoItem, toggleAddTodoItemButton } = this.props;

    return (
      <header className="todo-app-header">
        <span className="todo-app-header__header-logo">
          <i className="fab fa-codepen"></i>
        </span>
        <button 
          className="todo-app-header__show-add-button"
          onClick={ () => toggleAddTodoItem() }
        >
          <span className={toggleAddTodoItemButton ? 'open' : 'close'}>
          </span>
        </button>
      </header>
    )
  }
}
