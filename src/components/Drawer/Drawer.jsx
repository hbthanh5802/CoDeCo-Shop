import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

import './Drawer.scss';

const Drawer = ({
  className,
  rootClassName,
  isOpen,
  onClose,
  position,
  children,
}) => {
  return ReactDOM.createPortal(
    <div
      className={`drawer-container ${
        isOpen ? 'active' : ''
      } z-[999] fixed inset-0 bg-black/50 animate-fadeIn duration-300 transition-all ${
        rootClassName ? rootClassName : ''
      }`}
      onClick={onClose}
    >
      <div
        className={`drawer-wrapper shadow-xl relative ${
          position ? 'position-' + position : 'position-right'
        } p-3 bg-white ${className ? className : ''}`}
      >
        <button
          className="absolute right-0 top-0 m-[12px] duration-200 flex items-center p-[2px] rounded-full border border-[#f7f7f7] hover:bg-red-100 hover:text-red-700"
          onClick={onClose}
        >
          <IoClose className="flex text-[24px]" />
        </button>
        <div onClick={(e) => e.stopPropagation()} className="mt-[32px]">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('drawer-root')
  );
};

Drawer.propTypes = {
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  position: PropTypes.string,
};

export default Drawer;
