import React, { Component } from 'react';

import ReactModal from 'react-modal';

import { database, auth } from 'database/firebase';
import { filter, map } from 'lodash';

import { Circle } from 'rc-progress';
import ProductivityCanvas from 'containers/dashboard/ProductivityCanvas';
export default class Productivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleProductivityModal: false,
      goalCount: 10
    }

    this.filteredTodoItems = filter(this.props.todoItems, (item) => item.active);
    console.log(this.filteredTodoItems);
  }

  handleProductivityModal = () => {
    this.setState({
      toggleProductivityModal: !this.state.toggleProductivityModal
    })
  }

  handleProductivityModalClose = () => {
    this.setState({
      toggleProductivityModal: false
    })    
  }

  getParent () {
    return document.querySelector('.wtd-dashboard-schedule-manager');
  }

  changeNumberToPercentage (number) {
    const { todayCompletedCount } = this.props;

    let percent = todayCompletedCount / 10 * 100;
    
    if (percent > 100) {
      percent = 100;
    }
    return percent;
  }

  mapToComponent = () => {
    const { weeklyStats } = this.props;

    return map(weeklyStats, (stats, key) => {
      return (
        <li key={key}>
          <div></div>
          <span >{ stats.day } <b>{ stats.count }</b></span>
        </li>
      )
    });
  }

  render() {
    const { todayCompletedCount, completedCount } = this.props;
    const { goalCount } = this.state;
    const customStyles = {
      overlay: { zIndex: 10, backgroundColor: 'transparent'},
      content: {
        position: 'absolute',
        top: '43px',
        left: '50%',
        transform: 'translateX(35%)',
        width: '320px',
        height: '500px',
        padding: 0,
        zIndex: 10        
      }
    };
    const iconClass = this.changeNumberToPercentage() >= 100 ? 'active' : "";
    return (
      <div>
        <button className="wtd-dashboard-header__action" onClick={ this.handleProductivityModal }>
          <i className="far fa-check-circle"></i>
          <span>{ completedCount }</span>
        </button>

        <ReactModal
            isOpen={ this.state.toggleProductivityModal }
            onRequestClose={this.handleProductivityModalClose}
            ariaHideApp={ false }
            contentLabel="ProductivityModal"
            style={ customStyles }
          >
            <div className="wtd-dashboard-productivity__modal">
              <header>
                <h6>당신의 생산성</h6>
                <button onClick={ this.handleProductivityModalClose }></button>
              </header>
              <div>
                <p>{ completedCount }작업을 완료했습니다.</p>

                <ul className="wtd-dashboard-productivity__tab">
                  <li><a href="javascript:;">일일</a></li>
                  <li><a href="javascript:;" onClick={ () => alert('준비중입니다.')}>주간</a></li>
                </ul>
                
                <div className="wtd-dashboard-productivity__streak">
                  <div className="wtd-dashboard-productivity__streak-chart-container">
                    <Circle 
                      percent={ this.changeNumberToPercentage() } 
                      strokeWidth="4" 
                      strokeColor="#dd4b39" 
                      strokeLinecap="round"
                      className="wtd-dashboard-productivity__circle-chart"
                    />
                    <i className={`fas fa-trophy wtd-dashboard-productivity__trophy-icon ${iconClass}`}></i>
                  </div>
                  {goalCount > todayCompletedCount && <h4>일일 목표: <b>{ todayCompletedCount }/{ goalCount }작업</b></h4>}                  
                  {goalCount <= todayCompletedCount && <h4> 목표달성 했드아아아~!</h4>}                  
                </div>
                <h6>지난 7일 완료</h6>
                <div className="wtd-dashboard-productivity__chart">
                  <ul>
                    { this.mapToComponent() }
                  </ul>
                  <ProductivityCanvas />
                </div>
                <a href="javascript:;" className="wtd-dashboard-productivity__move-karma">Karma 목표 및 설정</a>
              </div>
            </div>
          </ReactModal>                
      </div>
    )
  }
}