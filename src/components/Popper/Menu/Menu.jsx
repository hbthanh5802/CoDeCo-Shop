import React, { useId } from 'react';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import PopperWrapper from '../PopperWrapper';
import MenuItem from './MenuItem';

const Menu = ({
  trigger = 'mouseenter',
  position = 'bottom-end',
  arrow = true,
  arrowPosition = 'top-right',
  children,
  items = [],
  onClick = () => {},
}) => {
  const menuId = useId();

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <MenuItem key={`${menuId}-${index}`} data={item} onClick={onClick} />
      );
    });
  };

  const handleRenderResult = (attrs) => (
    <div tabIndex="-1" {...attrs}>
      <PopperWrapper arrow={arrow} arrowPosition={arrowPosition}>
        {renderItems()}
      </PopperWrapper>
    </div>
  );

  return (
    <HeadlessTippy
      placement={position}
      interactive
      trigger={trigger}
      appendTo={document.body}
      render={handleRenderResult}
    >
      {children}
    </HeadlessTippy>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  placement: PropTypes.string,
  trigger: PropTypes.string,
};

export default Menu;
