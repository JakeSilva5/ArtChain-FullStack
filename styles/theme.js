import styled from 'styled-components';

export const theme = {
  colors: {
    background: '#0B0B0B',
    primary: '#4CC9F0',
    accent: '#8AFF80',
    secondary: '#FF4D6D',
    softGlow: '#1A1A1A',
    card: '#121212',
    text: '#FFFFFF',
    muted: '#CCCCCC',
    border: '#222222',

    electricCyan: '#00F0FF',
    cyan: '#00F0FF',
    lime: '#32FF7E',   
  },
  fonts: {
    heading: `'Segoe UI', 'Helvetica Neue', sans-serif`,
    body: `'Montserrat', sans-serif`
  },
  radius: '12px',
  shadow: '0 6px 18px rgba(76, 201, 240, 0.2)',
  glowCyan: '0 0 12px #00F0FF',
  glowLime: '0 0 12px #32FF7E',
  glowLimeHover: '0 0 16px #32FF7E',

  glowGreen: '0 0 20px rgba(0, 255, 115, 0.35)',
  glowGreenHover: '0 0 25px rgba(0, 255, 115, 0.6)',
       
};

  
  export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 25px;
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 18px rgba(138, 255, 128, 0.12);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 22px rgba(138, 255, 128, 0.2);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    opacity: 0.85;
  }
`;

export const ButtonPrimary = styled.button`
  background: ${({ theme }) => theme.colors.purpleAccent};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #3BA6D2;
  }
`;

export const PageContainer = styled.div`
  background: #0B0B0B;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;