import React, { Component } from 'react';

import Logout from 'components/Logout';
import UserSetting from 'containers/UserSetting';
export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleSettingMenu: false
    }

    this.handleSettingButton = this.handleSettingButton.bind(this);
  }

  handleSettingButton() {
    this.setState({
      toggleSettingMenu: !this.state.toggleSettingMenu
    })
  }

  render() {
    const { displayName, email, photoURL } = this.props.currentUser;
    const { settings } = this.props;
    const settingMenuClass = this.state.toggleSettingMenu ? 'open' : '';
    return (
      <div className="todo-app__user-info user-info">
        <div className="user-info__right-side-content">
          <span className="user-info__image-wrapper">
            <img src={photoURL} alt={displayName} />
          </span>
          <p className="user-info__name">반갑습니다. { displayName }님</p>
          <button 
            className="todo-app__user-setting-button"
            onClick={this.handleSettingButton}
          >
            <i className="fas fa-cog"></i>설정
          </button>
          <Logout />
          <UserSetting 
            currentUser={ this.props.currentUser }
            settings={ settings } 
            settingMenuClass={ settingMenuClass } 
            handleSettingButton={ this.handleSettingButton }
          />
        </div>
      </div>
    )
  }
}
