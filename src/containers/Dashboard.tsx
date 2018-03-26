import * as React from 'react';
// import { signOut } from 'database/firebase';
import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardCollapseMenu from 'containers/dashboard/DashboardCollapseMenu';
import Productivity from 'components/dashboard/productivity/Productivity';
import Settings from 'components/dashboard/Settings';

import * as ReactModal from 'react-modal';
import './Dashboard.scss';
import { map } from 'lodash';
interface FirebaseTodoItemData {
  content: string;
}
interface DashboardProps {
  // user: {
  //   avatar: string;
  //   completed_count: number;
  //   completed_today: number;
  //   display_name: string;
  //   email: string;
  //   features: {};
  //   is_premium: boolean;
  //   join_date: string;
  //   last_signIn_time: string;
  //   next_week: number;
  //   theme: number;
  //   uid: string;
  //   weekly_goal: number;
  // }
  items: any;
  inboxCount: number;
  todayCount: number;
  daysCount: number;
  completedCount: number;
  todayCompletedCount: number;
  onSortBySpecificFilter: ((standard: string) => void);
  weeklyStats: any;
}
interface DashboardState {
  toggleDashboardModal: boolean;
  modalTarget: string;
  dailyGoal: number; // 데일리 목표 테스트 코드
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
    modalTarget: '',
    dailyGoal: 10
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
    this.setState({ toggleDashboardModal: false, modalTarget: '' });
  };

  // header modal component 조건처리를 위한 함수
  // JSX 컴포넌트 형식을 반환하는 함수 타입체크 추가하기
  public renderConditionalDashboardModalComponent = (): any => {
    const { modalTarget, dailyGoal } = this.state;
    const { completedCount, todayCompletedCount, weeklyStats } = this.props;
    switch (modalTarget) {
      case 'productivity':
        return (
          <Productivity
            completedCount={completedCount}
            dailyGoal={dailyGoal}
            todayCompletedCount={todayCompletedCount}
            weeklyStats={weeklyStats}
          />
        );
      case 'setting':
        return <Settings />;
      case 'notice':
        return <div>notice</div>;
    }
  };

  mapToComponent = (): any => {
    const { items } = this.props;
    return map(items, (item: FirebaseTodoItemData, key: string): any => {
      return <div key={key}>{item.content}</div>;
    });
  };

  render() {
    const { toggleDashboardModal } = this.state;
    const customStyles = {
      overlay: { zIndex: 2, backgroundColor: 'transparent' },
      content: {
        position: 'absolute',
        top: '43px',
        left: 'auto',
        transform: 'translateX(155%)',
        right: '50%',
        bottom: 'auto',
        padding: 0,
        width: '300px'
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
            <DashboardCollapseMenu
              onSortBySpecificFilter={this.props.onSortBySpecificFilter}
            />
          </div>
          <div className="wtd-dashboard__right-side-content">
            {this.mapToComponent()}
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

//   calculateMaxValue = items => {
//     let results = this.getWeeklyStats(items);
//     const { goalCount } = this.state;

//     return max(
//       map(results, stats => {
//         return stats.count;
//       }).concat([goalCount])
//     );
//   };

//   setSortByDate(items, count = 0) {
//     let today = moment()
//       .add(0, 'days')
//       .format('YYYY-MM-DD');
//     let results = [];

//     // 지난값 세팅
//     results.push({
//       title: '기한이 지난',
//       date: null,
//       items: {}
//     });

//     // 지난값은 디폴트로 넣어준다.
//     map(items, (item, key) => {
//       // 지난 값 체크
//       if (moment(item.due).format('YYYY-MM-DD') < today) {
//         results[0].items[key] = item;
//       }
//     });

//     for (let i = 0; i < count; i++) {
//       let date;
//       let title;
//       if (i === 0) {
//         title = '오늘';
//         date = moment()
//           .add(i, 'days')
//           .format('dddd MM월 DD일');
//       } else if (i === 1) {
//         title = '내일';
//         date = moment()
//           .add(i, 'days')
//           .format('dddd MM월 DD일');
//       } else {
//         title = moment()
//           .add(i, 'days')
//           .format('dddd');
//         date = moment()
//           .add(i, 'days')
//           .format('MM월 DD일');
//       }

//       results.push({
//         title,
//         date,
//         items: {}
//       });

//       map(items, (item, key) => {
//         if (
//           moment(item.due).format('YYYY-MM-DD') ===
//           moment()
//             .add(i, 'days')
//             .format('YYYY-MM-DD')
//         ) {
//           results[i + 1].items[key] = item;
//         }
//       });
//     }

//     return results;
//   }
