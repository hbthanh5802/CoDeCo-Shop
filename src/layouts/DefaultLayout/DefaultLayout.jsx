import React from 'react';
import Header from '../components/Header';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => {
  return (
    <div className="DefaultLayout flex flex-col items-center mx-auto">
      <Header />
      <div className="wrapper">{children}</div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
