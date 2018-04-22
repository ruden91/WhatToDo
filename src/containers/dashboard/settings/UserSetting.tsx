import * as React from "react";

// import { auth, storage, database } from 'database/firebase';
import "./UserSetting.scss";
interface Props {}

interface State {
  updatedDisplayName: string;
}
export default class UserSetting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      updatedDisplayName: "test"
      // currentUser: auth.currentUser,
      // toggleDisplayName: false
    };
  }

  updateUserProfile = () => {
    // console.log('hello')
  };

  handleDisplayName = (e: any) => {
    e.preventDefault();
    // this.setState({
    //   toggleDisplayName: true
    // })
  };
  handleDeleteUserId = () => {
    // let user = auth.currentUser;
    // user.delete().then(function() {
    //   // User deleted.
    // }).catch(function(error) {
    //   // An error happened.
    // });
  };
  handleUploadImage = (e: any) => {
    // const file = e.target.files[0];
    // let uploadTask = storage.ref('user-images').child(auth.currentUser.uid).child('profile').put(file, { contentType: file.type });
    // uploadTask.on('state_changed', function(snapshot){
    //   // Observe state change events such as progress, pause, and resume
    //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log('Upload is ' + progress + '% done');
    // }, function(error) {
    //   // Handle unsuccessful uploads
    // }, function() {
    //   console.log(uploadTask.snapshot.downloadURL)
    //   // Handle successful uploads on complete
    //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //   var downloadURL = uploadTask.snapshot.downloadURL;
    //   auth.currentUser.updateProfile({
    //     photoURL: downloadURL
    //   })
    //   database.ref('users').child(auth.currentUser.uid).update({
    //     avatar: downloadURL
    //   })
    // });
  };

  handleDisplayNameForm = (e: any) => {
    e.preventDefault();
    // const { updatedDisplayName } = this.state;

    // auth.currentUser.updateProfile({
    //   displayName: updatedDisplayName
    // }).then(() => {
    //   // update successful
    //   this.setState({
    //     toggleDisplayName: false,
    //     currentUser: auth.currentUser
    //   })
    // }).catch(() => {
    //   // an error happend
    //   console.log('error')
    // })
  };

  render() {
    // const { photoURL, email, displayName } = this.state.currentUser;
    // const { updatedDisplayName } = this.state;
    return (
      <div className="wtd-dashboard-user-setting">
        <div>
          <p className="wtd-dashboard-user-setting__title">개인 정보</p>
          <dl onClick={this.updateUserProfile}>
            <dt>사진</dt>
            <dd>
              <input
                type="file"
                id="files"
                accept="image/*"
                onChange={this.handleUploadImage}
                className="wtd-dashboard-user-setting__file-input"
              />
              <label htmlFor="files">
                <span className="wtd-dashboard-user-setting__image-wrap">
                  <span>
                    <i className="fas fa-camera-retro" />
                  </span>
                  {/* <img src={ photoURL } alt={displayName} /> */}
                </span>
              </label>
            </dd>
          </dl>
          <dl>
            <dt>닉네임</dt>
            {/* {!this.state.toggleDisplayName && <dd>{ displayName }<a href="#" onClick={ this.handleDisplayName }>편집</a></dd>}
            {this.state.toggleDisplayName && 
              <dd>
                <form onSubmit={ this.handleDisplayNameForm } >
                  <input type="text" value={ updatedDisplayName } onChange={ (e) => this.setState({ updatedDisplayName: e.target.value })} />
                  <button type="submit">저장</button>
                  <button onClick={ () => this.setState({ toggleDisplayName: false })}>취소</button>
                </form>
              </dd>
            } */}
          </dl>
          <dl>
            <dt>이메일</dt>
            {/* <dd>{ email }</dd> */}
          </dl>
          <dl>
            <dt>패스워드</dt>
            <dd>
              ******<a href="#">편집</a>
            </dd>
          </dl>
        </div>
        <div className="wtd-dashboard-user-setting__user-delete-info">
          <a
            href="#"
            className="wtd-dashboard-user-setting__user-delete-button"
            onClick={this.handleDeleteUserId}
          >
            내 WhatToDo 계정 삭제
          </a>
          <p className="wtd-dashboard-user-setting__user-delete-comment">
            패스워드가 필요합니다
          </p>
        </div>
      </div>
    );
  }
}
