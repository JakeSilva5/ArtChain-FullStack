import Link from 'next/link';
import styled from 'styled-components';

export default function CollectionPage() {
  return (
    <PageWrapper>
      <Header>
        <h1>My Collection</h1>
        <p>Your personal NFTs and inspired creations.</p>
      </Header>

      <Content>
        <Grid>
          {Array.from({ length: 6 }).map((_, index) => (
            <Link href={`/nft/${index + 101}`} passHref key={index} legacyBehavior>
              <Card>
                <ImagePlaceholder />
                <CardTitle>NFT #{index + 101}</CardTitle>
                <CardDescription>This NFT belongs to your wallet.</CardDescription>
              </Card>
            </Link>
          ))}
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
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.glowGreenHover};
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #444, #222);
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
