import React, { Component } from 'react';

// import Login from './Login';
import UserInfo from 'components/UserInfo';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <header className="todo-app-header">
        <button className="todo-app-header__toggle-side-menu">
          <i className="fas fa-bars"></i>
        </button>
        { currentUser && <UserInfo currentUser={ currentUser } /> }
        <button className="todo-app-header__show-add-button">
          <i className="fas fa-plus-circle"></i>
        </button>
      </header>
    )
  }
}
