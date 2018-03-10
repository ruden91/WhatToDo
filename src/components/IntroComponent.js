import React from 'react';

import MainBanner from 'components/intro/MainBanner';
import BrandIntro from 'components/intro/BrandIntro';
import AboutDeveloper from 'components/intro/AboutDeveloper';
const IntroComponent = ({ handleSignUpButton }) => (
  <div>
    <MainBanner />
    <BrandIntro handleSignUpButton={ handleSignUpButton } />
    <AboutDeveloper />
  </div>
)

export default IntroComponent;