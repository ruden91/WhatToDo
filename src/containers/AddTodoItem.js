import React, { Component } from 'react';
import { database, auth } from 'database/firebase';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  height: 0,
  opacity: 0
}

const transitionStyles = {
  entering: { height: 0, opacity: 0 },
  entered:  { height: '40px' , opacity: 1},
};

class AddTodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.dispatchTodoItemData = this.dispatchTodoItemData.bind(this);
    this.handleWriteButton = this.handleWriteButton.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      // input값이 빈 값일 때 예외처리
      if (this.state.text === "") {
        return;
      }
      this.dispatchTodoItemData();
    } 
  }

  handleWriteButton() {
    this.dispatchTodoItemData();
  }

  dispatchTodoItemData() {
    let timestamp = new Date().getTime();

    database.ref('todoItems/' + this.props.currentUser.uid).push().set({
      text: this.state.text,
      state: false,
      created: timestamp
    })

    this.setState({
      text: ''
    })
    this.props.toggleAddTodoItem();
  }

  render() {
    const { text } = this.state;
    const { toggleAddTodoItemButton } = this.props;
    return (
      <div>
        <Transition
          in={ toggleAddTodoItemButton } 
          timeout={100}
        > 
        {
          (state) => (
            <div
              className="todo-app__add-todo-item-container"
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}  
            >
            <input        
              className="add-todo-item" 
              type="text" 
              value={ text } 
              placeholder="할일을 적어보즈아!" 
              onChange={ this.handleInputChange }
              onKeyPress={ this.handleInputKeyPress }
            />
            <button
              onClick={this.handleWriteButton}
              className={`todo-app__write-button ${toggleAddTodoItemButton ? 'show' : ''}`}
            >
              <i className="far fa-edit"></i>
            </button>
            </div>
          )
        }
        </Transition>
      </div>
    )
  }
}

export default AddTodoItem;