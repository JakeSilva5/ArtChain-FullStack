import styled from 'styled-components';

export const theme = {
  colors: {
    background: '#EDE8F5',
    primary: '#3D52A0',
    accent: '#7091E6',
    secondary: '#ADBBD4',
    softGlow: '#E0E7FF',
    purpleAccent: '#8860D0',
    card: 'rgba(255, 255, 255, 0.6)',
    text: '#0A0A0A',
    muted: '#4E4E4E',
    border: '#C1C8E4'
  },
  fonts: {
    heading: `'ClearviewHwy', 'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`
  },
  radius: '12px',
  shadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
};
  
  export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 25px;
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(76, 201, 240, 0.2);
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
  background: radial-gradient(ellipse at top left, rgba(136,96,208,0.05), transparent 70%);  
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

