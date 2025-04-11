import React from 'react';
import Link  from 'next/link';
import { IoMdHome } from 'react-icons/io';

const Home = () => {
  return (
    <Square href="/dashboard">
      <IoMdHome />
    </Square>
  );
};

export default Home;
