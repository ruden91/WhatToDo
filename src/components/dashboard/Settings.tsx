import * as React from "react";
import { signOut } from "database/firebase";

import * as ReactModal from "react-modal";
import "./Settings.scss";

import UserSetting from "containers/dashboard/settings/UserSetting";
import ThemeSetting from "containers/dashboard/settings/ThemeSetting";

interface Props {
  settings: any;
}

interface State {
  toggleModal: boolean;
  selectedSettingsPanel: string;
}
export default class Settings extends React.Component<Props, State> {
  state: State = {
    toggleModal: true,
    selectedSettingsPanel: "user"
  };

  handleCloseSettingModal = () => {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  };

  handleSideSettingPanel = (panel: string): void => {
    this.setState({
      selectedSettingsPanel: panel
    });
  };

  renderConditionalSettingsModalComponent = () => {
    const { settings } = this.props;
    const { selectedSettingsPanel } = this.state;
    if (selectedSettingsPanel === "user") {
      return <UserSetting />;
    } else if (selectedSettingsPanel === "basic") {
      return <div>wtf</div>;
    } else if (selectedSettingsPanel === "theme") {
      return <ThemeSetting settings={settings} />;
    } else if (selectedSettingsPanel === "karma") {
      return <div>wtf</div>;
    } else {
      return <div>해당되는 컴포넌트가 존재하지 않습니다.</div>;
    }
  };

  render() {
    const customStyles = {
      overlay: { zIndex: 2, backgroundColor: "#fafafa" },
      content: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "none",
        borderRadius: 0,
        padding: 0,
        backgroundColor: "#fafafa"
      }
    };

    return (
      <div>
        <table className="wtd-dashboard-header__setting-panels">
          <tbody>
            <tr>
              <td>
                <button onClick={this.handleCloseSettingModal}>설정</button>
              </td>
            </tr>
            <tr>
              <td className="separator">
                <div />
              </td>
            </tr>
            <tr>
              <td>Donate</td>
            </tr>
            <tr>
              <td>
                <a href="http://webruden.tistory.com/">블로그</a>
              </td>
            </tr>
            <tr>
              <td className="separator">
                <div />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={signOut}>로그아웃</button>
              </td>
            </tr>
            <tr>
              <td className="separator">
                <div />
              </td>
            </tr>
            <tr>
              <td>
                <span>
                  버전 1.2.2.{" "}
                  <a
                    href="https://github.com/ruden91/react-firebase-project/commits/master"
                    target="_blank"
                  >
                    체인지로그 보기
                  </a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <ReactModal
          isOpen={this.state.toggleModal}
          onRequestClose={this.handleCloseSettingModal}
          ariaHideApp={false}
          contentLabel="DashboardModal"
          style={customStyles}
        >
          <header className="wtd-settings__header">
            <div className="wtd-settings__left-section">
              <h1>설정</h1>
            </div>
            <div className="wtd-settings__right-section">
              <a href="javascript:;" onClick={this.handleCloseSettingModal}>
                닫기
                <span />
              </a>
            </div>
          </header>
          <div>
            <div className="wtd-container">
              <div className="wtd-settings__left-side-content">
                <ul className="wtd-settings__panels">
                  <li
                    className="wtd-settings__panel"
                    onClick={() => this.handleSideSettingPanel("user")}
                  >
                    <span className="wtd-settings__panel-icon">
                      <i className="fas fa-user" />
                    </span>
                    <span className="wtd-settings__panel-title">계정</span>
                  </li>
                  <li
                    className="wtd-settings__panel"
                    onClick={() => this.handleSideSettingPanel("basic")}
                  >
                    <span className="wtd-settings__panel-icon">
                      <i className="fas fa-cogs" />
                    </span>
                    <span className="wtd-settings__panel-title">일반</span>
                  </li>
                  <li
                    className="wtd-settings__panel"
                    onClick={() => this.handleSideSettingPanel("theme")}
                  >
                    <span className="wtd-settings__panel-icon">
                      <i className="fas fa-paint-brush" />
                    </span>
                    <span className="wtd-settings__panel-title">테마</span>
                  </li>
                  <li
                    className="wtd-settings__panel"
                    onClick={() => this.handleSideSettingPanel("karma")}
                  >
                    <span className="wtd-settings__panel-icon">
                      <i className="fas fa-trophy" />
                    </span>
                    <span className="wtd-settings__panel-title">Karma</span>
                  </li>
                </ul>
              </div>
              <div className="wtd-settings__right-side-content">
                {this.renderConditionalSettingsModalComponent()}
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
