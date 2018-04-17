import * as React from 'react';

import { updateItem, removeItem } from 'database/firebase';
import './TodoItem.scss';
import { findDOMNode } from 'react-dom';
import * as ReactDnd from 'react-dnd';
import ItemTypes from 'itemTypes/todoTypes';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const itemSource = {
  beginDrag(props: any) {
    if (props.filter !== 'inbox') {
      props.onHandleDropContent();
    }

    return {
      uid: props.uniqueKey,
      index: props.index
    };
  },
  endDrag(props: any, monitor: any) {
    const item = monitor.getItem();
    console.log(item);
    if (props.filter !== 'inbox') {
      props.onHandleDropContent();
    }
  }
};

const itemTarget = {
  hover(props: any, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    console.log(hoverIndex);
    // // Time to actually perform the action
    // props.moveCard(dragIndex, hoverIndex);

    // // Note: we're mutating the monitor item here!
    // // Generally it's better to avoid mutations,
    // // but it's good here for the sake of performance
    // // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
  }
};
/**
 * Specifies which props to inject into your component.
 */
function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

interface Props {
  connectDragSource: ReactDnd.ConnectDragSource;
  connectDropTarget: ReactDnd.ConnectDropTarget;
  connectDragPreview: ReactDnd.ConnectDragPreview;
  isDragging: boolean;
  content: string;
  uniqueKey: string;
  index: number;
  todoListIndex: number;
  filter: string;
  onHandleAddTodoItem: (tabIndex: number, index: number) => void;
  onHandleDropContent: () => void;
}
interface States {
  toggleSideMenu: boolean;
}
class TodoItem extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  state: States = {
    toggleSideMenu: false
  }

  handleSideToggleMenu = () => {
    console.log('handleSideToggleMenu')
    this.setState({
      toggleSideMenu: !this.state.toggleSideMenu
    })
  }

  handleRemoveTodoItem = () => {
    const { uniqueKey } = this.props;
    removeItem(uniqueKey);
  }

  render() {
    const {
      isDragging,
      connectDropTarget,
      connectDragSource,
      connectDragPreview,
      index,
      todoListIndex
    } = this.props;
    const { toggleSideMenu } = this.state;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragPreview(
      <li className={`wtd-dashboard-todo-item ${toggleSideMenu ? 'on-menu-show' : ''}`} style={{ opacity }}>
        {connectDragSource(
          <div className="wtd-dashboard-todo-item__invisible-space">
            <i className="fas fa-sort" />
          </div>
        )}
        {connectDropTarget(
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td className="wtd-dashboard-todo-item__checker">
                  <button
                    className="wtd-dashboard-todo-item__check-box"
                    onClick={() => updateItem(this.props.uniqueKey)}
                  >
                    <i className="fas fa-check" />
                  </button>
                </td>
                <td
                  className="wtd-dashboard-todo-item__content"
                  onClick={() => this.props.onHandleAddTodoItem(todoListIndex, index)}
                >
                  <span>{this.props.content}</span>
                </td>
                <td className="wtd-dashboard-todo-item__project-task" />
                <td className="wtd-dashboard-todo-item__menu">
                  <button onClick={() => this.handleSideToggleMenu()}>
                    <i className="fas fa-ellipsis-h" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {toggleSideMenu && 
          <ul className="wtd-dashboard-todo-item__side-menu">
            <li>
              <button onClick={() => this.props.onHandleAddTodoItem(todoListIndex, index)}>
                작업 편집
              </button>
            </li>
            <li>작업 보관</li>
            <li>프로젝트로 이동</li>
            <li>사본 만들기</li>
            <li>
              <button onClick={this.handleRemoveTodoItem}>
                작업 삭제
              </button>
            </li>
          </ul>        
        }        
      </li>
    );
  }
}
export default ReactDnd.DragSource(ItemTypes.TODOITEM, itemSource, collect)(
  ReactDnd.DropTarget(ItemTypes.TODOITEM, itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(TodoItem)
);
