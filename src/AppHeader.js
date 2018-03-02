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
        { currentUser && <UserInfo currentUser={ currentUser } /> }
      </header>
    )
  }
}
