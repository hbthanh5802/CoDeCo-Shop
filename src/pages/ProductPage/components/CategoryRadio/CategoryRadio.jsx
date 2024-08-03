import React, { useId } from 'react';
import PropTypes from 'prop-types';
import CategoryRadioItem from './CategoryRadioItem';

const CategoryRadio = ({
  name,
  className,
  items = [],
  onChange = () => {},
}) => {
  const categoryItemId = useId();

  const handleChange = (value) => {
    const data = { name, ...value };
    onChange(data);
  };

  if (items.length === 0) return <div>Nothing in Radio Box</div>;
  return (
    <div className={`${className ? className : ''}`}>
      {items.map((item, index) => {
        const { label, value, disabled } = item;
        return (
          <CategoryRadioItem
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
};

CategoryRadio.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default CategoryRadio;
