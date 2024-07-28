import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ data }) => {
  const { title, to, bgUrl } = data;
  return (
    <Link
      to={to || '#'}
      className="group relative capitalize w-[300px] h-[130px] rounded-lg overflow-hidden duration-150"
    >
      <div className="overlay absolute z-10 w-full h-full top-0 bottom-0 left-0 right-0 bg-black/50 group-hover:bg-black/60 duration-300"></div>
      <img
        src={bgUrl}
        alt="Category Background"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />
      <h3 className="w-full p-3 text-white font-medium text-[18px] absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  duration-100">
        {title || 'Category Title'}
      </h3>
    </Link>
  );
};

CategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CategoryCard;
