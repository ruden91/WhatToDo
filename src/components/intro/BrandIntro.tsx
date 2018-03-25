import * as React from 'react';

import './BrandIntro.scss';

interface BrandIntroProps {
  openIntroModal: ((e: React.MouseEvent<HTMLElement>, target: string) => void);
}
const BrandIntro: React.SFC<BrandIntroProps> = props => (
  <div className="wtd-brand-intro">
    <p>WhatToDo와 함께 일정관리를 시작하세요</p>
    <a onClick={e => props.openIntroModal(e, 'signUp')}>
      시작하세요 - 무료입니다
    </a>
  </div>
);

export default BrandIntro;
