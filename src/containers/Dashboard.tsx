import * as React from "react";
// import { signOut } from 'database/firebase';
import DashboardHeader from "components/dashboard/DashboardHeader";
import DashboardAsideMenu from "components/dashboard/DashboardAsideMenu";
import DashboardCollapseMenu from "containers/dashboard/DashboardCollapseMenu";
import DashboardScheduleManager from "containers/dashboard/DashboardScheduleManager";
import Productivity from "components/dashboard/productivity/Productivity";
import Settings from "components/dashboard/Settings";

import * as ReactModal from "react-modal";
import "./Dashboard.scss";
import { max, map } from "lodash";
interface DashboardProps {
  user: any;
  filter: string;
  items: any[];
  projects: any[];
  inboxCount: number;
  todayCount: number;
  daysCount: number;
  completedCount: number;
  todayCompletedCount: number;
  changeFilter: ((standard: string) => void);
  weeklyStats: any;
  moveTodoItem: (
    dragUniqKey: string,
    hoverUniqKey: string,
    targetPosition: string
  ) => void;
  postponeTodoItem: (item: any) => void;
  settings: any;
}
interface DashboardState {
  toggleDashboardModal: boolean;
  modalTarget: string;
}
export default class Dashboard extends React.Component<
  DashboardProps,
  DashboardState
> {
  constructor(props: any) {
    super(props);
  }

  state: DashboardState = {
    toggleDashboardModal: false,
    modalTarget: ""
  };

  // dashboard modal open event
  public openDashboardModal = (
    e: React.MouseEvent<HTMLElement>,
    target: string
  ): void => {
    e.preventDefault();

    this.setState({ toggleDashboardModal: true, modalTarget: target });
  };

  // dashboard modal close event
  public closeDashboardModal = (e: any): void => {
    this.setState({ toggleDashboardModal: false, modalTarget: "" });
  };

  // header modal component 조건처리를 위한 함수
  // JSX 컴포넌트 형식을 반환하는 함수 타입체크 추가하기
  public renderConditionalDashboardModalComponent = (): any => {
    const { modalTarget } = this.state;
    const {
      completedCount,
      todayCompletedCount,
      weeklyStats,
      settings
    } = this.props;
    const { daily_goal } = this.props.user;

    switch (modalTarget) {
      case "productivity":
        return (
          <Productivity
            completedCount={completedCount}
            dailyGoal={daily_goal}
            maxValue={this.calculateMaxValue()}
            todayCompletedCount={todayCompletedCount}
            weeklyStats={weeklyStats}
            closeDashboardModal={this.closeDashboardModal}
          />
        );
      case "setting":
        return <Settings settings={settings} />;
      case "notice":
        return <div>notice</div>;
    }
  };

  calculateMaxValue = (): number => {
    return max(
      map(this.props.weeklyStats, (stats: any): any => {
        return stats.count;
      }).concat([this.props.user.daily_goal])
    );
  };

  render() {
    const { toggleDashboardModal } = this.state;
    const customStyles = {
      overlay: { zIndex: 2, backgroundColor: "transparent" },
      content: {
        position: "absolute",
        top: "43px",
        left: "auto",
        transform: "translateX(155%)",
        right: "50%",
        bottom: "auto",
        padding: 0,
        width: "300px"
      }
    };

    return (
      <div className="wtd-dashboard">
        <DashboardHeader
          onOpenDashboardModal={this.openDashboardModal}
          {...this.props}
        />
        <div className="wtd-container wtd-container--dashboard">
          <div className="wtd-dashboard__left-side-content">
            <DashboardAsideMenu {...this.props} />
            <DashboardCollapseMenu {...this.props} />
          </div>
          <div className="wtd-dashboard__right-side-content">
            <DashboardScheduleManager {...this.props} />
          </div>
        </div>

        <ReactModal
          isOpen={toggleDashboardModal}
          onRequestClose={this.closeDashboardModal}
          ariaHideApp={false}
          contentLabel="DashboardModal"
          style={customStyles}
        >
          {this.renderConditionalDashboardModalComponent()}
        </ReactModal>
      </div>
    );
  }
}
