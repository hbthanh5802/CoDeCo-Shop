import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

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
    <div className="DefaultLayout flex flex-col items-center flex-wrap container w-full max-w-[1440px] relative">
      <div
        className={`w-full flex justify-center z-[999] ${
          pathname === '/'
            ? 'absolute top-0 left-0'
            : 'bg-white shadow-sm fixed top-0 left-0'
        } transition-all duration-150`}
      >
        <Header ref={headerRef} />
      </div>
      <div ref={bodyRef} className="Body-wrapper w-full">
        {children}
      </div>
      <div className="mt-[120px] lg:mt-0 w-full">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
