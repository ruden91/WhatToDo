import * as React from "react";
import Collapse from "rc-collapse";

import "./DashboardCollapseMenu.scss";
import AddSidePanelItem from "components/dashboard/AddSidePanelItem";
import { themes } from "api/settings";
import { createProjectItem } from "database/firebase";
interface Props {
  changeFilter: ((standard: string, index?: number) => void);
  projects: any[];
  filter: string;
}
export default class DashboardCollapseMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    toggleAddSidePanelItem: false,
    content: ""
  };

  mapToProjectComponent = () => {
    const { projects, filter } = this.props;
    return projects.map((project, index) => {
      let isActive = project.name === filter ? "is-active" : "";
      return (
        <li
          className={`wtd-dashboard-collapse__project-panel ${isActive}`}
          onClick={() => this.props.changeFilter("project", index)}
        >
          <table>
            <tbody>
              <tr>
                <td className="color">
                  <div
                    style={{
                      backgroundColor: themes[project.colorIndex].color
                    }}
                  />
                </td>
                <td />
                <td className="name">
                  <span>{project.name}</span>
                  <span>{project.count}</span>
                </td>
                <td className="menu" />
              </tr>
            </tbody>
          </table>
        </li>
      );
    });
  };

  submitSidePanel = (e: any) => {
    e.preventDefault();
    const refinedProjectItems = this.refineProjectItems(
      this.props.projects,
      this.state.content
    );

    createProjectItem(refinedProjectItems);
    this.handleAddSidePanelButton();
  };

  refineProjectItems = (
    items: any[],
    content: string,
    colorIndex: number = 0
  ) => {
    let tempData = items;

    tempData.push({
      name: content,
      colorIndex,
      filterIndex: tempData.length
    });

    return tempData;
  };

  handleAddSidePanelButton = () => {
    this.setState({
      toggleAddSidePanelItem: !this.state.toggleAddSidePanelItem,
      content: ""
    });
  };

  handleSidePanelContent = (e: any) => {
    this.setState({
      content: e.target.value
    });
  };

  render() {
    const { toggleAddSidePanelItem } = this.state;
    let Panel = Collapse.Panel;

    return (
      <Collapse accordion={false} className="wtd-dashboard-collapse">
        <Panel
          header="프로젝트"
          className="wtd-dashboard-collapse__panel"
          headerClass="wtd-dashboard-collapse__header"
        >
          <ul>{this.mapToProjectComponent()}</ul>
          {!toggleAddSidePanelItem && (
            <AddSidePanelItem
              onHandleAddSidePanelButton={this.handleAddSidePanelButton}
            />
          )}
          {toggleAddSidePanelItem && (
            <form
              onSubmit={this.submitSidePanel}
              className="wtd-dashboard-collapse__form"
            >
              <div>
                <input
                  type="text"
                  value={this.state.content}
                  onChange={this.handleSidePanelContent}
                  placeholder="프로젝트를 입력하세요."
                />
                <button type="submit">프로젝트 추가</button>
                <a onClick={this.handleAddSidePanelButton}>취소</a>
              </div>
            </form>
          )}
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
