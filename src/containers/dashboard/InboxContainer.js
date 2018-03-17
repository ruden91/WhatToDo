import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';
import AddTodoItem from 'containers/AddTodoItem';
import { map, filter } from 'lodash';
export default class InboxContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { todoItems, settings } = this.props;

    return (
      <div>
        <h2>관리함</h2>

        <ul>
          {map(todoItems, (item, key) => <TodoItem { ...item } key={key} index={key} />)}
        </ul>
        <AddTodoItem settings={ settings } />        
      </div>
    )
  }
}