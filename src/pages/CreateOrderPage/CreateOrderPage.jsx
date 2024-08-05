import React from 'react';
import { useLocation } from 'react-router-dom';

const CreateOrderPage = () => {
  const { orderInformation } = useLocation().state;
  console.log('orderInformation', orderInformation);
  return <div>{JSON.stringify(orderInformation)}</div>;
};

export default CreateOrderPage;
