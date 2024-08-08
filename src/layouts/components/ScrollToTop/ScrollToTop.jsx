import useScrollToTop from '@/hooks/useScrollToTop';
import React, { useEffect, useState } from 'react';
import { IoArrowUpOutline } from 'react-icons/io5';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const doc = document.documentElement;
  useScrollToTop();

  const toggleVisibility = () => {
    const scrollDistance = doc.scrollHeight - doc.clientHeight;
    if (window.scrollY > scrollDistance / 3) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed z-[9999] bottom-6 right-6">
      {visible && (
        <div className="flex flex-col justify-center items-center gap-2">
          <button
            className="group flex justify-center items-center outline-none size-[50px] rounded-full bg-black hover:bg-[var(--color-primary)] duration-150 shadow-xl animate-[shift-away_250ms_ease]"
            onClick={scrollToTop}
          >
            <IoArrowUpOutline className="text-white text-[24px] duration-150 group-hover:-translate-y-2" />
          </button>
          <span className="animate-fadeIn px-[8px] py-[4px] bg-white rounded-lg shadow-xl">
            Back to Top
          </span>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
