import * as React from 'react';

import TodoList from 'containers/dashboard/item/TodoList';

interface Props {
  items: any;
}
export default class TodoItemsContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TodoList {...this.props} />
      </div>
    );
  }
}
