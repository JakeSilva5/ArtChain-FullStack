import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import HeroAnimation from '@/components/HeroAnimation';

const Hero = () => {
  const router = useRouter();

  return (
    <HeroSection>
      <Content>
        <Left>
          <Title>
            Welcome to <Highlight>ArtChain</Highlight>
          </Title>
          <Subtitle>Create NFTs. Inspire Others. Earn Credit.</Subtitle>
          <ButtonRow>
            <PrimaryButton onClick={() => router.push('/mint')}>Start Minting</PrimaryButton>
            <SecondaryButton onClick={() => router.push('/gallery')}>Explore Gallery</SecondaryButton>
          </ButtonRow>
        </Left>
        <Right>
          <HeroAnimation />
        </Right>
      </Content>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  min-height: 60vh;
  background: radial-gradient(circle at top left, #0B0B0B 30%, #000 100%);
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 30px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
  gap: 40px;
  padding: 0 10px;
`;

const Left = styled.div`
  flex: 1.4;
  min-width: 350px;
  padding-right: 20px;

  h1 {
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 24px;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 36px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  & > div {
    max-width: 600px;
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 40px;
`;


const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.lime};
    box-shadow: ${({ theme }) => theme.glowLime};
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.lime};

  &:hover {
    background: rgba(50, 255, 126, 0.1);
    box-shadow: ${({ theme }) => theme.glowLimeHover};
  }
`;