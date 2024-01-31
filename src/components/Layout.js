// Layout.js

import React from 'react';
import Header from '../consts/Header'; 
import Footer from '../consts/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}      
      <Footer/>
    </>
  );
};

export default Layout;