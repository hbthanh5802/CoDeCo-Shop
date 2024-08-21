import React, {
  Fragment,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MenuExpand } from '@/components/Popper/Menu';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SubNavigation = () => {
  const subNavId = useId();
  const { categoryList } = useSelector((state) => state.shop);
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

  const subNavigationList = useMemo(() => {
    return categoryList
      .filter(
        (categoryItem, index) => categoryItem?.subCategoriesInfo?.length > 0
      )
      .map((categoryItem, index) => {
        const { subCategoriesInfo, name, categoryId } = categoryItem;
        return {
          title: name,
          to: '/shop/search?categoryId=' + categoryId,
          items: subCategoriesInfo.map((subCategoryItem, index) => {
            const { categoryId: subCategoryId, name: subCategoryName } =
              subCategoryItem;
            return {
              label: subCategoryName,
              value: subCategoryId,
              to: '/shop/search?categoryId=' + subCategoryId,
            };
          }),
        };
      });
  }, [categoryList]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showHeader && (
        <div className="SubNavigation-wrapper flex flex-wrap justify-center gap-x-8 gap-y-1 duration-150 animate-[show-down_250ms_ease]">
          {subNavigationList.map((navigationItem, index) => {
            return (
              <MenuExpand
                key={`${subNavId}-${index}`}
                arrow={false}
                items={navigationItem.items}
                position="bottom-start"
              >
                <NavLink
                  to={navigationItem.to || '#'}
                  className={
                    'duration-100 ease-in-out p-[8px] px-[12px] hover:bg-black/[.05] hover:font-medium rounded-lg'
                  }
                >
                  {navigationItem.title}
                </NavLink>
              </MenuExpand>
            );
          })}
          <NavLink
            to={'/shop/vouchers'}
            className={({ isActive }) => {
              return `duration-100 ease-linear p-[8px] px-[12px] hover:border-dashed hover:border-b-2 hover:border-[#3aa39f] hover:font-medium rounded-lg ${
                isActive
                  ? 'text-[#3aa39f] font-medium border-dashed border-b-2 border-b-[#3aa39f] bg-[#3aa39f]/[.1]'
                  : ''
              }`;
            }}
          >
            Vouchers
          </NavLink>
        </div>
      )}
    </>
  );
};

export default SubNavigation;
