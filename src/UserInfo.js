import React, { Component } from 'react';
import { auth } from './firebase';

import Logout from './Logout';
import './UserInfo.css';
export default class UserInfo extends Component {
  render() {
    const { displayName, email, photoURL } = this.props.currentUser;
    return (
      <div className="user-info">
        <div className="user-info__right-side-content">
          <p>{ displayName }</p>
          <img src={photoURL} alt={displayName} />
          <button onClick={ () => auth.signOut() }>
            Logout
          </button>
        </div>
      </div>
    )
  }
}
