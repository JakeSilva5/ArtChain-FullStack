import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function NftDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PageWrapper>
      <FixedBackButton onClick={() => router.push('/gallery')}>
        ← Back to Gallery
      </FixedBackButton>
      <Content>
        <ImageSection>
          <NftImage />
        </ImageSection>

        <InfoSection>
          <h1>NFT #{id}</h1>
          <p>Detailed view of NFT #{id}. Here I will display metadata, ownership history, and such</p>

          <Divider />

          <h3>Attributes</h3>
          <ul>
            <li>Creator: 0x1234...abcd</li>
            <li>Minted On: April 2025</li>
            <li>Chain: TBNB</li>
            <li>License: CC0</li>
          </ul>
        </InfoSection>
      </Content>
    </PageWrapper>
  );
}

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

const NftImage = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #444, #222);
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.glowGreen};
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
