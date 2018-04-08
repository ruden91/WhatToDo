import * as React from 'react';
import TodoItemsContainer from 'containers/dashboard/item/TodoItemsContainer';
import './DashboardScheduleManager.scss';
interface Props {
  items: any;
  filter: string;
}
export default class DashboardScheduleManager extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  setDynamicTitle = () => {
    const { filter } = this.props;
    let title = '';
    if (filter === 'inbox') {
      title = 'Inbox';
    } else if (filter === 'today') {
      title = '오늘';
    } else if (filter === 'days') {
      title = '다음 7일';
    }

    return title;
  };

  render() {
    return (
      <div className="wtd-dashboard-schedule-manager">
        <header className="wtd-dashboard-schedule-manager__header">
          <h2>{this.setDynamicTitle()}</h2>
        </header>
        <TodoItemsContainer {...this.props} />
      </div>
    );
  }
}
