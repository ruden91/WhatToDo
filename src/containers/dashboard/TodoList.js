import React, { Component } from 'react';

import { map } from 'lodash';

import AddTodoItem from 'containers/AddTodoItem';
import TodoItem from 'containers/dashboard/TodoItem';
class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writeIndex: -1
    }
  }

  mapToComponent() {
    const { items, isModify } = this.props;
    const { writeIndex } = this.state;
    console.log(writeIndex)
    return map(items.items, (item, key) => {
      console.log(item)
      console.log(key)
      if(isModify && writeIndex === key){
        return <AddTodoItem />
      }
      
      return (
      <TodoItem 
        { ...item } 
        item={ item } 
        key={key} 
        index={key} 
        onModifyClick={this.handleModifyClick.bind(this, key)}
      />)
    })
  }
  
  handleModifyClick(writeIndex){
    this.setState({
      writeIndex
    });

    this.props.onAddClick(this.props.index);
  }

  handleAddClick(willModifyTodoListIndex){
    this.setState({
      writeIndex: -1
    });

    this.props.onAddClick(willModifyTodoListIndex);
  }
  
  render() {
    const { items } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <h2 className="wtd-dashboard__todo-items-subsection-header">
          {items.title} <span>{items.date}</span>
        </h2>
        <ul>
          { this.mapToComponent() }
          {
          (this.props.isModify && this.state.writeIndex === -1) 
            ? <AddTodoItem/> 
            : <button onClick={this.handleAddClick.bind(this, this.props.index)}>추가</button>
          }          
        </ul>
      </div>      
    );
  }
}

export default TodoList;