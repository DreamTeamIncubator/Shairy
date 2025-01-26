import React from 'react';
import { Sidebar, sidebarItems } from '@/components/Sidebar/Sidebar';

const Create = () => {
  return (
    <div>
      <Sidebar elements={sidebarItems} />
      <h1>Create</h1>
    </div>
  );
};

export default Create;
