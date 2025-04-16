import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <Nav>
      <LeftSection>
        <Logo onClick={() => router.push('/')}>ArtChain</Logo>
      </LeftSection>

      <CenterSection>
        <NavLink href="/mint">Mint</NavLink>
        <NavLink href="/gallery">Gallery</NavLink>
        <NavLink href="/collection">My Collection</NavLink>
      </CenterSection>

      <RightSection>
        {/* Wallet connect logic goes here */}
        <Button onClick={() => alert("Wallet Connect Coming Soon")}>
          Connect Wallet
        </Button>
      </RightSection>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 40px;
  min-width: 300px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  min-width: 130px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.purpleAccent};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.purpleAccent};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;
