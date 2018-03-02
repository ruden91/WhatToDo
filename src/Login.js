import React, { Component } from 'react';

import { auth, GithubAuthProvider, GoogleAuthProvider } from './firebase';
export default class Login extends Component {
  render() {
    return (
      <button onClick={ () => auth.signInWithPopup(GoogleAuthProvider) }>
        Login
      </button>
    )
  }
}
