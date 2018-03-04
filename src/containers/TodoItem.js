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
    const { index, item, removeTodoItem, updateTodoItem, created, settings } = this.props;
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
        <button onClick={() => removeTodoItem(index)} className="todo-item__remove-button">
          <i className="far fa-trash-alt"></i>
        </button>
        <span>{ created }</span>        
      </li>
    )
  }
}

export default TodoItem;