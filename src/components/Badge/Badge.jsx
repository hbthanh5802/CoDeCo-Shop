import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ value = 0, children, bgColor = 'var(--color-primary)' }) => {
  return (
    <div className={`relative`}>
      <span
        className={`absolute flex justify-center items-center text-white text-[10px] leading-none px-[3px] py-[1px] rounded-xl left-[50%] -top-1 bg-[${bgColor}]`}
      >
        {value}
      </span>
      {children}
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
};

export default Badge;
