import React from 'react';
import Header from '../components/Header';

const DefaultLayout = () => {
  return (
    <div className="DefaultLayout flex flex-col items-center mx-auto">
      <Header />
      <div className="wrapper">Body</div>
    </div>
  );
};

export default DefaultLayout;
