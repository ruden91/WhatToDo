import React, { Component } from 'react';
import { auth } from 'database/firebase';

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="todo-app__logout-button" onClick={ () => {
        auth.signOut().then(() => {
          // 로그아웃
        }).catch(() => {

        })
      } }>
        로그아웃
      </button>
    )
  }
}
