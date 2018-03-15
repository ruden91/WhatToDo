import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import * as actions from '../../actions';
const Types = {
  TODOITEM: 'todoitem',
};

const todoItemSource = {
  beginDrag(props, monitor, component) {
    const item = { id: props.id, index: props.index };

    return item;
  },
};

const todoItemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    } 

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    
    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class TodoItem extends Component {
  updateTodoItem = (id) => {
    let value = {
      id,
      active: true
    }
    
    actions.updateTodoItems(value);
  }

  deleteTodoItem = (id) => {
    actions.deleteTodoItems(id);
  }

  // conditional Component 추가하기
  render() {
    const { id, title, created_at, activeTodoItem, active } = this.props;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    
    const dragging = isDragging ? 'is-dragging' : '';

    return connectDragSource(connectDropTarget(
      <li><table className={`test-todo ${dragging}`}>
        <tbody>
          <tr>
            <td><div onClick={ () => this.updateTodoItem(id) }></div></td>
            <td><p>{title}</p></td>
            <td><span>{ created_at }</span></td>
            <td><button onClick={ () => this.deleteTodoItem(id) }>delete</button></td>
          </tr>
        </tbody>
      </table>
      </li>
    ));
  }
}

export default DragSource(Types.TODOITEM, todoItemSource, sourceCollect)(DropTarget(Types.TODOITEM, todoItemTarget, targetCollect)(TodoItem));
