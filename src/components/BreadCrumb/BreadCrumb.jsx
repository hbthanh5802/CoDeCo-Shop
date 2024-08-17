import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ items }) => {
  const breadcrumbId = useId();

  const renderBreadcrumbs = () => {
    const length = items.length;
    let breadcrumbs = [];
    for (let i = 0; i < length - 1; i++) {
      const { label, to } = items[i];
      breadcrumbs.push(
        <h3 key={`${breadcrumbId}-${i}`}>
          <Link
            to={to || '/shop'}
            className="text-[14px] text-[#ccc] hover:text-[var(--color-primary)] hover:underline duration-100"
          >
            {label || 'breadcrumb'}
          </Link>
          <span className="mx-3">/</span>
        </h3>
      );
    }

    breadcrumbs.push(
      <h3 key={`${breadcrumbId}-${length - 1}`} className="text-[14px]">
        {items[length - 1]?.label || 'breadcrumb'}
      </h3>
    );

    return breadcrumbs;
  };

  if (!items?.length) return <></>;
  return (
    <div className="flex items-center text-[14px]">{renderBreadcrumbs()}</div>
  );
};

BreadCrumb.propTypes = {
  items: PropTypes.array,
};

export default BreadCrumb;
