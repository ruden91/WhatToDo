import React, { Component } from 'react';

import ReactModal from 'react-modal';

import { database, auth } from 'database/firebase';
import { filter } from 'lodash';

import { Circle } from 'rc-progress';
import ProductivityCanvas from 'containers/dashboard/ProductivityCanvas';
export default class Productivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleProductivityModal: false,
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
    const { activedTodoItemsCount } = this.props;

    let percent = activedTodoItemsCount / 10 * 100;
    
    if (percent > 100) {
      percent = 100;
    }
    return percent;
  }

  render() {
    const { activedTodoItemsCount } = this.props;
    const customStyles = {
      overlay: { zIndex: 10},
      content: {
        width: '320px',
        top: '43px',
        right: '10px',
        left: 'auto',
        bottom: 'auto',
        padding: 0,
        zIndex: 10        
      }
    };
    const iconClass = this.changeNumberToPercentage() >= 100 ? 'active' : "";
    return (
      <div>
        <button className="wtd-dashboard-header__action" onClick={ this.handleProductivityModal }>
          <i className="far fa-check-circle"></i>
          <span>{ activedTodoItemsCount }</span>
        </button>

        <ReactModal
            isOpen={ this.state.toggleProductivityModal }
            onRequestClose={this.handleProductivityModalClose}
            ariaHideApp={ false }
            contentLabel="ProductivityModal"
            style={ customStyles }
            overlayClassName="ReactModal__ProductivityModal"
            parentSelector={ this.getParent }            
          >
            <div className="wtd-dashboard-productivity__modal">
              <header>
                <h6>당신의 생산성</h6>
                <button onClick={ this.handleProductivityModalClose }></button>
              </header>
              <div>
                <p>{ activedTodoItemsCount }작업을 완료했습니다. <a href="javascript:;">완료한 모든 작업 보기</a></p>

                <ul className="wtd-dashboard-productivity__tab">
                  <li><a href="javascript:;">일일</a></li>
                  <li><a href="javascript:;">주간</a></li>
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
                  <p>1일 동안 연이어 목표를 완료했습니다.</p>
                  <p className="sm">
                    당신의 가장 긴 스트리크: 1일
                    <br />
                    (2018년3월10일 - 2018년3월17일)
                  </p>                  
                </div>
                <h6>지난 7일 완료</h6>
                <div className="wtd-dashboard-productivity__chart">
                  <ul>
                    <li><div style={{ width: 5/10 * 100}}></div><span>토 <b>5</b></span></li>
                    <li><div style={{ width: 2/10 * 100}}></div><span>금 <b>30</b></span></li>
                    <li><div style={{ width: 8/10 * 100}}></div><span>목 <b>100</b></span></li>
                    <li><div style={{ width: 8/10 * 100}}></div><span>수 <b>8</b></span></li>
                    <li><div style={{ width: 0/10 * 100}}></div><span>화 <b>0</b></span></li>
                    <li><div style={{ width: 1/10 * 100}}></div><span>월 <b>1</b></span></li>
                    <li><div style={{ width: 3/10 * 100}}></div><span>일 <b>3</b></span></li>
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