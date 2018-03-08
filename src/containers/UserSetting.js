import React, { Component } from 'react';
import { database, storage } from 'database/firebase';
import { SwatchesPicker } from 'react-color';
export default class UserSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: this.props.settings ? this.props.settings.backgroundColor : '',
      toggleColorSettingMenu: false,
      displayName: this.props.currentUser.displayName
    };        
    this.storageRef = storage.ref('/user-images').child(this.props.currentUser.uid);

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.handleColorSettingButton = this.handleColorSettingButton.bind(this);
    this.dispatchSettingData = this.dispatchSettingData.bind(this);

    this.handleDisplayNameForm = this.handleDisplayNameForm.bind(this);
    this.handleImageUploadButton = this.handleImageUploadButton.bind(this);
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
  handleImageUploadButton(e) {
    const file = e.target.files[0];
    const uploadTask = this.storageRef.child(this.props.currentUser.uid).put(file, { contentType: file.type });

    uploadTask.on('state_changed', (snap) => {
      let progress = (snap.bytesTransferred / snap.totalBytes) * 100;

      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log(error)
    }, () => {
      this.props.currentUser.updateProfile({
        photoURL: uploadTask.snapshot.downloadURL
      })
    })
  }
  render() {
    const { handleSettingButton, settingMenuClass, settings } = this.props;
    const styles = {
      backgroundColor: settings ? settings.backgroundColor : ''
    }

    const tempStyle = {
      display: 'none'
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
          <div>
            <form onSubmit={this.handleDisplayNameForm}>
              <input type="text" value={ this.state.displayName } onChange={ (e) => { this.setState({ displayName: e.target.value }) }}/>
              <button type="submit"><i className="fas fa-pencil-alt"></i></button>
            </form>
            <input
              type="file"
              accept="image/*"
              onChange={ this.handleImageUploadButton }
              id="files"
              style={tempStyle}
            />
            <label htmlFor="files">Select file</label>
          </div>
          <p>사용자 컨트롤</p>
          <div>
            <button onClick={ this.handleColorSettingButton }>테마변경</button>
            {this.state.toggleColorSettingMenu && <div>
              <SwatchesPicker 
                color={ this.state.background }
                onChangeComplete={ this.handleChangeComplete }
                width="225px"
              />
            </div>}
          </div>          
          <p>정보</p>
        </div>
      </div>
    )
  }
}