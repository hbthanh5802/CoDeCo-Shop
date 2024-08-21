import React from 'react';

import { FcGoogle } from 'react-icons/fc';

const GoogleAuthO = () => {
  const handleLoginWithGoogle = () => {
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_AUTHORIZED_REDIRECT_URI } =
      import.meta.env;
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: VITE_GOOGLE_AUTHORIZED_REDIRECT_URI,
      client_id: VITE_GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    const qs = new URLSearchParams(options);
    window.location.href = `${rootUrl}?${qs.toString()}`;
  };

  return (
    <div className="w-full">
      <button
        className="flex gap-3 items-center justify-center px-6 py-3 text-base border border-slate-300 w-full rounded-lg hover:bg-slate-100 duration-150"
        onClick={handleLoginWithGoogle}
      >
        <FcGoogle className="w-5 h-5" />
        <p>Tiếp tục với Google</p>
      </button>
    </div>
  );
};

export default GoogleAuthO;
