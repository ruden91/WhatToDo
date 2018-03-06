import React, { Component } from 'react';

import Signup from 'containers/Signup';
import Login from 'components/Login';
export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      active: false,
      activeSignup: false,
      activeLogin: false
    }    

    this.handleSignupButton = this.handleSignupButton.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.handleStateClearButton = this.handleStateClearButton.bind(this);
  }

  handleSignupButton() {
    this.setState({
      activeSignup: true,
      active: true
    })
  }

  handleLoginButton() {
    this.setState({
      activeLogin: true,
      active: true
    })
  }

  handleStateClearButton() {
    this.setState({
      active: false,
      activeSignup: false,
      activeLogin: false       
    })   
  }

  render() {
    const { active, activeSignup, activeLogin } = this.state;
    return (
      <div className="todo-app__login-container">
        <div className="todo-app__login-inner-container">
          {active && <button className="todo-app__login-back-button" onClick={ this.handleStateClearButton }>뒤로가기</button>}
          {!active &&
          <div>
            <span>
              <span className="todo-app__logo-icon"><i className="fas fa-list-ol fa-8x"></i></span>
              <span className="todo-app__logo-title">TodoApp</span>
              <span className="todo-app__logo-description">보다 손쉽게 일정관리를 해보세요!</span>
            </span>
            <button onClick={ this.handleSignupButton } className="todo-app__signup-button">회원가입</button>
            <button onClick={ this.handleLoginButton } className="todo-app__login-button">로그인</button>
          </div>
          }
          {activeSignup && <Signup />}
          {activeLogin && <Login />}
        </div>
      </div>
    )
  }
}