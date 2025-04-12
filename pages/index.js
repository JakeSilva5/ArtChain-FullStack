import Hero from "@/components/LandingPage/Hero";
import Footer from "@/components/LandingPage/Footer";
import { Card, PageContainer } from "@/styles/theme";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Hero />
      <PageContainer>
        <Card>
          <h3>Mint Original Art</h3>
          <p>Create an NFT of your artwork and let others build on it.</p>
        </Card>
        <Card>
          <h3>Lineage Tracking</h3>
          <p>View generations of inspired child NFTs from original works.</p>
        </Card>
        <Card>
          <h3>On-Chain Royalties</h3>
          <p>Automatically distribute rewards to original creators as new prints are minted.</p>
        </Card>
      </PageContainer>
      <Footer />
    </>
  );
}
