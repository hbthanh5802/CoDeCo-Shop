import React from 'react';
import PropTypes from 'prop-types';

const Dot = ({
  x = '50%',
  y = '50%',
  position = 'top-right',
  content = 'Content',
}) => {
  let styles = {};
  switch (position) {
    case 'top-right':
      styles.top = '-125%';
      styles.left = '100%';
      styles.borderBottomLeftRadius = '0px';
      break;
    case 'bottom-right':
      styles.bottom = '-125%';
      styles.left = '100%';
      styles.borderTopLeftRadius = '0px';
      break;
    case 'top-left':
      styles.top = '-125%';
      styles.right = '100%';
      styles.borderBottomRightRadius = '0px';
      break;
    case 'bottom-left':
      styles.bottom = '-125%';
      styles.right = '100%';
      styles.borderTopRightRadius = '0px';
      break;
    default:
      break;
  }
  return (
    <div
      style={{
        top: `${x || '50%'}`,
        right: `${y || '50%'}`,
      }}
      className="flex group absolute justify-center items-center rounded-full w-10 h-10 border border-white/50 backdrop-blur-sm bg-white/20 animate-pulse hover:animate-none hover:bg-black/20 duration-150"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white z-50 group-hover:scale-75 duration-300"></div>
      <div
        style={styles}
        className="hidden group-hover:block absolute w-max px-6 py-3 border rounded-lg border-white/50 backdrop-blur-sm bg-white/20 text-white group-hover:bg-black/30 duration-150 animate-[fadeIn_1000ms_ease]"
      >
        {content}
      </div>
    </div>
  );
};

Dot.propTypes = {
  x: PropTypes.string,
  y: PropTypes.string,
  position: PropTypes.string,
};

export default Dot;
