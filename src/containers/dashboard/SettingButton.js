import React, { Component } from 'react';

import ReactModal from 'react-modal';
import { auth } from 'database/firebase';
class SettingButton extends Component {
  state = {
    toggleSettingModal: false
  }

  handleSettingModalClose = () => {
    this.setState({
      toggleSettingModal: false
    })
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
                <td>설정</td>
              </tr>
              <tr>
                <td>활동 로그 보기</td>
              </tr>
              <tr><td className="separator"><div></div></td></tr>              
              <tr>
                <td>지원</td>
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
                <td>개발자아아아아아아아아아</td>
              </tr>                                                                                    
            </tbody>
          </table>
        </ReactModal>        
      </div>
    )
  }
}

export default SettingButton;