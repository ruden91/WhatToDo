import React, { Component } from 'react';

import Login from './Login';
import UserInfo from './UserInfo';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <header className="app-header">
        <button className="todo-app__toggle-side-menu"><i className="fas fa-bars"></i></button>
        { currentUser && <UserInfo currentUser={ currentUser } /> }
        <button className="todo-app__show-add-button"><i className="fas fa-plus-circle"></i></button>
      </header>
    )
  }
}
