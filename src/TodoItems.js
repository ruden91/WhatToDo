import React, { Component } from 'react';
import firebase from 'firebase';
import { map } from 'lodash';

import TodoItem from './TodoItem';
class TodoItems extends Component {
  constructor(props) {
    super(props);

  }
  // remove todoItem
  removeTodoItem(key) {
    firebase.database().ref('todoItems').child(key).remove();
  }

  // update todoItem
  updateTodoItem(key, state) {
    firebase.database().ref('todoItems').child(key).update({
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