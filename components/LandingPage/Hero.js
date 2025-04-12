import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();

  return (
    <HeroSection>
      <Overlay />
      <HeroContent>
        <Title>
          Welcome to <Highlight>ArtChain</Highlight>
        </Title>
        <Subtitle>
          Create NFTs. Inspire Others. Earn Royalties.
        </Subtitle>
        <ButtonRow>
          <PrimaryButton onClick={() => router.push('/mint')}>Start Minting</PrimaryButton>
          <SecondaryButton onClick={() => router.push('/gallery')}>Explore Gallery</SecondaryButton>
        </ButtonRow>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  height: 75vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E0E7FF 0%, #C1C8E4 30%, #7091E6 65%, #8860D0 100%);
  background-size: 300% 300%;
  animation: animateBG 12s ease infinite;

  @keyframes animateBG {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  backdrop-filter: blur(4px);
  z-index: 1;
`;

const HeroContent = styled.div`
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 40px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.colors.purpleAccent};
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    background: rgba(112, 145, 230, 0.1);
  }
`;