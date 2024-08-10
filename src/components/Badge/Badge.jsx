import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ value = 0, children, bgColor = 'var(--color-primary)' }) => {
  return (
    <div className={`relative`}>
      <div
        className={`absolute flex justify-center items-center text-white text-[14px] px-[6px] py-[2px] leading-[1.2] rounded-xl left-[50%] -top-2 bg-[${bgColor}]`}
      >
        {value}
      </div>
      {children}
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
};

export default Badge;
