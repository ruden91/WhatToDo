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
    const today = moment().add(0, 'days').format('YYYY-MM-DD');
    const lastTodoItems = filter(todoItems, item => item.created_at < today);
    const todayTodoItems = filter(todoItems, item => item.created_at === today);
    
    return (
      <div>
        <h2>오늘</h2>
        
        <p>기한이 지난</p>
        <ul>
          {map(lastTodoItems, item => <TodoItem { ...item } />)}
        </ul>

        <p>오늘 <span>{ today }</span></p>
        <ul>
          {map(todayTodoItems, item => <TodoItem { ...item } />)}
        </ul>
        <AddTodoItem />
      </div>
    )
  }
}