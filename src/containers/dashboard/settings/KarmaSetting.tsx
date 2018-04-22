// import * as React from "react";

// // firebase 일일목표 업데이트 함수 import
// // import { updateSpecificUserData } from "database/firebase";
// export default class KarmaSetting extends React.Component {
//   state = {
//     test: 10,
//     toggleEdit: false
//   };

//   handleEditButton = (e: any) => {
//     e.preventDefault();
//     // const { test } = this.state;
//     // 특정 유저 데이터 업데이트
//     // updateSpecificUserData("daily_goal", test);
//   };

//   changeGoalData = (e: any) => {
//     this.setState({
//       test: e.target.value
//     });
//   };

//   render() {
//     const { test } = this.state;
//     return (
//       <div className="wtd-dashboard-karma-setting">
//         <h6>목표</h6>
//         <p>
//           작은 것을 큰 업적으로 만드세요. 어떤 개수의 작업을 완료하기 위한
//           목표를 설정하고 달성하여 추가의 Karma 포인트를 획득하세요.
//         </p>
//         <div className="wtd-dashboard-karma-setting__setting-box">
//           <label>일일목표:</label>
//           <input type="number" value={test} onChange={this.changeGoalData} />
//           <a href="javascript:;" onClick={this.handleEditButton}>
//             편집
//           </a>
//         </div>
//       </div>
//     );
//   }
// }
