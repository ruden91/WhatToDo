import React, { Component } from 'react';

import AddTodoItem from 'containers/AddTodoItem';
import TodoItems from 'containers/TodoItems';

class TodoBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoItems, currentUser, toggleAddTodoItemButton, toggleAddTodoItem } = this.props;
    
    return (
      <section className="todo-app-board">
        <header>
          <AddTodoItem currentUser={ currentUser } toggleAddTodoItemButton={ toggleAddTodoItemButton } toggleAddTodoItem={ toggleAddTodoItem } />
        </header>
        <TodoItems todoItems={ todoItems } currentUser={ currentUser } />
      </section>
    )
  }
}

export default TodoBoard;