import * as React from 'react';
import Collapse from 'rc-collapse';

import './DashboardCollapseMenu.scss';

interface DashboardCollapseMenuProps {
  onSortBySpecificFilter: ((standard: string) => void);
}
export default class DashboardCollapseMenu extends React.Component<
  DashboardCollapseMenuProps
> {
  render() {
    let Panel = Collapse.Panel;

    return (
      <Collapse accordion={false} className="wtd-dashboard-collapse">
        <Panel
          header="프로젝트"
          className="wtd-dashboard-collapse__panel"
          headerClass="wtd-dashboard-collapse__header"
        >
          <ul>
            <li onClick={() => this.props.onSortBySpecificFilter('shopping')}>
              쇼핑
            </li>
            <li>일</li>
            <li>심부름</li>
            <li>개인</li>
            <li>가즈아</li>
          </ul>
        </Panel>
        <Panel
          header="라벨"
          className="wtd-dashboard-collapse__panel"
          headerClass="wtd-dashboard-collapse__header"
        >
          <p>라벨이 없습니다</p>
        </Panel>
        <Panel
          header="필터"
          className="wtd-dashboard-collapse__panel"
          headerClass="wtd-dashboard-collapse__header"
        >
          <ul>
            <li>할당된 사람: 나</li>
            <li>할당된 사람: 다른 사람들</li>
            <li>우선 순위</li>
            <li>우선 순위</li>
            <li>우선 순위</li>
            <li>우선 순위</li>
            <li>우선 순위</li>
            <li>우선 순위</li>
            <li>우선 순위</li>
          </ul>
        </Panel>
      </Collapse>
    );
  }
}
