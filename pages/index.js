import Hero from "@/components/LandingPage/Hero";
import { styled } from 'styled-components';
import Footer from "@/components/LandingPage/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureSection>
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
      </FeatureSection>

      <Footer />
    </>
  );
}

const FeatureSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px; 
  margin-top: 80px; 
  margin-bottom: 80px; 
  padding: 0 10%; 
`;

const FeatureCard = styled.div`
  flex: 1 1 280px; 
  max-width: 250px; 
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: white;

  h3 {
    margin-bottom: 12px;
    font-size: 1.3rem;
  }

  p {
    font-size: 1rem;
    opacity: 0.85;
  }
`;
