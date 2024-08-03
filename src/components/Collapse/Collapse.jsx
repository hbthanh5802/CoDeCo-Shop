import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';

import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

const Collapse = ({
  label,
  className,
  children,
  defaultChecked = true,
  onChange,
}) => {
  const collapseId = useId();
  const [checked, setChecked] = useState(defaultChecked);

  const handleCollapseChange = (e) => {
    setChecked(!checked);
    if (onChange) onChange(!checked);
  };

  return (
    <div className={`group/collapse w-full ${className ? className : ''}`}>
      <label
        htmlFor={collapseId}
        className={`capitalize select-none flex justify-between items-center px-[16px] py-[8px] bg-[#D9D9D9] rounded-[4px] duration-150 cursor-pointer ${
          checked ? 'font-medium text-[var(--color-primary)] bg-[#f7f7f7]' : ''
        }`}
      >
        <span className="text-[16px]">{label}</span>
        <AiOutlineMinus
          className={`text-[18px] justify-center items-center ${
            checked ? 'flex' : 'hidden'
          }`}
        />
        <AiOutlinePlus
          className={`text-[18px] justify-center items-center ${
            checked ? 'hidden' : 'flex'
          }`}
        />
      </label>
      <input
        type="checkbox"
        name={collapseId}
        id={collapseId}
        className="peer"
        hidden
        onChange={handleCollapseChange}
        checked={checked}
      />
      <div className="w-full max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-[1000vh] ease-in-out px-[16px]">
        {children}
      </div>
    </div>
  );
};

Collapse.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
};

export default Collapse;
