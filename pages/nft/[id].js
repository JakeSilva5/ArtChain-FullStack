import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import ABI from '@/contracts/abi/ArtChainNFT.json';
import { ARTCHAINNFT_CONTRACT_ADDRESS } from '@/contracts/constants/contractAddresses';

export default function NftDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [nft, setNft] = useState(null);

  useEffect(() => {
    const fetchNFT = async () => {
      if (!id) return;
      
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
        const contract = new ethers.Contract(ARTCHAINNFT_CONTRACT_ADDRESS, ABI, provider);

        const [tokenUri, owner, parentId] = await Promise.all([
          contract.tokenURI(id),
          contract.ownerOf(id),
          contract.parentOf(id)
        ]);

        const ipfsGatewayUrl = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const metadataResponse = await fetch(ipfsGatewayUrl);
        const metadata = await metadataResponse.json();

        setNft({
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          owner,
          parentId: parentId.toString()
        });

      } catch (error) {
        console.error("Failed to fetch NFT metadata:", error);
      }
    };

    fetchNFT();
  }, [id]);

  return (
    <PageWrapper>
      <FixedBackButton onClick={() => router.push('/gallery')}>
        ← Back to Gallery
      </FixedBackButton>

      <Content>
        <ImageSection>
          {nft ? (
            <NftImage src={nft.image} alt={nft.name} />
          ) : (
            <Placeholder />
          )}
        </ImageSection>

        <InfoSection>
          {nft ? (
            <>
              <h1>{nft.name}</h1>
              <p>{nft.description}</p>

              <Divider />

              <h3>Attributes</h3>
              <ul>
                <li>Owner: {nft.owner}</li>
                {nft.parentId !== "0" && (
                  <li>Inspired by: NFT #{nft.parentId}</li>
                )}
                <li>Chain: TBNB</li>
                <li>License: CC0</li>
              </ul>
            </>
          ) : (
            <h1>Loading NFT...</h1>
          )}
        </InfoSection>
      </Content>
    </PageWrapper>
  );
}

const NftImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.glowGreen};
`;

const Placeholder = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #444, #222);
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.glowGreen};
`;

const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding: 80px 20px;
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 300px;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.colors.muted};
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.muted};
    }
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 30px 0;
`;

const FixedBackButton = styled.button`
  position: fixed;
  top: 100px;
  left: 30px;
  z-index: 999;
  background: black;
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: black;
    box-shadow: 0 0 14px ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    top: 80px;
    left: 20px;
    font-size: 0.85rem;
    padding: 8px 14px;
  }
`;