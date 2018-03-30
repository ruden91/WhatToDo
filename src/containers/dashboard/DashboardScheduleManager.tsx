import * as React from 'react';

import TodoItemsContainer from 'containers/dashboard/item/TodoItemsContainer';

interface Props {
  items: any;
}
export default class DashboardScheduleManager extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="wtd-dashboard-schedule-manager">
        <header>dynamic title</header>
        <TodoItemsContainer {...this.props} />
      </div>
    );
  }
}
