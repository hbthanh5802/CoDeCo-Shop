import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Selection from '../Popper/Selection';

const pageSizeList = [
  { label: '15 / trang', value: 15 },
  { label: '25 / trang', value: 25 },
  { label: '50 / trang', value: 50 },
  { label: '100 / trang', value: 100 },
];

const Pagination = ({
  total = 0,
  initialPageSize = 0,
  onChange = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const totalPages = Math.ceil(total / pageSize);

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const goToPreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handlePaginationChange = () => {
    onChange({
      total,
      currentPage,
      pageSize,
      totalPages,
      hasPrevious,
      hasNext,
    });
  };

  useEffect(() => handlePaginationChange(), [currentPage, pageSize]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const ellipsis = '...';

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      const leftEllipsis = currentPage > 3;
      const rightEllipsis = currentPage < totalPages - 2;

      if (leftEllipsis) {
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(renderPageButton(2));
        pageNumbers.push(renderEllipsis());
      }

      const startPage = leftEllipsis ? currentPage - 1 : 1;
      const endPage = rightEllipsis ? currentPage + 1 : totalPages;

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (rightEllipsis) {
        pageNumbers.push(renderEllipsis());
        pageNumbers.push(renderPageButton(totalPages - 1));
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (page) => (
    <button
      key={page}
      onClick={() => goToPage(page)}
      className={`hidden md:block px-6 py-2 border ${
        page === currentPage
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-white text-black'
      }`}
    >
      {page}
    </button>
  );

  const renderEllipsis = () => (
    <span key={Math.random()} className="px-4 py-2">
      ...
    </span>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex items-center space-x-0">
        <button
          onClick={goToPreviousPage}
          disabled={!hasPrevious}
          className={`px-6 py-2 border rounded-l-[4px] ${
            hasPrevious
              ? 'bg-white text-black hover:bg-[var(--color-primary)] hover:text-white'
              : 'bg-gray-200 text-gray-500'
          } duration-100`}
        >
          Trang trước
        </button>
        {renderPageNumbers()}
        <button
          onClick={goToNextPage}
          disabled={!hasNext}
          className={`px-6 py-2 border rounded-r-[4px] ${
            hasNext
              ? 'bg-white text-black hover:bg-[var(--color-primary)] hover:text-white'
              : 'bg-gray-200 text-gray-500'
          } duration-100`}
        >
          Trang kế tiếp
        </button>
      </div>
      <Selection
        label="Giới hạn hiển thị"
        items={pageSizeList}
        onChange={(value) => setPageSize(value)}
        onReset={() => setPageSize(initialPageSize)}
        className="bg-white"
      />
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number,
  initialPageSize: PropTypes.number,
};

export default Pagination;
