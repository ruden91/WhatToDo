import React, { Component } from 'react';
import { auth } from './firebase';

export default class Logout extends Component {
  render() {
    return (
      <button onClick={ () => auth.signOut() }>
        Logout
      </button>
    )
  }
}
