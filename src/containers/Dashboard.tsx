import * as React from 'react';
// import { signOut } from 'database/firebase';
import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardCollapseMenu from 'containers/dashboard/DashboardCollapseMenu';
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
  onSortBySpecificFilter: ((standard: string) => void);
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
    modalTarget: ''
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
    const { modalTarget } = this.state;
    switch (modalTarget) {
      case 'productivity':
        return <div>productivity</div>;
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

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { auth, database, writeUserData } from 'database/firebase';

// import DashboardHeader from 'components/dashboard/DashboardHeader';
// import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
// import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';
// import InboxContainer from 'containers/dashboard/InboxContainer';
// import TodayContainer from 'containers/dashboard/TodayContainer';
// import WeekContainer from 'containers/dashboard/WeekContainer';

// import { uniqueId, filter, map, max } from 'lodash';

// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';
// import update from 'react-addons-update';

// import * as actions from '../actions';

// import * as module from 'helpers/module';
// import moment from 'moment';

// import MainLoading from 'components/MainLoading';
// class Dashboard extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       user: {},
//       togglePanelComponent: 'today',
//       items: {},
//       todoItems: {},
//       activedTodoItemsCount: 0,
//       loading: true,
//       settings: {
//         theme: {
//           color: null
//         }
//       }
//     };
//   }

//   // side panel toggle event
//   handlePanels = panel => {
//     this.setState({
//       togglePanelComponent: panel
//     });
//   };

//   // logout event
//   handleLogOutButton = () => {
//     auth.signOut();
//   };

//   // drag and drop event handler
//   moveCard = (dragIndex, hoverIndex) => {
//     const { todoItems } = this.state;
//     const dragCard = todoItems[dragIndex];

//     // react-addons-update legacy version -> immutability helper 전환하기
//     this.setState(
//       update(this.state, {
//         todoItems: {
//           $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
//         }
//       })
//     );
//   };

//   componentDidMount() {
//     auth.onAuthStateChanged(currentUser => {
//       if (currentUser) {
//         const uid = currentUser.uid;
//         // 사용자 기록 조회 없으면 저장, 있으면 state에 저장
//         database
//           .ref('users')
//           .child(uid)
//           .on('value', snap => {
//             if (!snap.val()) {
//               writeUserData({ ...currentUser });
//             } else {
//               // 갱신이 필요한 정보 업데이트
//               database
//                 .ref('users')
//                 .child(uid)
//                 .update({
//                   last_signIn_time: currentUser.metadata.lastSignInTime
//                 });
//               this.setState({
//                 user: snap.val()
//               });
//             }
//           });

//         database.ref('items/' + uid).on('value', snap => {
//           this.setState({
//             loading: false,
//             items: snap.val(),
//             totalCount: snap.numChildren(),
//             todayCount: module.filterByDate(snap.val(), 0),
//             weekCount: module.filterByDate(snap.val(), 7),
//             completedCount: this.getCompletedCount(snap.val()),
//             todayCompletedCount: this.getCompletedCount(snap.val(), 0),
//             weeklyStats: this.getWeeklyStats(snap.val()),
//             maxValue: this.calculateMaxValue(snap.val())
//           });
//         });

//         // user의 items를 조회 및 state 저장
//         // database.ref('todoItems/' + uid).on('value', (snap) => {
//         //   console.log(snap.val())
//         //   let currentTimeStamp = moment().add(0, 'days').toDate().getTime();
//         //   let weekTimeStamp = moment().add(0, 'days').toDate().getTime();

//         //   this.setState({
//         //     todoItems: snap.val(),
//         //     loading: false
//         //   })
//         // })

//         database.ref('settings/' + currentUser.uid).on('value', snap => {
//           if (!snap.val()) {
//             database
//               .ref('settings/' + currentUser.uid)
//               .child('theme')
//               .set({ color: '#db4c3f' });
//           }

//           this.setState({
//             settings: snap.val() || { theme: { color: '#db4c3f' } }
//           });
//         });
//       } else {
//         this.props.history.push('/');
//       }
//     });
//   }

//   calculateMaxValue = items => {
//     let results = this.getWeeklyStats(items);
//     const { goalCount } = this.state;

//     return max(
//       map(results, stats => {
//         return stats.count;
//       }).concat([goalCount])
//     );
//   };

//   getCompletedCount(items, when) {
//     if (!(typeof when === 'undefined')) {
//       // n 일에 완료된 데이터의 갯수 필터링
//       let oneDay = moment()
//         .add(when, 'days')
//         .format('dd'); // 해당 요일의 타임스탬프

//       // 오늘 완료한 목록 필터링
//       return filter(items, item => {
//         let completedDay;
//         if (!(typeof item.completed_at === 'undefined')) {
//           completedDay = moment(item.completed_at).format('dd');
//         }
//         return oneDay === completedDay;
//       }).length;
//     } else {
//       return filter(items, item => item.is_completed).length;
//     }
//   }

//   // 일주일 통계 데이터를 object 형태로 정제
//   getWeeklyStats(items) {
//     // 순서는 내림차순
//     // day: 요일 , count: 값 object형식의 배열
//     let results = [];
//     // 지난 7일 dataSet 세팅
//     for (let i = 0; i < 7; i++) {
//       results.push({
//         day: moment()
//           .add(0 - i, 'days')
//           .format('ddd'),
//         count: 0
//       });
//     }

//     // 완료된 데이터 목록
//     let completedItems = filter(items, item => {
//       return item.is_completed;
//     });

//     map(completedItems, (item, key) => {
//       let day = moment(item.completed_at).format('ddd');
//       map(results, result => {
//         if (result.day === day) {
//           result.count++;
//         }
//       });
//     });

//     return results;
//   }

//   // 완료목록 필터링 로직
//   filterCompleteItem(items) {
//     let results = {};
//     map(items, (item, key) => {
//       if (!item.is_completed) {
//         results[key] = item;
//       }
//     });

//     return results;
//   }

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

//   // 조건부로 컴포넌트를 생성하기 위한 함수
//   // 전체 리스트를 보여줄 컴포넌트
//   // 오늘 리스트를 보여줄 컴포넌트
//   // 일주일 리스트를 보여줄 컴포넌트
//   renderConditionalComponent() {
//     const { togglePanelComponent, todoItems, settings, items } = this.state;
//     let currentTimeStamp = moment()
//       .add(0, 'days')
//       .toDate()
//       .getTime();
//     let weekTimeStamp = moment()
//       .add(7, 'days')
//       .toDate()
//       .getTime();
//     if (togglePanelComponent === 'inbox') {
//       // 전체 todoItems
//       return (
//         <InboxContainer
//           items={this.filterCompleteItem(items)}
//           settings={settings}
//         />
//       );
//     } else if (togglePanelComponent === 'today') {
//       // 지난값, 오늘에 해당하는 todoItems

//       return (
//         <TodayContainer
//           items={this.setSortByDate(this.filterCompleteItem(items), 1)}
//           settings={settings}
//         />
//       );
//     } else if (togglePanelComponent === 'week') {
//       // 지난값, 현재 기준으로 일주일 todoItems
//       return (
//         <WeekContainer
//           items={this.setSortByDate(this.filterCompleteItem(items), 7)}
//           settings={settings}
//         />
//       );
//     }
//   }

//   render() {
//     const {
//       togglePanelComponent,
//       panels,
//       todayCount,
//       totalCount,
//       weekCount,
//       todoItems,
//       settings,
//       todayCompletedCount,
//       completedCount,
//       weeklyStats,
//       goalCount,
//       maxValue,
//       loading
//     } = this.state;

//     return (
//       <div className="wtd-dashboard">
//         <div className="wtd-container">
//           <DashboardAsideMenu
//             handlePanels={this.handlePanels}
//             togglePanelComponent={togglePanelComponent}
//             todayCount={todayCount}
//             totalCount={totalCount}
//             weekCount={weekCount}
//           />
//           <DashboardScheduleManager>
//             {this.renderConditionalComponent()}
//           </DashboardScheduleManager>
//         </div>
//       </div>
//     );
//   }
// }

// export default DragDropContext(HTML5Backend)(Dashboard);