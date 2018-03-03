import React, { Component } from 'react';
import { database } from 'database/firebase';
import { map } from 'lodash';

import TodoItem from 'containers/TodoItem';
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
      {!todoItems && <p>할일 목록을 추가해주세요!</p>}
      {
        map(todoItems, (value, key) => (
          <TodoItem 
            key={ key }
            index={ key }
            item={ value }
            removeTodoItem={ this.removeTodoItem } 
            updateTodoItem={ this.updateTodoItem }
          />
        )).reverse()
      }
      </ul>
    )
  }
}

export default TodoItems;