import React, { Component } from 'react';
import firebase from 'firebase';

import './AddTodoItem.css';
class AddTodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
    this.todoItemsRef = firebase.database().ref('todoItems');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.todoItemsRef.push().set({
        text: this.state.text,
        state: false
      });

      this.setState({
        text: ''
      })
    }
  }

  render() {
    const { text } = this.state;

    return (
      <div>
        <input
          className="add-todo-item" 
          type="text" 
          value={ text } 
          placeholder="할일을 적어보즈아!" 
          onChange={ this.handleInputChange }
          onKeyPress={ this.handleInputKeyPress }
        />
      </div>
    )
  }
}

export default AddTodoItem;