import React from 'react';
import { Link } from 'react-router-dom';

import './SuccessView.scss';

const SuccessView = ({ children, to, title = 'Thành Công' }) => {
  return (
    <div className="form-container bg-white px-14 py-16 rounded-lg space-y-6 max-w-[600px] min-w-[600px] border">
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <h1 className="font-semibold text-slate-900 text-[24px] text-center capitalize">
        {title}
      </h1>
      {children}
      <Link
        to={to || '/'}
        className="flex space-x-2 justify-center items-center text-sm border rounded-lg w-full h-[58px] bg-slate-900 text-white hover:bg-[var(--color-primary)] font-medium uppercase duration-150"
      >
        <span>Trở về</span>
      </Link>
    </div>
  );
};

export default SuccessView;
