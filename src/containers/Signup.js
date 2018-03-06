import React, { Component } from 'react';
import { auth } from 'database/firebase';

export default class Signup extends Component {
  constructor(props) {
    super();

    this.handleSignupForm = this.handleSignupForm.bind(this);
  }

  handleSignupForm(e) {
    e.preventDefault();
    const { handleStateClearButton } = this.props;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password-one').value;
    let repeatPassword = document.getElementById('password-two').value;

    if (password !== repeatPassword)  {
      alert('비밀번호가 다릅니다.');
      return;
    }

    let promise = auth.createUserWithEmailAndPassword (email, password); 

    promise.then(function(user) {
     user.sendEmailVerification().then((success) => {
        handleStateClearButton();      
     }, function(error) {
       console.log(error)
      });
   });
  }

  render() {
    return (
      <div className="todo-app__signup-form">
        <form onSubmit={ this.handleSignupForm }>
          <label htmlFor="email">이메일</label>
          <input type="email" placeholder="email" id="email" />

          <label htmlFor="password-one">비밀번호</label>
          <input type="password" placeholder="password" id="password-one" />

          <label htmlFor="password-two">비밀번호 재입력</label>
          <input type="password" placeholder="password" id="password-two" />

          <button type="submit">가입완료</button>                
        </form>
      </div>
    )
  }
}