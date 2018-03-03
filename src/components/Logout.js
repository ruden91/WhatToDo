import React, { Component } from 'react';
import { auth } from 'database/firebase';
import {createBrowserHistory} from 'history';

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="todo-app__logout-button" onClick={ () => {
        let history = new createBrowserHistory();
        
        history.push('/');
        history.go('/');
        auth.signOut();
      } }>
        로그아웃
      </button>
    )
  }
}
