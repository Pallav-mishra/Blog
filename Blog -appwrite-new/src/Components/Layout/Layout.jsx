import Navbar from '../Navbar/Navbar';
import React from 'react';
import Footer from '../Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />

      <div className="content">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

