import Link from 'next/link';
import styled from 'styled-components';
import { useAddress } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ABI from '@/contracts/abi/ArtChainNFT.json';
import { ARTCHAINNFT_CONTRACT_ADDRESS } from '@/contracts/constants/contractAddresses';

export default function CollectionPage() {
  const address = useAddress();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) return;

      try {
        const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
        const contract = new ethers.Contract(ARTCHAINNFT_CONTRACT_ADDRESS, ABI, provider);

        let results = [];
        let tokenId = 0;
        while (true) {
          try {
            const owner = await contract.ownerOf(tokenId);
            if (owner.toLowerCase() === address.toLowerCase()) {
              const tokenUri = await contract.tokenURI(tokenId);
              const ipfsGatewayUrl = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
              const metadataResponse = await fetch(ipfsGatewayUrl);
              const metadata = await metadataResponse.json();

              results.push({
                tokenId,
                name: metadata.name,
                image: metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
              });
            }
            tokenId++;
          } catch (error) {
            break; // No more tokens
          }
        }

        setNfts(results);
      } catch (error) {
        console.error("Failed to fetch user NFTs:", error);
      }
    };

    fetchNFTs();
  }, [address]);

  return (
    <PageWrapper>
      <Header>
        <h1>My Collection</h1>
        <p>Your personal NFTs and inspired creations.</p>
      </Header>

      <Content>
        <Grid>
          {nfts.length > 0 ? (
            nfts.map((nft) => (
              <Link key={nft.tokenId} href={`/nft/${nft.tokenId}`} passHref>
                <Card>
                  <NFTImage src={nft.image} alt={nft.name} />
                  <CardTitle>{nft.name}</CardTitle>
                  <CardDescription>Your minted NFT</CardDescription>
                </Card>
              </Link>
            ))
          ) : (
            <EmptyMessage>You don't own any NFTs yet!</EmptyMessage>
          )}
        </Grid>
      </Content>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 80vh;
  padding: 60px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 2.8rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 16px;
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const Card = styled.a`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.glowGreen};
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.glowGreenHover};
  }
`;

const NFTImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius};
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 40px;
`;