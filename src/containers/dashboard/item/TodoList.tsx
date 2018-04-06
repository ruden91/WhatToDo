import * as React from 'react';

import TodoItem from 'components/dashboard/item/TodoItem';
import AddTodoItem from 'containers/dashboard/item/AddTodoItem';
import { map } from 'lodash';
import './TodoList.scss';
interface Props {
  items: any;
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

  handleToggleAddTodoButton = (e: any) => {
    e.preventDefault();
    this.setState({
      toggleAddTodoButton: !this.state.toggleAddTodoButton
    });
  };

  mapToComponent = () => {
    const { items } = this.props;

    return map(items, (item, key) => (
      <TodoItem {...item} key={key} uniqueKey={key} />
    ));
  };

  render() {
    const { toggleAddTodoButton } = this.state;
    return (
      <div className="wtd-dashboard-todo-list">
        <p>subTitle</p>
        {this.mapToComponent()}
        {!toggleAddTodoButton && (
          <div className="wtd-dashboard-todo-list__add-task">
            <a href="javascript:;" onClick={this.handleToggleAddTodoButton}>
              <span />작업 추가
            </a>
          </div>
        )}
        {toggleAddTodoButton && (
          <AddTodoItem
            onHandleToggleAddTodoButton={this.handleToggleAddTodoButton}
          />
        )}
      </div>
    );
  }
}
