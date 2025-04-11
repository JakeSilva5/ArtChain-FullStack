import React from 'react';
import styled from 'styled-components';

const Hero = () => {
  return (
    <HeroSection>
      <Overlay />
      <HeroContent>
        <Header>
          Showcase <Highlight>Your Art</Highlight> on the Blockchain
        </Header>
        <SubHeader>
          Mint, share, and build a lineage of creative works — all transparently stored on-chain.
        </SubHeader>
        <CTAButton>
          Get Started ➜
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #1a1a2e, #16213e);
  background-size: 300% 300%;
  animation: gradientBG 7s linear infinite;

  @keyframes gradientBG {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
`;

const Header = styled.h1`
  font-size: 2.75rem;
  font-weight: bold;
  color: white;
  margin-bottom: 18px;
  text-align: center;
`;

const Highlight = styled.span`
  color: #4CC9F0;
`;

const SubHeader = styled.p`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 30px;
  text-align: center;
`;

const CTAButton = styled.button`
  background: #4CC9F0;
  color: white;
  padding: 14px 25px;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #3BA6D2;
  }
`;

export default Hero;
