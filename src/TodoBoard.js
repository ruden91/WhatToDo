import React, { Component } from 'react';

import './TodoBoard.css';

import AddTodoItem from './AddTodoItem';
import TodoItems from './TodoItems';
import MainLoading from './MainLoading';

class TodoBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoItems, currentUser } = this.props;
    
    return (
      <section className="todo-board">
        <header>
          <AddTodoItem currentUser={ currentUser } />
        </header>
        <TodoItems todoItems={ todoItems } currentUser={ currentUser } />
      </section>
    )
  }
}

export default TodoBoard;