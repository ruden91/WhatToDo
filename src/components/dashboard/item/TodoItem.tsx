import * as React from 'react';

import { updateItem } from 'database/firebase';
import './TodoItem.scss';

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
      ...props
    };
  },
  endDrag(props: any, monitor: any) {
    // const item = monitor.getItem();
    if (props.filter !== 'inbox') {
      props.onHandleDropContent();
    }
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
interface States {}
class TodoItem extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { isDragging, connectDragSource, connectDragPreview, index, todoListIndex } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragPreview(
      <li className="wtd-dashboard-todo-item" style={{ opacity }}>
        {connectDragSource(
          <div className="wtd-dashboard-todo-item__invisible-space">
            <i className="fas fa-sort" />
          </div>
        )}
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
                <button onClick={() => alert('update 추가중')}>
                  <i className="fas fa-ellipsis-h" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  }
}

export default ReactDnd.DragSource(ItemTypes.TODOITEM, itemSource, collect)(TodoItem);
