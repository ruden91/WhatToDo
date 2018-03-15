import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';
import AddTodoItem from 'containers/AddTodoItem';
export default class InboxContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { todoItems } = this.props;

    return (
      <div>
        <h2>관리함</h2>

        <ul>
          {todoItems.map(item => (
            <TodoItem {...item} />
          ))}
          <li><AddTodoItem /></li>
        </ul>        
      </div>
    )
  }
}