import React from 'react';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

const DefaultLayout = ({ children }) => {
  return (
    <div className="DefaultLayout flex flex-col container w-full max-w-[1440px] relative">
      <Header />
      <div className="wrapper">{children}</div>
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
