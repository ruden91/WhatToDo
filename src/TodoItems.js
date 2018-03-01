import React, { Component } from 'react';
import firebase from 'firebase';
import { map } from 'lodash';

import TodoItem from './TodoItem';
class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.todoItemsRef = firebase.database().ref('todoItems');
  }
  // remove todoItem
  removeTodoItem(key) {
    this.todoItemsRef.child(key).remove();
  }

  // update todoItem
  updateTodoItem(key) {

  }

  render() {
    const { todoItems } = this.props;
    return (
      <ul>
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