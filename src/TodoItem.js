import React, { Component } from 'react';

import './TodoItem.css';
class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleTodoItem = this.handleTodoItem.bind(this);
  }
  handleTodoItem() {
    console.log('double click');
  }  
  render() {
    const { index, item, removeTodoItem, updateTodoItem } = this.props;
    const completed = item.state ? 'completed' : "";

    return (
      <li className={`todo-item ${completed}`} >
        <button onClick={ () => updateTodoItem(index, item.state) } className="todo-item__update-button">
          <i className="fas fa-check"></i>
        </button>
        <p onDoubleClick={ this.handleTodoItem }>{ item.text }</p>
        <button onClick={() => removeTodoItem(index)} className="todo-item__remove-button">
          <i className="far fa-trash-alt"></i>
        </button>
      </li>
    )
  }
}

export default TodoItem;