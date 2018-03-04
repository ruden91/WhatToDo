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
    const { index, item, reviseTodoItem, updateTodoItem, created, settings } = this.props;
    const completed = item.state ? 'completed' : "";
    const backgroundColor = item.state ? this.props.settings ? this.props.settings.backgroundColor : "" : ""
    const style = {
      borderColor: this.props.settings ? this.props.settings.backgroundColor : "",
      backgroundColor
    }    
    return (
      <li className={`todo-item ${completed}`} >
        <button 
          onClick={ () => updateTodoItem(index, item.state) } 
          className="todo-item__update-button"
          style={ style }
        >
          <i className="fas fa-check"></i>
        </button>
        <p onDoubleClick={ this.handleTodoItem }>{ item.text }</p>
        <button onClick={() => reviseTodoItem(item, index)} className="todo-item__revise-button">
          <i className="fas fa-angle-right"></i>
        </button>
        <span>{ created }</span>        
      </li>
    )
  }
}

export default TodoItem;