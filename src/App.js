import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';

import TodoBoard from './TodoBoard';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: null
    }
    firebase.database().ref('todoItems').on('value', (snapshot) => {
      this.setState({
        todoItems: snapshot.val()
      })
    });    
  }

  render() {
    const { todoItems } = this.state;
    return (
      <div className="todo-app">
        <TodoBoard todoItems={ todoItems } />
      </div>
    )
  }
}

export default App;