import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAddress, useConnect, metamaskWallet } from '@thirdweb-dev/react';

const Navbar = () => {
  const router = useRouter();
  const address = useAddress();
  const connect = useConnect();

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
        {address ? (
          <ConnectedWallet>Connected: {address.slice(0, 6)}...{address.slice(-4)}</ConnectedWallet>
        ) : (
          <Button onClick={() => connect(metamaskWallet())}>
            Connect Wallet
          </Button>
        )}
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
  height: 75px;
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
  gap: 50px;
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
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 0 6px rgba(0, 240, 255, 0.6);
  cursor: pointer;
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 500;
  transition: color 0.3s ease;

  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.28);

  &:hover {
    color: ${({ theme }) => theme.colors.purpleAccent};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.radius};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    color: white;
    box-shadow: 0 0 14px ${({ theme }) => theme.colors.primary};
  }
`;

const ConnectedTag = styled.div`
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radius};
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ConnectedWallet = styled.div`
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.body};
  background: #000;
  border-radius: ${({ theme }) => theme.radius};
  padding: 10px 18px;
  box-shadow: 0 0 12px ${({ theme }) => theme.colors.primary};
`;