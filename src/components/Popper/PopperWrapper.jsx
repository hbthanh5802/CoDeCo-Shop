import React from 'react';
import PropTypes from 'prop-types';

const PopperWrapper = ({
  arrow = true,
  arrowPosition = 'top-right',
  children,
}) => {
  let arrowStyles = '';
  switch (arrowPosition) {
    case 'top-right':
      arrowStyles = '-top-[18px] right-[20px]';
      break;
    case 'top-center':
      arrowStyles = '-top-[18px] left-1/2 -translate-y-1/2';
      break;
    case 'top-left':
      arrowStyles = '-top-[18px] left-[20px]';
      break;
    default:
      break;
  }

  return (
    <div className="relative flex flex-col items-start p-2 bg-white backdrop-blur-sm rounded-2xl shadow-lg shadow-black min-w-[120px] border border-white animate-[shift-away_300ms_ease]">
      {arrow && (
        <div
          className={`absolute w-0 h-0 border-[10px] border-l-transparent border-r-transparent border-t-transparent border-b-white rounded-sm ${arrowStyles}`}
        ></div>
      )}
      {children}
    </div>
  );
};

PopperWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PopperWrapper;
