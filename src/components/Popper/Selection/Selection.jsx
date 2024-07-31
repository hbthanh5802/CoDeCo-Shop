import React, { useId, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import MenuItem from '../components/MenuItem';
import PopperWrapper from '../PopperWrapper';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';

const Selection = ({
  className,
  width = 120,
  position = 'bottom-end',
  arrow = false,
  arrowPosition = 'top-right',
  label,
  items = [],
  onChange = () => {},
  onReset = () => {},
}) => {
  const selectionId = useId();
  const tippyRef = useRef(null);
  const [currentLabel, setCurrentLabel] = useState(label);
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);

  const currentItemList = useMemo(() => {
    return items.map((item, index) => {
      item.id = index;
      return item;
    });
  }, [items]);

  const handleSelectionChange = (menuItemData) => {
    const { label, value, id } = menuItemData;
    setOpen(false);
    setCurrentLabel(label);
    setSelectedId(id);
    onChange(value);
    if (tippyRef.current) tippyRef.current._tippy.hide();
  };

  const renderItems = () => {
    return currentItemList.map((item, index) => {
      return (
        <MenuItem
          key={`${selectionId}-${index}`}
          active={index === selectedId}
          data={item}
          onClick={(value) => handleSelectionChange(value)}
        />
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

  const handleReset = () => {
    setOpen(false);
    setSelectedId(null);
    setCurrentLabel(label);
    onChange(undefined);
    onReset();
  };

  if (items.length === 0) return <>{children}</>;

  return (
    <>
      <HeadlessTippy
        trigger="click"
        hideOnClick={true}
        placement={position}
        interactive
        appendTo={document.body}
        render={handleRenderResult}
        onShow={({ popper, reference }) => {
          popper.style.width = reference.getBoundingClientRect().width + 'px';
        }}
        onMount={({ popper }) => (tippyRef.current = popper)}
        onShown={({ popper }) => setOpen(true)}
        onHide={() => setOpen(false)}
      >
        <div
          style={{ minWidth: width }}
          className={`px-[16px] py-[8px] flex justify-between items-center gap-6 bg-[#EEEEEE] border border-[#ccc] cursor-pointer max-w-fit rounded-[4px] select-none ${
            className ? className : ''
          }`}
        >
          <span onClick={() => setOpen(!open)}>{currentLabel}</span>
          {/* <span className="invisible">{label}</span> */}
          {open ? (
            <span
              className="hover:text-[var(--color-primary)] duration-100"
              onClick={handleReset}
            >
              <IoIosCloseCircle />
            </span>
          ) : (
            <span onClick={() => setOpen(!open)}>
              <IoIosArrowDown />
            </span>
          )}
        </div>
      </HeadlessTippy>
    </>
  );
};

Selection.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  trigger: PropTypes.string,
  position: PropTypes.string,
  arrow: PropTypes.bool,
  arrowPosition: PropTypes.string,
  label: PropTypes.string.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default Selection;
