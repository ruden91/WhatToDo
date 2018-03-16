import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';
import AddTodoItem from 'containers/AddTodoItem';
import { map, filter } from 'lodash';
export default class WeekContainer extends Component {
  render() {
    const { todoItems } = this.props;
    return (
      <div>
        <h2>다음 7</h2>

        <ul>
          {map(todoItems, (item, key) => <TodoItem { ...item } item={ item } key={key} index={key} />)}
        </ul>
        <AddTodoItem />        
      </div>
    )
  }
}