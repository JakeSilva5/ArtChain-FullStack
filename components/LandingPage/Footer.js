import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <Text>
          Developed by <Bold>Jake Silva</Bold> | CMPSC 263 Project
        </Text>
        <Text>© {new Date().getFullYear()} CMPSC 263</Text>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.softGlow};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 20px 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
`;

const Bold = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;