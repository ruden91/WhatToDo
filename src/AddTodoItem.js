import React, { Component } from 'react';
import { database, auth } from './firebase';

import './AddTodoItem.css';
class AddTodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
    
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
      if (this.state.text === "") {
        return;
      }
      database.ref('todoItems/' + this.props.currentUser.uid).push().set({
        text: this.state.text,
        state: false
      })
      // this.todoItemsRef.push().set({
      //   text: this.state.text,
      //   state: false
      // });

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