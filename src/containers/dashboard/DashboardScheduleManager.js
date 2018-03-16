import React, { Component } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';
export default class DashboardScheduleManager extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="wtd-dashboard-schedule-manager">
        <Scrollbars>
          { this.props.children }
        </Scrollbars>
      </section>
    )
  }
}