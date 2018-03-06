import React, { Component } from 'react';

import { database } from 'database/firebase';
import { SwatchesPicker } from 'react-color';
export default class UserSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: this.props.settings ? this.props.settings.backgroundColor : '',
      toggleColorSettingMenu: false
    };        

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.handleColorSettingButton = this.handleColorSettingButton.bind(this);
    this.dispatchSettingData = this.dispatchSettingData.bind(this);
  }

  dispatchSettingData(color) {
    const { uid } = this.props.currentUser;

    database.ref('settings/' + uid).set({
      backgroundColor: color
    })
  }  

  handleChangeComplete(color) {
    this.setState({
      background: color.hex
    })
    this.dispatchSettingData(color.hex);
  }

  handleColorSettingButton(e) {
    this.setState({
      toggleColorSettingMenu: !this.state.toggleColorSettingMenu
    })
  }

  render() {
    const { handleSettingButton, settingMenuClass, settings } = this.props;
    const styles = {
      backgroundColor: settings ? settings.backgroundColor : ''
    }

    return (
      <div className={`todo-app__user-setting ${settingMenuClass}`}>
        <header style={styles}>
          <button onClick={ handleSettingButton }>
            <i className="fas fa-arrow-left"></i>
          </button>
          <p>설정</p>
        </header>
        <div className="todo-app__user-setting-content">
          <p>기본설정</p>

          <p>사용자 컨트롤</p>
          <button onClick={ this.handleColorSettingButton }>테마변경</button>
          {this.state.toggleColorSettingMenu && <div>
            <SwatchesPicker 
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
              width="225px"
            />
          </div>}          
          <p>정보</p>
        </div>
      </div>
    )
  }
}