import React, { useId } from 'react';
import { Link } from 'react-router-dom';

import { BiLogoFacebookSquare } from 'react-icons/bi';
import { RiInstagramFill } from 'react-icons/ri';

const navigationFooterList = [
  {
    title: 'Cửa hàng',
    links: [
      { label: 'Giới thiệu về chúng tôi', to: '#' },
      { label: 'Tuyển dụng', to: '#' },
      { label: 'Vị trí chi nhánh', to: '#' },
      { label: 'Các bài đánh giá', to: '#' },
    ],
  },
  {
    title: 'Nội thất',
    links: [
      { label: 'Phòng khách', to: '#' },
      { label: 'Phòng ngủ', to: '#' },
      { label: 'Phòng tắm', to: '#' },
      { label: 'Bếp và phòng ăn', to: '#' },
      { label: 'Văn phòng làm việc', to: '#' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'FAQs', to: '#' },
      { label: 'Liên hệ', to: '#' },
      { label: 'Giao hàng', to: '#' },
      { label: 'Hoàn tiền', to: '#' },
    ],
  },
  {
    title: 'Social Media',
    links: [
      { label: 'Facebook', to: '#', icon: <BiLogoFacebookSquare /> },
      { label: 'Instagram', to: '#', icon: <RiInstagramFill /> },
    ],
  },
];

const Footer = () => {
  const linkId = useId();

  return (
    <div className="bg-[#f7f7f7] px-[80px] pt-[120px] pb-[60px]">
      <div className="flex flex-col md:flex-row gap-[48px] justify-between">
        <div className="md:w-[350px] space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-bold text-[28px]">CoDeCo</h1>
          <p className="font-normal text-base">
            Đem lại trải nghiệm dịch vụ chuyên nghiệp cùng tiện ích đẳng cấp,
            mang đến cho bạn một không gian làm việc thoải mái.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start md:flex-row space-y-[42px] md:space-x-[42px] md:space-y-0">
          {navigationFooterList.map((listItem, index) => {
            return (
              <div
                key={`${linkId}-${index}`}
                className="space-y-6 w-[150px] flex flex-col items-center md:items-start text-center md:text-left"
              >
                <h2 className="font-medium text-[18px] text-[var(--color-primary)]">
                  {listItem.title}
                </h2>
                <ul className="list-none space-y-[12px] text-[14px] flex flex-col items-center md:items-start">
                  {listItem.links.map((linkItem, index) => (
                    <li key={`${linkId}-link-${index}`}>
                      <Link
                        to={linkItem || '#'}
                        className="flex space-x-2 items-center hover:text-[var(--color-primary)] hover:underline hover:underline-offset-4"
                      >
                        {linkItem.icon && (
                          <span className="text-[18px]">{linkItem.icon}</span>
                        )}
                        <span>{linkItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-[14px] mt-[24px]">
        <p className="text-[#ccc]">Copyright © 2024</p>
        <Link className="hover:text-[var(--color-primary)] hover:underline hover:underline-offset-4">
          Chính sách và Điều khoản
        </Link>
      </div>
    </div>
  );
};

export default Footer;
