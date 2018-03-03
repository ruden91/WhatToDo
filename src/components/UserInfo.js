import React, { Component } from 'react';
import { auth } from 'database/firebase';

import Logout from 'components/Logout';
export default class UserInfo extends Component {
  render() {
    const { displayName, email, photoURL } = this.props.currentUser;
    return (
      <div className="todo-app__user-info user-info">
        <div className="user-info__right-side-content">
          <span className="user-info__image-wrapper">
            <img src={photoURL} alt={displayName} />
          </span>
          <p className="user-info__name">반갑습니다. { displayName }님</p>
          <Logout />
        </div>
      </div>
    )
  }
}
