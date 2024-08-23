import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';

const Segmented = ({ items = [], onChange = () => {}, className }) => {
  const segmentedId = useId();
  const [selectedIndex, setSelectedIndex] = useState(`${segmentedId}-0`);
  const handleSegmentedChange = (item) => {
    const { value, disable, dataIndex } = item;
    if (!disable) {
      setSelectedIndex(dataIndex);
      onChange(value);
    }
  };

  return (
    <div
      className={`inline-flex flex-wrap justify-center p-[6px] bg-[#EEEEEE] rounded-full ${className}`}
    >
      {items.map((item, index) => {
        const { label, disable } = item;
        const dataIndex = `${segmentedId}-${index}`;
        return (
          <span
            key={dataIndex}
            data-index={dataIndex}
            data-disable={disable}
            className={`inline-block text-[18px] px-[12px] py-[4px] rounded-full cursor-pointer select-none data-[disable='true']:bg-transparent data-[disable='true']:cursor-not-allowed data-[disable='true']:text-black/30 ${
              selectedIndex === dataIndex && 'bg-white'
            } duration-300`}
            onClick={() => handleSegmentedChange({ dataIndex, ...item })}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

Segmented.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default Segmented;
