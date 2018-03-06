import React, { Component } from 'react';

import { database } from 'database/firebase';
import { SwatchesPicker } from 'react-color';
export default class UserSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: this.props.settings ? this.props.settings.backgroundColor : '',
      toggleColorSettingMenu: false,
      displayName: this.props.currentUser.displayName
    };        

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.handleColorSettingButton = this.handleColorSettingButton.bind(this);
    this.dispatchSettingData = this.dispatchSettingData.bind(this);

    this.handleDisplayNameForm = this.handleDisplayNameForm.bind(this);
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

  handleDisplayNameForm(e) {
    e.preventDefault();
    if (this.props.currentUser.displayName === this.state.displayName) {
      return;
    }
    
    const { displayName } = this.state;
    this.props.currentUser.updateProfile({
      displayName
    })

    alert('닉네임이 변경되었습니다.');
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
          <form onSubmit={this.handleDisplayNameForm}>
            <input type="text" value={ this.state.displayName } onChange={ (e) => { this.setState({ displayName: e.target.value }) }}/>
            <button type="submit">수정</button>
          </form>
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