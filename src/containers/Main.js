import React, { Component } from 'react';

import Login from 'components/Login';
export default class Main extends Component {
  render() {
    return (
      <div className="todo-app__login-container">
        <div className="todo-app__login-box">
          <div className="todo-app__logo-container">
            <i className="fab fa-codepen fa-8x"></i>
          </div>
          <label htmlFor="username">
            <span><i className="far fa-user"></i></span>
            <input 
              type="email" 
              id="username" 
              placeholder="Username" 
              className="todo-app__login-input" 
              autoComplete="off"
            />
          </label>        
          <label htmlFor="password">
            <span><i className="fas fa-lock"></i></span>
            <input 
              type="password" 
              id="password" 
              placeholder="Password" 
              className="todo-app__login-input" 
              autoComplete="off"
            />
          </label>        
          <button type="submit" className="todo-app__login-submit">
            Sign In
          </button>
          <Login />
        </div>
      </div>
    )
  }
}