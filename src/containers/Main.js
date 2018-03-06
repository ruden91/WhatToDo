import React, { Component } from 'react';
import { auth } from 'database/firebase';

import Login from 'components/Login';
export default class Main extends Component {
  constructor() {
    super();

    this.handleLoginForm = this.handleLoginForm.bind(this);
  }

  handleLoginForm(e) {
    e.preventDefault();
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // 로그인
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // handle errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
    })

    // 가입
    // auth.createUserWithEmailAndPassword(email, password).catch((error) => {
    //   console.log(error)
    // })
  }

  render() {
    return (
      <div className="todo-app__main-container">
        <div className="todo-app__main-content">
          <div className="todo-app__logo-container">
            <i className="fab fa-codepen fa-8x"></i>
          </div>
        </div>
      </div>
    )
  }
}