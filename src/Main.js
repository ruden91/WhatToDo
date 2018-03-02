import React, { Component } from 'react';

import Login from './Login';
import './Main.css';
export default class Main extends Component {
  render() {
    return (
      <div className="todo-app__login-container">
        <div className="todo-app__login-box">
          <input type="text" placeholder="Username" className="todo-app__login-input" />
          <input type="password" placeholder="Password" className="todo-app__login-input" />
          <button type="submit" className="todo-app__login-submit">
            Sign In
          </button>
          <Login />
        </div>
      </div>
    )
  }
}