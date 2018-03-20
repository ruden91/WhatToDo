import React, { Component } from 'react';

import TodoList from 'containers/dashboard/TodoList';
import { map, filter } from 'lodash';
export default class WeekContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      willModifyTodoListIndex: -1
    }
  }
  handleTodoListAddClick = (willModifyTodoListIndex) => {
    this.setState({
      willModifyTodoListIndex
    })
  }

  mapToComponent() {
    const { items } = this.props;
    return map(items, (value ,key) => (
      <TodoList 
        items={ value } 
        isModify={this.state.willModifyTodoListIndex === key}
        onAddClick={this.handleTodoListAddClick}        
        key={key}
        index={key}        
      />
    ))
  }

  render() {
    const { toggleAddItem } = this.state;
    const { items, settings } = this.props;
  
    return (
      <div className="wtd-dashboard__todo-items-container">
        <h2 className="wtd-dashboard__todo-items-header">다음 7일</h2>
        {this.mapToComponent()}
      </div>
    )
  }
}