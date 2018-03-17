import React, { Component } from 'react';

import ReactModal from 'react-modal';
import { auth, database } from 'database/firebase';

import UserSetting from 'containers/dashboard/settings/UserSetting';
import DefaultSetting from 'containers/dashboard/settings/DefaultSetting';
import ThemeSetting from 'containers/dashboard/settings/ThemeSetting';
import KarmaSetting from 'containers/dashboard/settings/KarmaSetting';
import { uniqueId } from 'lodash';

import { version } from '../../../package.json';
class SettingButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleSettingModal: false,
      toggleUserSettingModal: false,
      toggleSettingComponent: 'user'
    }    

    this.settingPanels = [
      {
        title: '계정',
        icon: 'fas fa-user',
        component: 'user',
        key: uniqueId()
      },
      {
        title: '기본',
        icon: 'fas fa-cogs',
        component: 'basic',
        key: uniqueId()
      },
      {
        title: '테마',
        icon: 'fas fa-paint-brush',
        component: 'theme',
        key: uniqueId()
      },
      {
        title: 'Karma',
        icon: 'fas fa-trophy',
        component: 'karma',
        key: uniqueId()
      }                  
    ];

    this.versionUrl = 'https://github.com/ruden91/react-firebase-project/commits/master';
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

  handlePanel = (panel) => {
    this.setState({
      toggleSettingComponent: panel
    })
  }
  getParent() {
    return document.querySelector('.wtd-dashboard-schedule-manager');
  }
  renderConditionalComponent() {
    const { toggleSettingComponent } = this.state;

    if (toggleSettingComponent === 'user') {
      return <UserSetting />
    } else if (toggleSettingComponent === 'basic') {
      return <DefaultSetting />
    } else if (toggleSettingComponent === 'theme') {
      return <ThemeSetting settings={ this.props.settings } />
    } else if (toggleSettingComponent === 'karma') {
      return <KarmaSetting />
    }
  }

  render() {
    const { toggleSettingComponent } = this.state;
    const customStyles = {
      overlay: {         zIndex: 10},
      content: {
        width: '250px',
        top: '43px',
        right: 0,
        left: 'auto',
        bottom: 'auto',
        padding: 0,
        zIndex: 10        
      }
    }; 
    const userSettingCustomStyles = {
      overlay: { zIndex: 3},
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
          parentSelector={ this.getParent }
        >
          <table className="wtd-dashboard-header__setting-panels">
            <tbody>
              <tr>
                <td>동기화</td>
              </tr>
              <tr>
                <td onClick={ () => this.setState({ toggleUserSettingModal: true }) }>설정</td>
              </tr>
              <tr>
                <td>활동 로그 보기</td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>              
              <tr>
                <td>Donate</td>
              </tr>
              <tr>
                <td><a href="http://webruden.tistory.com/">블로그</a></td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>
              <tr>
                <td><button onClick={ () => auth.signOut() }>로그아웃</button></td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>
              <tr>
                <td>
                  <span>버전 { version }. <a href={ this.versionUrl } target="_blank">체인지로그 보기</a></span>
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
                  {this.settingPanels.map(panel => (
                    <li 
                      className={`wtd-dashboard-user-setting__panel ${toggleSettingComponent === panel.component ? 'current' : ''}`} 
                      onClick={ () => this.handlePanel(panel.component) } 
                      key={panel.key}
                    >
                      <span className="wtd-dashboard-user-setting__panel-icon"><i className={panel.icon}></i></span>
                      <span className="wtd-dashboard-user-setting__panel-title">{panel.title}</span>
                    </li>
                  ))}                  
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