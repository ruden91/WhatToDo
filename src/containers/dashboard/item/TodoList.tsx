import * as React from 'react';

import TodoItem from 'components/dashboard/item/TodoItem';
import AddTodoItem from 'containers/dashboard/item/AddTodoItem';
import { map } from 'lodash';
import './TodoList.scss';
interface Props {
  items: any;
  title: string | null;
  date: string | null;
  showButton: boolean;
  onHandleAddTodoItem: (tabIndex: number, index: number) => void;
  index: number;
  todoListIndex: number;
  todoItemIndex: number;
}

interface State {
  toggleAddTodoButton: boolean;
}
export default class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    toggleAddTodoButton: false
  };

  // handleToggleAddTodoButton = (e: any) => {
  //   e.preventDefault();
  //   this.setState({
  //     toggleAddTodoButton: !this.state.toggleAddTodoButton
  //   });
  // };

  mapToComponent = () => {
    const { items, onHandleAddTodoItem, todoListIndex, todoItemIndex, index } = this.props;
    let itemIndex = 0;

    return map(items, (item, key) => {
      itemIndex++;
      if (itemIndex === todoItemIndex && index === todoListIndex) {
        return <AddTodoItem onHandleAddTodoItem={onHandleAddTodoItem} key={key} />;
      } else {
        return (
          <TodoItem
            {...item}
            key={key}
            uniqueKey={key}
            index={itemIndex}
            todoListIndex={index}
            onHandleAddTodoItem={onHandleAddTodoItem}
          />
        );
      }
    });
  };

  render() {
    const {
      title,
      date,
      showButton,
      index,
      onHandleAddTodoItem,
      todoListIndex,
      todoItemIndex
    } = this.props;
    return (
      <div className="wtd-dashboard-todo-list">
        {title && (
          <header className="wtd-dashboard-todo-list__header">
            <h2>
              {title}
              <span>{date}</span>
            </h2>
          </header>
        )}
        {this.mapToComponent()}
        {showButton &&
          (!(todoListIndex === index) || todoItemIndex !== -1) && (
            <div className="wtd-dashboard-todo-list__add-task">
              <a href="javascript:;" onClick={() => onHandleAddTodoItem(index, -1)}>
                <span />작업 추가
              </a>
            </div>
          )}

        {todoListIndex === index &&
          todoItemIndex === -1 && <AddTodoItem onHandleAddTodoItem={onHandleAddTodoItem} />}
      </div>
    );
  }
}
