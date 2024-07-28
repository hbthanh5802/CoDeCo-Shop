import React, { Fragment, useEffect, useId, useRef, useState } from 'react';
import { MenuExpand } from '@/components/Popper/Menu';
import { NavLink } from 'react-router-dom';

const subNavigationList = [
  {
    title: 'Phòng khách',
    to: '/shop/search',
    items: [
      {
        label: 'Ghế Sofa',
        value: 'Category Value',
        to: '/shop/search?categoryId=1',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
    ],
  },
  {
    title: 'Phòng ngủ',
    items: [
      {
        label: 'Bàn học',
        value: 'Category Value',
        to: '/shop/search?categoryId=3',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
    ],
  },
  {
    title: 'Phòng tắm',
    items: [
      {
        label: 'Bàn học',
        value: 'Category Value',
        to: '/shop/search?categoryId=3',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
    ],
  },
  {
    title: 'Bếp & Phòng ăn',
    items: [
      {
        label: 'Bàn học',
        value: 'Category Value',
        to: '/shop/search?categoryId=3',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
    ],
  },
  {
    title: 'Văn phòng làm việc',
    items: [
      {
        label: 'Bàn học',
        value: 'Category Value',
        to: '/shop/search?categoryId=3',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Ghế tự dài Arm Chair',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
      {
        label: 'Category label',
        value: 'Category Value',
        to: '/shop/search?categoryId=2',
      },
    ],
  },
  {
    title: 'Đồ trang trí',
  },
];

const SubNavigation = () => {
  const subNavId = useId();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showHeader && (
        <div className="SubNavigation-wrapper flex justify-center gap-8 duration-150 animate-[show-down_250ms_ease]">
          {subNavigationList.map((navigationItem, index) => (
            <MenuExpand
              key={`${subNavId}-${index}`}
              arrow={false}
              items={navigationItem.items}
              position="bottom-start"
            >
              <NavLink
                to={navigationItem.to || '#'}
                className={
                  'p-[8px] px-[12px] hover:bg-black/[.05] hover:font-medium rounded-lg'
                }
              >
                {navigationItem.title}
              </NavLink>
            </MenuExpand>
          ))}
        </div>
      )}
    </>
  );
};

export default SubNavigation;
