import React, { Component } from 'react';

const AppHeader = () => (
  <header className="wtd-header">
    <div className="wtd-header__floating">
      <div className="wtd-container">
        <div className="wtd-header-inner">
          <div className="wtd-header__brand">
            <a href="#" className="wtd-header__logo-holder">
              WhatToDo
            </a>
          </div>
          <div className="wtd-header__actions-holder">
            <ul className="wtd-header__actions">
              <li className="wtd-header__action">
                <a href="#" className="wtd-header__action-link">
                  설명
                </a>
              </li>  
              <li className="wtd-header__action">
                <a href="#" className="wtd-header__action-link">
                  프리미엄
                </a>
              </li>
              <li className="wtd-header__action">
                <a href="#" className="wtd-header__action-link">
                  비즈니스
                </a>
              </li>                                      
              <li className="wtd-header__action">
                <a href="#" className="wtd-header__action-link">
                  로그인
                </a>
              </li>
              <li className="wtd-header__action">
                <a href="#" className="wtd-header__action-link">
                  가입
                </a>
              </li>              
            </ul>
          </div>
        </div>
      </div>    
    </div>
  </header>
)

export default AppHeader;
// export default class AppHeader extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     // const style = {
//     //   backgroundColor: this.props.settings ? this.props.settings.backgroundColor : ""
//     // }

//     // const writeButtonStyle = {
//     //   '&::before': this.props.settings ? this.props.settings.backgroundColor : "",
//     //   '&::after': this.props.settings ? this.props.settings.backgroundColor : ""
//     // }
//     // const { toggleAddTodoItem, toggleAddTodoItemButton } = this.props;

//     return (
//       <header className="todo-app-header" style={style}>
//         <span className="todo-app-header__header-logo">
//           <i className="fas fa-list-ol"></i>
//         </span>
//         <button 
//           className="todo-app-header__add-button-toggle js-todo-app-header__add-button-toggle"
//           onClick={ () => toggleAddTodoItem() }
//         >
//           <span className={toggleAddTodoItemButton ? 'open' : 'close'}>
//             <span style={ style }></span>
//             <span style={ style }></span>
//           </span>
//         </button>
//       </header>
//     )
//   }
// }
