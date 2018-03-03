import React, { Component } from 'react';
import { database } from 'database/firebase';

import Logout from 'components/Logout';
import ColorItems from 'containers/ColorItems';
export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleSettingMenu: false
    }

    this.handleSettingButton = this.handleSettingButton.bind(this);
    this.dispatchSettingData = this.dispatchSettingData.bind(this);
  }

  handleSettingButton() {
    this.setState({
      toggleSettingMenu: !this.state.toggleSettingMenu
    })
  }

  dispatchSettingData(color) {
    const { uid } = this.props.currentUser;

    database.ref('settings/' + uid).set({
      backgroundColor: color
    })
  }

  render() {
    const { displayName, email, photoURL } = this.props.currentUser;
    const { settings } = this.props;
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

          {this.state.toggleSettingMenu && <ColorItems dispatchSettingData={ this.dispatchSettingData } settings={settings}/>}
        </div>
      </div>
    )
  }
}
