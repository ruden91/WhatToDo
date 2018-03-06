import React, { Component } from 'react';
import { auth } from 'database/firebase';

export default class Signup extends Component {
  constructor(props) {
    super();

    this.handleSignupForm = this.handleSignupForm.bind(this);
  }

  handleSignupForm(e) {
    e.preventDefault();
    let regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    const { handleStateClearButton } = this.props;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password-one').value;
    let repeatPassword = document.getElementById('password-two').value;

    if (password !== repeatPassword)  {
      alert('비밀번호가 다릅니다.');
      return;
    }

    if (!regx.test(password)) {
      alert('암호는 하나 이상의 특수문자 그리고 숫자를 포함해야 합니다.');
      return;
    }
    let promise = auth.createUserWithEmailAndPassword (email, password); 

    promise.then(function(user) {
     user.sendEmailVerification().then((success) => {
        alert('가입이 완료됐습니다. 이메일 인증을 마치시면, 서비스를 이용하실 수 있습니다.');
        handleStateClearButton();      
     }, function(error) {
      });
   }).catch((error) => {
    let { code } = error;
    if (code === 'auth/email-already-in-use') {
      alert('이미 동일한 이메일 아이디가 존재합니다.')
    }
   });
  }

  render() {
    return (
      <div className="todo-app__signup-form">
        <form onSubmit={ this.handleSignupForm }>
          <div className="todo-app__signup-input-group">      
            <input type="email" id="email" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="email">Email</label>
          </div>        

          <div className="todo-app__signup-input-group">      
            <input type="password" id="password-one" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="password-one">Password</label>
          </div>

          <div className="todo-app__signup-input-group">      
            <input type="password" id="password-two" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="password-two">Password again</label>
          </div>                  

          <button type="submit">가입완료</button>                
        </form>
      </div>
    )
  }
}