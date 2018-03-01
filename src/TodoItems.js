import React, { Component } from 'react';
import { map } from 'lodash';

import TodoItem from './TodoItem';
class TodoItems extends Component {

  render() {
    const { todoItems } = this.props;
    return (
      <ul>
      {
        map(todoItems, (value, key) => (
          <TodoItem key={key} item={ value } />
        ))
      }
      </ul>
    )
  }
}

export default TodoItems;