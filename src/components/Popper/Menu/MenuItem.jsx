import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItem = ({ data, onClick }) => {
  const { label, value, to, leftIcon } = data;
  const Tag = to ? Link : 'div';
  return (
    <Tag
      onClick={() => onClick(value)}
      to={to}
      className={`MenuItem relative flex items-center space-x-2 text-lg px-3 py-2 ${
        !!leftIcon && 'pr-3'
      } cursor-pointer hover:bg-[#ccc]/40 rounded-lg duration-300 min-w-full`}
    >
      {leftIcon && <span className="text-[18px]">{leftIcon}</span>}
      <span>{label}</span>
    </Tag>
  );
};

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
