import React, { Component } from 'react';
import { auth } from 'database/firebase';

import Logout from 'components/Logout';
export default class UserInfo extends Component {
  render() {
    const { displayName, email, photoURL } = this.props.currentUser;
    return (
      <div className="user-info">
        <div className="user-info__right-side-content">
          <Logout />
        </div>
      </div>
    )
  }
}
