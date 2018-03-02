import React, { Component } from 'react';

import { auth, GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from './firebase';

import "./Login.css";
export default class Login extends Component {
  render() {
    return (
      <div>
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
