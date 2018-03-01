import React, { Component } from 'react';

import { auth, GithubAuthProvider } from './firebase';
export default class Login extends Component {
  render() {
    return (
      <button onClick={ () => auth.signInWithPopup(GithubAuthProvider) }>
        Login
      </button>
    )
  }
}
