import * as React from 'react';
import { Circle } from 'rc-progress';
import ProductivityCanvas from 'containers/dashboard/productivity/ProductivityCanvas';
import ProductivityChart from 'components/dashboard/productivity/ProductivityChart';
import './Productivity.scss';
interface ProductivityProps {
  completedCount: number;
  dailyGoal: number;
  todayCompletedCount: number;
  weeklyStats: any;
}
const Productivity: React.SFC<ProductivityProps> = props => (
  <div className="wtd-dashboard-productivity">
    <header>당신의 생산성</header>
    <p>{props.completedCount}작업을 완료했습니다.</p>

    <div className="wtd-dashboard-productivity__streak">
      <div className="wtd-dashboard-productivity__streak-chart-container">
        <Circle
          percent={10}
          strokeWidth="4"
          strokeColor="#dd4b39"
          strokeLinecap="round"
          className="wtd-dashboard-productivity__circle-chart"
        />
        {/* <i
          className={`fas fa-trophy wtd-dashboard-productivity__trophy-icon ${iconClass}`}
        /> */}
      </div>
    </div>
    <p>
      일일 목표: {props.todayCompletedCount}/{props.dailyGoal}작업
    </p>
    <div>
      <h6>지난 7일 완료</h6>
      <div className="wtd-dashboard-productivity__chart">
        <ProductivityChart weeklyStats={props.weeklyStats} />
        <ProductivityCanvas dailyGoal={props.dailyGoal} maxValue={10} />
      </div>
      <a href="javascript:;" className="wtd-dashboard-productivity__move-karma">
        Karma 목표 및 설정
      </a>
    </div>
  </div>
);

export default Productivity;

//   renderConditionalGoalCompletionComments() {
//     const { todayCompletedCount, goalCount } = this.props;
//     const percent = todayCompletedCount / goalCount * 100;

//     // 목표치 달성 완료
//     if (percent >= 100) {
//       return <h4> 목표달성 했드아아아~!</h4>;
//     } else if (percent >= 75) {
//       return <h4>이제 막바지입니다. 해낼 수 있습니다!</h4>;
//     } else if (percent >= 35) {
//       return <h4>멋지게 잘 진행하고 있습니다. 계속 열중하세요!</h4>;
//     } else if (percent >= 5) {
//       return <h4>시작이 가장 어렵습니다. 계속 진행하세요!</h4>;
//     } else {
//       return (
//         <h4>
//           일일 목표:{' '}
//           <b>
//             {todayCompletedCount}/{goalCount}작업
//           </b>
//         </h4>
//       );
//     }
//   }
