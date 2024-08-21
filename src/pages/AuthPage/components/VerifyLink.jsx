import Spinner from '@/components/Spinner';
import { serializeSearchParams } from '@/utils/url';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyLink = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { params } = serializeSearchParams(search);
    if (params && pathname === '/verify') {
      navigate('/auth/register', {
        state: {
          pass_process: 3,
          is_verify_link: true,
          verify_token: params,
        },
      });
    }
  }, [search, pathname]);

  return (
    <div className="w-full h-screen flex flex-col gap-6 items-center justify-center">
      <Spinner size={24} color="black" />
      <p>Vui lòng chờ...</p>
    </div>
  );
};

export default VerifyLink;
