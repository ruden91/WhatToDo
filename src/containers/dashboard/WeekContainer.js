import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';
export default class WeekContainer extends Component {
  render() {
    const { todoItems } = this.props;
    return (
      <div>
        <h2>다음 7</h2>

        <ul>
          {todoItems.map(item => (
            <TodoItem {...item} />
          ))}
          <li>작업 추가</li>
        </ul>        
      </div>
    )
  }
}