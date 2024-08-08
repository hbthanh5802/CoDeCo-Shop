import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './SuccessView.scss';

const SuccessView = ({
  className,
  children,
  to,
  title = 'Thành Công',
  buttonLabel,
  disabled = false,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(to || '/');
  };

  return (
    <div
      className={`form-container bg-white px-14 py-16 rounded-lg space-y-6 max-w-[600px] min-w-[600px] border ${
        className ? className : ''
      }`}
    >
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
      <button
        className="flex space-x-2 justify-center items-center text-sm border rounded-lg w-full h-[58px] bg-slate-900 text-white hover:bg-[var(--color-primary)] font-medium uppercase duration-150 disabled:bg-[#f7f7f7] disabled:text-[#ccc] disabled:cursor-not-allowed"
        disabled={disabled}
        onClick={handleButtonClick}
      >
        <span>{buttonLabel || 'Tiếp tục'}</span>
      </button>
    </div>
  );
};

SuccessView.propTypes = {
  className: PropTypes.string,
  buttonLabel: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SuccessView;
