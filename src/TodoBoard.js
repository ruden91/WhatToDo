import React, { Component } from 'react';
import firebase from 'firebase';
import './TodoBoard.css';

import AddTodoItem from './AddTodoItem';
import TodoItems from './TodoItems';

class TodoBoard extends Component {
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
    return (
      <section className="todo-board">
        <header>
          <p>{ this.state.todoItems }</p>
          <AddTodoItem />
          <TodoItems />
        </header>
      </section>
    )
  }
}

export default TodoBoard;