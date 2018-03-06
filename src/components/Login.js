import React, { Component } from 'react';

import { auth, GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from 'database/firebase';

export default class Login extends Component {
  constructor() {
    super();

    this.handleSignInForm = this.handleSignInForm.bind(this);
  }

  handleSignInForm(e) {
    e.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSignInForm }>
          <div className="todo-app__signin-input-group">      
            <input type="email" id="loginEmail" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="login-email">Email</label>
          </div> 

          <div className="todo-app__signin-input-group">      
            <input type="password" id="loginPassword" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="login-password">Password</label>
          </div>

          <button type="submit">로그인</button>                
        </form>      
      <button 
        onClick={ () => auth.signInWithPopup(GoogleAuthProvider) }
        className="todo-app__sign-in-button todo-app__sign-in-google"
      > 
        <span>
          <i className="fab fa-google"></i>
        </span>
          Sign In with Google
      </button>
      <button 
        onClick={ () => auth.signInWithPopup(FacebookAuthProvider) }
        className="todo-app__sign-in-button todo-app__sign-in-facebook"
      >
        <span><i className="fab fa-facebook-f"></i></span>
          Sign In with FaceBook
      </button>
      <button 
        onClick={ () => auth.signInWithPopup(GithubAuthProvider) }
        className="todo-app__sign-in-button todo-app__sign-in-github"
      >
        <span><i className="fab fa-github"></i></span>
          Sign In with Github
      </button>            
      </div>
    )
  }
}
