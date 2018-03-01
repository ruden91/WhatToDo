import React, { Component } from 'react';

import './TodoBoard.css';

import AddTodoItem from './AddTodoItem';
import TodoItems from './TodoItems';
import LoadingSpinner from './LoadingSpinner';

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
        </header>
        {
          !todoItems 
          ?
          <LoadingSpinner />
          :
          <TodoItems todoItems={ todoItems } />
        }          
        <footer>

        </footer>
      </section>
    )
  }
}

export default TodoBoard;