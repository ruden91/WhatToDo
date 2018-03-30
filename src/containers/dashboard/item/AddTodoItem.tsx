import * as React from 'react';
import { createItem } from 'database/firebase';
interface State {
  content: string;
}
export default class AddTodoItem extends React.Component<{}, State> {
  state = {
    content: ''
  };

  changeTodoItemContent = (e: any): void => {
    this.setState({ content: e.target.value });
  };

  handleAddTodoForm = (e: any): void => {
    e.preventDefault();
    const { content } = this.state;
    if (content === '') {
      return;
    }
    createItem(content, null);

    this.setState({
      content: ''
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddTodoForm}>
          <input
            type="text"
            value={this.state.content}
            onChange={e => this.changeTodoItemContent(e)}
          />
          <button type="submit">add</button>
        </form>
      </div>
    );
  }
}
// import React, { Component } from 'react';
// import * as actions from '../actions';
// import { database, auth, addTodoItem } from 'database/firebase';
// import { random, assign } from 'lodash';
// import moment from 'moment';

// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';

// import 'moment/locale/ko';

// // Include the locale utils designed for moment
// import MomentLocaleUtils, {
//   formatDate,
//   parseDate
// } from 'react-day-picker/moment';
// export default class AddTodoItem extends Component {
//   constructor() {
//     super();

//     this.state = { content: "", openForm: false, due: null };
//   }

//   changeTodoItemContent = e => {
//     this.setState({ content: e.target.value });
//   };

//   createTodoItem = e => {
//     e.preventDefault();
//     const { content } = this.state;

//     if (content === "") {
//       return;
//     }

//     const uid = auth.currentUser.uid;
//     const created_at = new Date().getTime();
//     const due = this.state.due && moment(this.state.due).format('YYYY-MM-DD');

//     addTodoItem({ uid, content, created_at, due });

//     this.setState({ content: "", due: null });
//   };

//   componentDidUpdate() {
//     const { openForm } = this.state;
//     if (typeof this.refs.addTodoItemInput !== "undefined" && openForm) {
//       this.refs.addTodoItemInput.focus();
//     }
//   }

//   CustomOverlay = ({ classNames, selectedDay, children }) => {
//     return <div className={classNames.overlayWrapper}>
//         <div className={classNames.overlay}>
//           {/* <header>
//             <ul>
//               <li>
//                 <button onClick={() => console.log(children)}>
//                   <span className="fa-layers fa-fw">
//                     <i className="fas fa-circle-notch" />
//                     <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3">
//                       19
//                     </span>
//                   </span>
//                 </button>
//               </li>
//               <li>
//                 <button>
//                   <span className="fa-layers fa-fw">
//                     <i className="fas fa-calendar" />
//                     <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3">
//                       27
//                     </span>
//                   </span>
//                 </button>
//               </li>
//               <li>
//                 <button>
//                   <i className="fas fa-sun" />
//                 </button>
//               </li>
//               <li>
//                 <button>
//                   <i className="fas fa-long-arrow-alt-right" data-fa-transform="shrink-5 down-3" data-fa-mask="fas fa-calendar" />
//                 </button>
//               </li>
//               <li>
//                 <button>
//                   <i className="fas fa-moon" />
//                 </button>
//               </li>
//               <li>
//                 <button>
//                   <i className="far fa-calendar-times" />
//                 </button>
//               </li>
//             </ul>
//           </header> */}
//           {children}
//         </div>
//       </div>;
//   };

//   render() {
//     const { openForm } = this.state;
//     const { settings, onAddClick } = this.props;

//     return (
//       <form className="wtd-dashboard__add-todo-item-form" onSubmit={this.createTodoItem}>
//       <div className="wtd-dashboard__add-todo-wrap">
//         <input type="text" onChange={this.changeTodoItemContent} value={this.state.content} ref="addTodoItemInput" />
//         <DayPickerInput
//           overlayComponent={this.CustomOverlay}
//           formatDate={formatDate}
//           parseDate={parseDate}
//           dayPickerProps={
//             {
//               localeUtils: MomentLocaleUtils,
//               locale: "ko"
//             }
//           }
//           onDayChange={day => this.setState({ due: day })}
//           // placeholder={this.state.selectedDay}
//         />
//       </div>

//       <button type="submit">
//         작업 추가
//       </button>
//       <button onClick={ () => onAddClick() }>
//         취소
//       </button>
//     </form>
//     )
//   }
// }
