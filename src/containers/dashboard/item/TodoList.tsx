import * as React from 'react';

import TodoItem from 'components/dashboard/item/TodoItem';
import AddTodoItem from 'containers/dashboard/item/AddTodoItem';
import { map } from 'lodash';
interface Props {
  items: any;
}
export default class TodoList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  mapToComponent = () => {
    const { items } = this.props;

    return map(items, (item, key) => <TodoItem {...item} key={key} />);
  };

  render() {
    return (
      <div>
        <p>subTitle</p>
        {this.mapToComponent()}
        <AddTodoItem />
      </div>
    );
  }
}
