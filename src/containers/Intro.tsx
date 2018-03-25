import * as React from 'react';

import AppHeader from 'components/layouts/AppHeader';
import MainBanner from 'components/intro/MainBanner';
import BrandIntro from 'components/intro/BrandIntro';
import AboutDeveloper from 'components/intro/AboutDeveloper';
import AppFooter from 'components/layouts/AppFooter';
import AppLoginForm from 'components/AppLoginForm';
import AppSignupForm from 'components/AppSignupForm';

import * as ReactModal from 'react-modal';
interface IntroState {
  toggleIntroModal: boolean;
  modalTarget: string;
}

export default class Intro extends React.Component<{}, IntroState> {
  state: IntroState = {
    toggleIntroModal: false,
    modalTarget: ''
  };

  // Intro 스크롤 제어 함수
  public handleAppScroll = (e: any): void => {
    const scrollTop = e.srcElement.all[0].scrollTop;
    let headerElement;
    if (document.querySelector('.wtd-header')) {
      headerElement = document.querySelector('.wtd-header') || null;
    }

    if (scrollTop > 20) {
      headerElement.classList.add('wtd-header--is-detached');
    } else {
      headerElement.classList.remove('wtd-header--is-detached');
    }
  };

  // 로그인 모달 제어 이벤트
  public openIntroModal = (
    e: React.MouseEvent<HTMLElement>,
    target: string
  ): void => {
    e.preventDefault();

    this.setState({ toggleIntroModal: true, modalTarget: target });
  };

  // 로그인 모달 닫기버튼 제어 함수
  public closeIntroModal = (e: any): void => {
    this.setState({ toggleIntroModal: false, modalTarget: '' });
  };

  // login component / signUp component 조건처리를 위한 함수
  // JSX 컴포넌트 형식을 반환하는 함수 타입체크 추가하기
  public renderConditionalModalComponent = (): any => {
    const { modalTarget } = this.state;
    if (modalTarget === 'login') {
      return (
        <AppLoginForm
          closeIntroModal={this.closeIntroModal}
          openIntroModal={this.openIntroModal}
        />
      );
    } else if (modalTarget === 'signUp') {
      return <AppSignupForm closeIntroModal={this.closeIntroModal} />;
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleAppScroll);
  }

  render() {
    const { toggleIntroModal } = this.state;

    const customStyles = {
      overlay: { zIndex: 2, backgroundColor: 'rgba(102,102,102,0.5)' },
      content: {
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.5), 0 0 10px 0 rgba(0,0,0,0.2)',
        width: '420px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <div>
        <AppHeader openIntroModal={this.openIntroModal} />
        <MainBanner />
        <BrandIntro openIntroModal={this.openIntroModal} />
        <AboutDeveloper />
        <AppFooter />

        <ReactModal
          isOpen={toggleIntroModal}
          onRequestClose={this.closeIntroModal}
          ariaHideApp={false}
          contentLabel="loginModal"
          style={customStyles}
        >
          {this.renderConditionalModalComponent()}
        </ReactModal>
      </div>
    );
  }
}
