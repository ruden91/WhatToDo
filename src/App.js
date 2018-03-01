import React, { Component } from 'react';
import './App.css';

import TodoBoard from './TodoBoard';
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todo-app">
        <TodoBoard />
      </div>
    )
  }
}

export default App;