import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

const DefaultLayout = ({ children }) => {
  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (headerRef.current && bodyRef.current) {
      const headerHeight = headerRef.current.getHeight();
      bodyRef.current.style.marginTop =
        pathname !== '/' ? headerHeight + 'px' : '0px';
    }
  });

  return (
    <div className="DefaultLayout flex flex-col container w-full max-w-[1440px] relative">
      <Header ref={headerRef} />
      <div ref={bodyRef} className="wrapper">
        {children}
      </div>
      <div className="mt-[120px]">
        <Footer />
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
