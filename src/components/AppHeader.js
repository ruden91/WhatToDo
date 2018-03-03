import React, { Component } from 'react';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <header className="todo-app-header">
        <button className="todo-app-header__show-add-button">
          <i className="fas fa-plus-circle"></i>
        </button>
      </header>
    )
  }
}
