import React, { Component } from 'react';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundColor: this.props.settings ? this.props.settings.backgroundColor : ""
    }

    const writeButtonStyle = {
      '&::before': this.props.settings ? this.props.settings.backgroundColor : "",
      '&::after': this.props.settings ? this.props.settings.backgroundColor : ""
    }
    const { toggleAddTodoItem, toggleAddTodoItemButton } = this.props;

    return (
      <header className="todo-app-header" style={style}>
        <span className="todo-app-header__header-logo">
          <i className="fas fa-list-ol"></i>
        </span>
        <button 
          className="todo-app-header__add-button-toggle js-todo-app-header__add-button-toggle"
          onClick={ () => toggleAddTodoItem() }
        >
          <span className={toggleAddTodoItemButton ? 'open' : 'close'}>
            <span style={ style }></span>
            <span style={ style }></span>
          </span>
        </button>
      </header>
    )
  }
}
