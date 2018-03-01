import React, { Component } from 'react';

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
    return (
      <li>
        <button onClick={ () => updateTodoItem(index) }>업데이트</button>
        <p onDoubleClick={ this.handleTodoItem }>{ item.text }</p>
        <button onClick={() => removeTodoItem(index)}>삭제</button>
      </li>
    )
  }
}

export default TodoItem;