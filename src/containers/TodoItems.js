import React, { Component } from 'react';
import { database } from 'database/firebase';
import { map } from 'lodash';

import TodoItem from 'containers/TodoItem';
import moment from 'moment';
import 'moment/locale/ko';
class TodoItems extends Component {
  constructor(props) {
    super(props);

    moment.locale('ko');
    
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

  getCreatedDate(value) {
    return moment(value).fromNow();
  }

  render() {
    const { todoItems, settings } = this.props;
    return (
      <ul className="todo-items">
      {!todoItems && <p>할일 목록을 추가해주세요!</p>}
      {
        map(todoItems, (value, key) => (
          <TodoItem 
            key={ key }
            index={ key }
            item={ value }
            created={ this.getCreatedDate(value.created) }
            removeTodoItem={ this.removeTodoItem } 
            updateTodoItem={ this.updateTodoItem }
            settings= { settings }
          />
        )).reverse()
      }
      </ul>
    )
  }
}

export default TodoItems;