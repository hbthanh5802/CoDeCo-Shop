import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItem = ({ data, onClick, active = false }) => {
  const { label, value, id, to, leftIcon } = data;
  const Tag = to ? Link : 'div';

  const handleMenuItemClick = () => {
    if (onClick && !active) {
      onClick({ id, label, value });
    }
  };

  return (
    <Tag
      onClick={handleMenuItemClick}
      to={to}
      className={`MenuItem relative flex items-center space-x-2 text-lg px-3 py-2 ${
        !!leftIcon && 'pr-3'
      } cursor-pointer ${
        active ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-[#ccc]/40'
      }  rounded-lg duration-150 min-w-full select-none`}
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
