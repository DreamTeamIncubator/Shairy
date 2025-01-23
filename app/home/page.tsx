import React from 'react';
import { Sidebar, sidebarItems } from '@/components/Sidebar/Sidebar';

const Home = () => {
  return (
    <div>
      <Sidebar elements={sidebarItems} />
      <h1>Home</h1>
    </div>
  );
};

export default Home;