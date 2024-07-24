import React, { useId, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { hexToRgb } from '@/utils/colorConverter';

const RateStar = ({
  className,
  color = '#FFC107',
  rating = 1,
  maxStar = 5,
  size = 16,
  spacing = 0,
  editable = false,
  onChange = () => {},
}) => {
  const starId = useId();
  const [rateCount, setRateCount] = useState(rating);

  const handleEditStar = (value) => {
    if (editable) {
      setRateCount(value);
      onChange(value);
    }
  };

  return (
    <div
      style={{ gap: spacing }}
      className={`flex items-center gap-[${spacing}px] ${className}`}
    >
      {Array.from({ length: maxStar }).map((_, index) => {
        return (
          <span
            key={`${starId}-${index}`}
            className={`text-[${size.toString()}px] text-[${
              index + 1 <= rateCount ? color : `rgb(${hexToRgb(color)} / 25%)`
            }] ${editable && 'cursor-pointer'} duration-150`}
            onClick={() => handleEditStar(index + 1)}
          >
            <FaStar
              style={{
                fill:
                  index + 1 <= rateCount
                    ? color
                    : `rgb(${hexToRgb(color)} / 25%)`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
};

RateStar.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
  maxStar: PropTypes.number,
  size: PropTypes.number,
  spacing: PropTypes.number,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RateStar;
