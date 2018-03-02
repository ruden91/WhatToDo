import React, { Component } from 'react';
import { database } from './firebase';
import { map } from 'lodash';

import TodoItem from './TodoItem';
class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.removeTodoItem = this.removeTodoItem.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
  }
  // remove todoItem
  removeTodoItem(key) {
    const { currentUser } = this.props;
    
    database.ref('todoItems/' + currentUser.uid).child(key).remove();
  }

  // update todoItem
  updateTodoItem(key, state) {
    const { currentUser } = this.props;

    database.ref('todoItems/' + currentUser.uid).child(key).update({
      state: !state
    });
  }

  render() {
    const { todoItems } = this.props;
    return (
      <ul className="todo-items">
      {
        map(todoItems, (value, key) => (
          <TodoItem 
            key={ key }
            index={ key }
            item={ value }
            removeTodoItem={ this.removeTodoItem } 
            updateTodoItem={ this.updateTodoItem }
          />
        ))
      }
      </ul>
    )
  }
}

export default TodoItems;