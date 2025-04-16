import styled from 'styled-components';
import Footer from '@/components/LandingPage/Footer';

export default function MintPage() {
  return (
    <>
      <PageWrapper>
        <Header>
          <h1>Mint Your Original Art</h1>
          <p>Create a brand new NFT to start your digital art lineage.</p>
        </Header>

        <Content>
          
          <p>insert "form" here or something</p>
        </Content>
      </PageWrapper>
    </>
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
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;