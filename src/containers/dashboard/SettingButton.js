import React, { Component } from 'react';

import ReactModal from 'react-modal';
import { auth } from 'database/firebase';

import UserSetting from 'containers/dashboard/settings/UserSetting';
import DefaultSetting from 'containers/dashboard/settings/DefaultSetting';
import ThemeSetting from 'containers/dashboard/settings/ThemeSetting';
import KarmaSetting from 'containers/dashboard/settings/KarmaSetting';
class SettingButton extends Component {
  state = {
    toggleSettingModal: false,
    toggleUserSettingModal: false,
    toggleSettingComponent: 'user'
  }

  handleSettingModalClose = () => {
    this.setState({
      toggleSettingModal: false
    })
  }

  handleUserSettingModalClose = () => {
    this.setState({
      toggleUserSettingModal: false
    })
  }

  renderConditionalComponent() {
    const { toggleSettingComponent } = this.state;

    if (toggleSettingComponent === 'user') {
      return <UserSetting />
    } else if (toggleSettingComponent === 'basic') {
      return <DefaultSetting />
    } else if (toggleSettingComponent === 'theme') {
      return <ThemeSetting />
    } else if (toggleSettingComponent === 'karma') {
      return <KarmaSetting />
    }
  }

  render() {
    const customStyles = {
      overlay: {},
      content: {
        width: '250px',
        top: '43px',
        right: '54px',
        left: 'auto',
        bottom: 'auto',
        padding: 0
      }
    }; 
    const userSettingCustomStyles = {
      overlay: {},
      content: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        borderRadius: 0,
        border: 'none',
        backgroundColor: '#fff',
        padding: 0
      }
    };         
    return (
      <div>
        <button 
          className="wtd-dashboard-header__action wtd-dashboard-header__action--setting"
          onClick={ () => this.setState({ toggleSettingModal: !this.state.toggleSettingModal }) }
        >
          <i className="fas fa-cog"></i>
        </button>

        <ReactModal
          isOpen={ this.state.toggleSettingModal }
          onRequestClose={this.handleSettingModalClose}
          ariaHideApp={ false }
          contentLabel="settingModal"
          style={ customStyles }
          overlayClassName="ReactModal__Overlaysdsd"
        >
          <table className="wtd-dashboard-header__setting-panels">
            <tbody>
              <tr>
                <td>동기화</td>
              </tr>
              <tr>
                <td><button onClick={ () => this.setState({ toggleUserSettingModal: true }) }>설정</button></td>
              </tr>
              <tr>
                <td>활동 로그 보기</td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>              
              <tr>
                <td>Donate</td>
              </tr>
              <tr>
                <td>블로그</td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>
              <tr>
                <td><button onClick={ () => auth.signOut() }>로그아웃</button></td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>
              <tr>
                <td>
                  <span>버전 0.1.5. <a href="https://github.com/ruden91" target="_blank">체인지로그 보기</a></span>
                </td>
              </tr>                                                                                    
            </tbody>
          </table>
        </ReactModal> 

        <ReactModal
          isOpen={ this.state.toggleUserSettingModal }
          onRequestClose={this.handleUserSettingModalClose}
          ariaHideApp={ false }
          contentLabel="userSettingModal"
          style={ userSettingCustomStyles }
        >
          <header className="wtd-dashboard-user-setting__header">
            <p>설정</p>
            <button onClick={ this.handleUserSettingModalClose}>
              <span>닫기</span>
              <span className="wtd-dashboard-user-setting__close-button">

              </span>
            </button>
          </header>
          <div className="wtd-dashboard-user-setting__content">
            <div className="wtd-container">
              <aside className="wtd-dashboard-user-setting__left-side-content">
                <ul className="wtd-dashboard-user-setting__panels">
                  <li className="wtd-dashboard-user-setting__panel current" onClick={ () => this.setState({ toggleSettingComponent: 'user' })}>
                    <span className="wtd-dashboard-user-setting__panel-icon"><i className="fas fa-user"></i></span>
                    <span className="wtd-dashboard-user-setting__panel-title">계정</span>
                  </li>
                  <li className="wtd-dashboard-user-setting__panel" onClick={ () => this.setState({ toggleSettingComponent: 'basic' })}>
                    <span className="wtd-dashboard-user-setting__panel-icon"><i className="fas fa-cogs"></i></span>
                    <span className="wtd-dashboard-user-setting__panel-title">일반</span>
                  </li>
                  <li className="wtd-dashboard-user-setting__panel" onClick={ () => this.setState({ toggleSettingComponent: 'theme' })}>
                    <span className="wtd-dashboard-user-setting__panel-icon"><i className="fas fa-paint-brush"></i></span>
                    <span className="wtd-dashboard-user-setting__panel-title">테마</span>
                  </li>
                  <li className="wtd-dashboard-user-setting__panel" onClick={ () => this.setState({ toggleSettingComponent: 'karma' })}>
                    <span className="wtd-dashboard-user-setting__panel-icon"><i className="fas fa-trophy"></i></span>
                    <span className="wtd-dashboard-user-setting__panel-title">Karma</span>
                  </li>                  
                </ul>                
              </aside>
              <div className="wtd-dashboard-user-setting__right-side-content">
                { this.renderConditionalComponent() }
              </div>
            </div>
          </div>
        </ReactModal>               
      </div>
    )
  }
}

export default SettingButton;