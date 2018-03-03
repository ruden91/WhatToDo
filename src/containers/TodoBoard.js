import React, { Component } from 'react';

import AddTodoItem from 'containers/AddTodoItem';
import TodoItems from 'containers/TodoItems';

class TodoBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    }
  }

  render() {
    const { todoItems, currentUser } = this.props;
    
    return (
      <section className="todo-app-board">
        <header>
          <AddTodoItem currentUser={ currentUser } />
        </header>
        <TodoItems todoItems={ todoItems } currentUser={ currentUser } />
      </section>
    )
  }
}

export default TodoBoard;