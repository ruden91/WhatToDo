import * as React from 'react';

import { updateItem } from 'database/firebase';
import './TodoItem.scss';
interface Props {
  content: string;
  uniqueKey: string;
  index: number;
  todoListIndex: number;
  onHandleAddTodoItem: (tabIndex: number, index: number) => void;
}
const TodoItem: React.SFC<Props> = props => (
  <li className="wtd-dashboard-todo-item">
    <div className="wtd-dashboard-todo-item__invisible-space">
      <i className="fas fa-sort" />
    </div>
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td className="wtd-dashboard-todo-item__checker">
            <button
              className="wtd-dashboard-todo-item__check-box"
              onClick={() => updateItem(props.uniqueKey)}
            >
              <i className="fas fa-check" />
            </button>
          </td>
          <td
            className="wtd-dashboard-todo-item__content"
            onClick={() => props.onHandleAddTodoItem(props.todoListIndex, props.index)}
          >
            <span>{props.content}</span>
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

export default TodoItem;
