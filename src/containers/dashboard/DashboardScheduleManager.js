import React, { Component } from 'react';

export default class DashboardScheduleManager extends Component {
  render() {
    return (
      <section className="wtd-dashboard-schedule-manager">
        { this.props.children }
      </section>
    )
  }
}