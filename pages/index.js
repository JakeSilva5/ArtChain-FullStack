import Hero from "@/components/LandingPage/Hero";
import Footer from "@/components/LandingPage/Footer";
import { Card } from "@/styles/theme";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureSection>
        <FeatureRow>
          <FeatureCard>
            <h3>Mint Original Art</h3>
            <p>Create an NFT of your artwork and let others build on it.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Lineage Tracking</h3>
            <p>View generations of inspired child NFTs from original works.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>On-Chain Royalties</h3>
            <p>Automatically distribute rewards to original creators as new prints are minted.</p>
          </FeatureCard>
        </FeatureRow>
      </FeatureSection>
      <Footer />
    </>
  );
}

const FeatureSection = styled.section`
  background: #0B0B0B;
  padding: 80px 0;
  display: flex;
  justify-content: center;
`;

const FeatureRow = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  gap: 80px;

  @media (max-width: 1000px) {
    gap: 38px;
  }
`;

const FeatureCard = styled(Card)`
  flex: 1;
  min-width: 300px;
  max-width: 360px;
  text-align: left;

  box-shadow: ${({ theme }) => theme.glowGreen};

  &:hover {
    box-shadow: ${({ theme }) => theme.glowGreenHover};
  }
  `;
