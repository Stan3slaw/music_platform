import React from 'react';
import AudioPlayer from '../components/AudioPlayer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  hideSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideSidebar }) => {
  return (
    <>
      <Navbar />
      <div className='wrapper'>
        {hideSidebar ? '' : <Sidebar />}
        <div className='content'>{children}</div>
      </div>
      <AudioPlayer />
    </>
  );
};

export default MainLayout;
