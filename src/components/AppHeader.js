import React, { Component } from 'react';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleAddTodoItem } = this.props;

    return (
      <header className="todo-app-header">
        <button 
          className="todo-app-header__show-add-button"
          onClick={ () => toggleAddTodoItem() }
        >
          <i className="fas fa-plus-circle"></i>
        </button>
      </header>
    )
  }
}
