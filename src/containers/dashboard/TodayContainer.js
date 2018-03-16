import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';
import AddTodoItem from 'containers/AddTodoItem';
import { map, filter } from 'lodash';

import moment from 'moment';
export default class TodayContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todoItems } = this.props;
    return (
      <div>
        <h2>오늘</h2>
        <ul>
          {map(todoItems, (item, key) => <TodoItem { ...item } item={ item } key={key} index={key} />)}
        </ul>
        <AddTodoItem />
      </div>
    )
  }
}