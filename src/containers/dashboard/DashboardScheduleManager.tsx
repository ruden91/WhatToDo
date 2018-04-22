import * as React from "react";
import TodoItemsContainer from "containers/dashboard/item/TodoItemsContainer";
import "./DashboardScheduleManager.scss";
interface Props {
  items: any[];
  filter: string;
  moveTodoItem: (
    dragUniqKey: string,
    hoverUniqKey: string,
    targetPosition: string
  ) => void;
  postponeTodoItem: (item: any) => void;
}
export default class DashboardScheduleManager extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  setDynamicTitle = () => {
    const { filter } = this.props;
    let title = "";
    if (filter === "inbox") {
      title = "Inbox";
    } else if (filter === "today") {
      title = "오늘";
    } else if (filter === "days") {
      title = "다음 7일";
    } else if (filter === "shopping") {
      title = "쇼핑";
    } else if (filter === "errand") {
      title = "심부름";
    } else if (filter === "work") {
      title = "일";
    } else if (filter === "private") {
      title = "개인";
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
