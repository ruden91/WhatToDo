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