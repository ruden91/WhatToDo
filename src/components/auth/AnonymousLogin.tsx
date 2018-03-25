import * as React from 'react';
import { signInAnonymously } from 'database/firebase';

export default class AnonymousLogin extends React.Component {
  handleAnonymousLoginButton() {
    signInAnonymously();
  }

  render() {
    return (
      <button
        onClick={this.handleAnonymousLoginButton}
        className="wtd-anonymous-login-button"
      >
        익명 로그인
      </button>
    );
  }
}
