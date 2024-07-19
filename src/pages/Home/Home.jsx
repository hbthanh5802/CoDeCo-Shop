import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return <div>{JSON.stringify(currentUser)}</div>;
};

export default Home;
