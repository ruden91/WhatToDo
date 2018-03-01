import React, { Component } from 'react';

import './TodoBoard.css';

import AddTodoItem from './AddTodoItem';
import TodoItems from './TodoItems';

class TodoBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoItems } = this.props;

    return (
      <section className="todo-board">
        <header>
          
          <AddTodoItem />
          <TodoItems todoItems={ todoItems } />
        </header>
      </section>
    )
  }
}

export default TodoBoard;