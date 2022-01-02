import React from 'react';
import Footer from './Footer';
import Header from './Header';
import List from './Conference';
import MobileView from './mobile';

/**
 * Live Video/Audio component
 */
const Live = () => {
  return (
    <div className="flex justify-center items-center relative flex-col md:h-full">
      <Header />
      <MobileView />
      <List />
      <Footer />
    </div>
  );
};

export default Live;
