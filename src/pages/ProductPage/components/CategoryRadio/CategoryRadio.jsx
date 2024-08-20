import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import CategoryRadioItem from './CategoryRadioItem';

const CategoryRadio = forwardRef(
  (
    {
      name,
      className,
      items = [],
      emptyContent = 'Trống',
      onChange = () => {},
    },
    ref
  ) => {
    const radioGroupRef = useRef(null);
    const radioItemRefs = useRef([]);
    const categoryItemId = useId();

    const handleChange = (value) => {
      const data = { name, ...value };
      onChange(data);
    };

    const handleReset = () => {
      if (radioItemRefs.current) {
        radioItemRefs.current.forEach((radioItem, index) => {
          radioItem.handleReset();
        });
      }
    };

    useImperativeHandle(ref, () => ({ handleReset, handleChange }));

    if (items.length === 0) return <div>{emptyContent}</div>;
    return (
      <div ref={radioGroupRef} className={`${className ? className : ''}`}>
        {items.map((item, index) => {
          const { label, value, disabled } = item;
          return (
            <CategoryRadioItem
              ref={(el) => (radioItemRefs.current[index] = el)}
              key={`${categoryItemId}-${index}`}
              name={name || categoryItemId}
              label={label}
              value={value}
              disabled={disabled}
              onClick={(value) => handleChange(value)}
            />
          );
        })}
      </div>
    );
  }
);

CategoryRadio.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  emptyContent: PropTypes.node,
};

export default CategoryRadio;
