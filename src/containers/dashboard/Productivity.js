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
      toggleProductivityModal: false
    };
  }

  handleProductivityModal = () => {
    this.setState({
      toggleProductivityModal: !this.state.toggleProductivityModal
    });
  };

  handleProductivityModalClose = () => {
    this.setState({
      toggleProductivityModal: false
    });
  };

  getParent() {
    return document.querySelector('.wtd-dashboard-schedule-manager');
  }

  changeNumberToPercentage(number) {
    const { todayCompletedCount, goalCount } = this.props;

    let percent = todayCompletedCount / goalCount * 100;

    if (percent > 100) {
      percent = 100;
    }
    return percent;
  }

  mapToComponent = () => {
    const { weeklyStats, maxValue, goalCount } = this.props;

    return map(weeklyStats, (stats, key) => {
      return (
        <li key={key}>
          <div>
            <div style={{ width: `${stats.count / maxValue * 100}%` }}>
              <span>
                {stats.day} <b>{stats.count}</b>
              </span>
            </div>
          </div>
        </li>
      );
    });
  };
  renderConditionalGoalCompletionComments() {
    const { todayCompletedCount, goalCount } = this.props;
    const percent = todayCompletedCount / goalCount * 100;

    // 목표치 달성 완료
    if (percent >= 100) {
      return <h4> 목표달성 했드아아아~!</h4>;
    } else if (percent >= 75) {
      return <h4>이제 막바지입니다. 해낼 수 있습니다!</h4>;
    } else if (percent >= 35) {
      return <h4>멋지게 잘 진행하고 있습니다. 계속 열중하세요!</h4>;
    } else if (percent >= 5) {
      return <h4>시작이 가장 어렵습니다. 계속 진행하세요!</h4>;
    } else {
      return (
        <h4>
          일일 목표:{' '}
          <b>
            {todayCompletedCount}/{goalCount}작업
          </b>
        </h4>
      );
    }
  }

  render() {
    const {
      todayCompletedCount,
      completedCount,
      goalCount,
      maxValue
    } = this.props;
    const customStyles = {
      overlay: { zIndex: 10, backgroundColor: 'transparent' },
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
    const iconClass = this.changeNumberToPercentage() >= 100 ? 'active' : '';
    return (
      <div>
        <button
          className="wtd-dashboard-header__action"
          onClick={this.handleProductivityModal}
        >
          <i className="far fa-check-circle" />
          <span>{completedCount}</span>
        </button>

        <ReactModal
          isOpen={this.state.toggleProductivityModal}
          onRequestClose={this.handleProductivityModalClose}
          ariaHideApp={false}
          contentLabel="ProductivityModal"
          style={customStyles}
        >
          <div className="wtd-dashboard-productivity__modal">
            <header>
              <h6>당신의 생산성</h6>
              <button onClick={this.handleProductivityModalClose} />
            </header>
            <div>
              <p>{completedCount}작업을 완료했습니다.</p>

              <ul className="wtd-dashboard-productivity__tab">
                <li>
                  <a href="javascript:;">일일</a>
                </li>
                <li>
                  <a href="javascript:;" onClick={() => alert('준비중입니다.')}>
                    주간
                  </a>
                </li>
              </ul>

              <div className="wtd-dashboard-productivity__streak">
                <div className="wtd-dashboard-productivity__streak-chart-container">
                  <Circle
                    percent={this.changeNumberToPercentage()}
                    strokeWidth="4"
                    strokeColor="#dd4b39"
                    strokeLinecap="round"
                    className="wtd-dashboard-productivity__circle-chart"
                  />
                  <i
                    className={`fas fa-trophy wtd-dashboard-productivity__trophy-icon ${iconClass}`}
                  />
                </div>
                {this.renderConditionalGoalCompletionComments()}
              </div>
              <h6>지난 7일 완료</h6>
              <div className="wtd-dashboard-productivity__chart">
                <ul>{this.mapToComponent()}</ul>
                <ProductivityCanvas goalCount={goalCount} maxValue={maxValue} />
              </div>
              <a
                href="javascript:;"
                className="wtd-dashboard-productivity__move-karma"
              >
                Karma 목표 및 설정
              </a>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
