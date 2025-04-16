import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styled from 'styled-components';

const HeroAnimation = () => {
  return (
    <Wrapper>
      <DotLottieReact
        src="https://lottie.host/8901b474-1418-4b64-be6e-cd2ee60993b5/qCGGSUAlnK.lottie"
        loop
        autoplay
      />
    </Wrapper>
  );
};

export default HeroAnimation;

const Wrapper = styled.div`
  max-width: 320px;
  filter: drop-shadow(0 0 16px #8aff80aa);
  animation: float 5s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;
