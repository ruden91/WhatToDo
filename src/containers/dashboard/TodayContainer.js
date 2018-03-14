import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';
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
          {todoItems.map(item => (
            <TodoItem {...item} />
          ))}
        </ul>
      </div>
    )
  }
}