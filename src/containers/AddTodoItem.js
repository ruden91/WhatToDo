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
      this.props.toggleAddTodoItem();
    }
  }

  render() {
    const { text } = this.state;
    const { toggleAddTodoItemButton } = this.props;
    return (
      <div>
        <Transition
          in={ toggleAddTodoItemButton } 
          timeout={500}
        > 
        {
          (state) => (
            <div
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
            </div>
          )
        }
        </Transition>
      </div>
    )
  }
}

export default AddTodoItem;