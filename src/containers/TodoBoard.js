import React, { Component } from 'react';

import AddTodoItem from 'containers/AddTodoItem';
import TodoItems from 'containers/TodoItems';

class TodoBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoItems, currentUser, toggleAddTodoItemButton, toggleAddTodoItem, settings } = this.props;
    
    return (
      <section className="todo-app-board">
        <header>
          <AddTodoItem 
            currentUser={ currentUser } 
            toggleAddTodoItemButton={ toggleAddTodoItemButton } 
            toggleAddTodoItem={ toggleAddTodoItem }
            settings={ settings } 
          />
        </header>
        <TodoItems 
          todoItems={ todoItems } 
          currentUser={ currentUser }
          settings={ settings } 
        />
      </section>
    )
  }
}

export default TodoBoard;