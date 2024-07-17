import images from '@/assets/images';
import React, { useEffect, useRef, useState } from 'react';
import Dot from './Dot';

const Background = ({ imageUrl }) => {
  const bgRef = useRef();
  const dotRef = useRef();
  const [position, setPosition] = useState({
    dot1: ['50%', '50%'], // top, right
    dot2: ['30%', '50%'], // top, right
    dot3: ['50%', '50%'], // top, right
    dot4: ['90%', '10%'], // top, right
    dot5: ['55%', '28%'], // top, right
  });

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setPosition((prev) => ({
          ...prev,
          dot1: [`${height / 2}px`, `${width / 2}px`],
          dot2: [`${height / 3}px`, `${width / 2.2 + 15}px`],
          dot3: [`${height / 5}px`, `${width / 2 + 100}px`],
          dot5: [`${height / 2 + 50}px`, `${width / 3 - 50}px`],
        }));
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (bgRef.current) {
      observer.observe(bgRef.current);
    }

    return () => {
      if (bgRef.current) {
        observer.unobserve(bgRef.current);
      }
    };
  }, []);

  return (
    <div ref={bgRef} className="relative">
      <img
        src={imageUrl || images.authBg}
        alt=""
        className="w-full h-screen object-cover"
      />

      <div className="hidden lg:block">
        <Dot
          x={position.dot1[0]}
          y={position.dot1[1]}
          position="top-left"
          content="Ghế salon thư giãn Luôn vui tươi"
        />
      </div>
      <div className="hidden lg:block">
        <Dot
          x={position.dot2[0]}
          y={position.dot2[1]}
          position="bottom-right"
          content="Tranh trang trí phong cách tối giản"
        />
      </div>
      <div className="hidden xl:block">
        <Dot
          x={position.dot3[0]}
          y={position.dot3[1]}
          position="bottom-left"
          content="Đèn đồng nguyên khối phong cách tối giản"
        />
      </div>
      <div className="hidden 2xl:block">
        <Dot
          x={position.dot4[0]}
          y={position.dot4[1]}
          position="top-left"
          content="Thảm chải sàn lụa mát lạnh Labourgini"
        />
      </div>
      <div className="hidden 2xl:block">
        <Dot
          x={position.dot5[0]}
          y={position.dot5[1]}
          position="bottom-left"
          content="Lọ cắm hoa thuỷ tinh Hermos Mayberline "
        />
      </div>
    </div>
  );
};

export default Background;
