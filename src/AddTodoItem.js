import React, { Component } from 'react';
import firebase from 'firebase';

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
    }
  }

  render() {
    const { text } = this.state;

    return (
      <div>
        <input 
          type="text" 
          value={ text } 
          placeholder="what needs to be done?" 
          onChange={ this.handleInputChange }
          onKeyPress={ this.handleInputKeyPress }
        />
      </div>
    )
  }
}

export default AddTodoItem;