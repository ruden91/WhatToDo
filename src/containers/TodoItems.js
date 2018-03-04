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
    this.splitDate = null;
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

  splitByDay(item) {
    let check = moment(item.created).format("YYYY년 MM월 DD일");
    
    if (this.splitDate !== check) {
      this.splitDate = check;
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { todoItems, settings } = this.props;
    const customStyles = {
      overlay: {zIndex: 1001, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'all .5s ease-in-out'},
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        transition: 'all .5s ease-in-out'
      }
    };    
    return (
      <div>
        <ul className="todo-items">
        {!todoItems && <p className="todo-items__empty-title">할일을 추가해 주세요.</p>}
        {
          map(todoItems, (value, key) => {
            return (
              <TodoItem 
                key={ key }
                index={ key }
                item={ value }
                created={ this.getCreatedDate(value.created) }
                reviseTodoItem={ this.reviseTodoItem } 
                updateTodoItem={ this.updateTodoItem }
                settings= { settings }
                label={this.splitByDay(value)}
                date={moment(value.created).format("YYYY년 MM월 DD일")}
              />
            )
          })
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
  componentWillUpdate() {
    this.splitDate = null;
  }
}

export default TodoItems;