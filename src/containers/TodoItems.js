import React, { Component } from 'react';
import { database } from 'database/firebase';
import { map } from 'lodash';

import TodoItem from 'containers/TodoItem';
import moment from 'moment';
import 'moment/locale/ko';
import Modal from 'react-modal';
class TodoItems extends Component {
  constructor(props) {
    super(props);

    moment.locale('ko');
    this.state = {
      modalIsOpen: false,
      selectedTodoItem: null,
      selectedKey: null
    }

    this.reviseTodoItem = this.reviseTodoItem.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleReviseTodoItemChange = this.handleReviseTodoItemChange.bind(this);
    this.handleReviseTodoItemSubmit = this.handleReviseTodoItemSubmit.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  // remove todoItem
  reviseTodoItem(item, key) {
    const { currentUser } = this.props;
    this.setState({
      modalIsOpen: true,
      selectedTodoItem: item,
      selectedKey: key
    })
  }

  deleteTodoItem() {
    const { currentUser } = this.props;

    database.ref('todoItems/' + currentUser.uid).child(this.state.selectedKey).remove();

    this.closeModal();
  }

  // update todoItem
  updateTodoItem(key, state) {
    const { currentUser } = this.props;

    database.ref('todoItems/' + currentUser.uid).child(key).update({
      state: !state
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getCreatedDate(value) {
    return moment(value).fromNow();
  }
  handleReviseTodoItemSubmit(e) {
    e.preventDefault();
    const { uid } = this.props.currentUser;
    const { selectedKey, selectedTodoItem } = this.state; 

    database.ref('todoItems/' + uid).child(selectedKey).update(selectedTodoItem);
    this.closeModal();
  }
  handleReviseTodoItemChange(e) {
    this.setState({
      selectedTodoItem: {
        ...this.state.selectedTodoItem,
        text: e.target.value
      }
    })
  }
  render() {
    const { todoItems, settings } = this.props;

    const customStyles = {
      overlay: {zIndex: 1001, backgroundColor: 'rgba(0, 0, 0, 0.3)'},
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0
      }
    };    
    return (
      <div>
        <ul className="todo-items">
        {!todoItems && <p>할일 목록을 추가해주세요!</p>}
        {
          map(todoItems, (value, key) => (
            <TodoItem 
              key={ key }
              index={ key }
              item={ value }
              created={ this.getCreatedDate(value.created) }
              reviseTodoItem={ this.reviseTodoItem } 
              updateTodoItem={ this.updateTodoItem }
              settings= { settings }
            />
          )).reverse()
        }
        </ul>
        {
          this.state.selectedTodoItem &&
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="ReviseTodoItems"
          ariaHideApp={false}
          style={customStyles}
        >
          <div className="todo-app__revise-modal-container">
            <header>
              <span>Edit Item</span>
              <button 
                className="todo-app__revise-modal-close-button"
                onClick={this.closeModal}
              ></button>
            </header>
            <div>
              <form onSubmit={ this.handleReviseTodoItemSubmit }>
                <label htmlFor="todo-app__revise-title">내용</label>
                <textarea
                  id="todo-app__revise-title" 
                  value={ this.state.selectedTodoItem.text }
                  onChange={ this.handleReviseTodoItemChange }
                >
                </textarea>
                <button type="submit" className="todo-app__revise-todo-item">수정</button>
              </form>
              <button 
                className="todo-app__remove-todo-item"
                onClick={this.deleteTodoItem}
              >삭제</button>
            </div>
          </div>
        </Modal>
        }
      </div>
    )
  }
}

export default TodoItems;