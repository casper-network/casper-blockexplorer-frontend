import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';

import { Block } from '../../../types';
import { BlockDetailsCard } from '../BlockDetailsCard';

interface MobileBlocksProps {
  readonly blocks: Block[];
}

export const MobileBlocksCarousel: React.FC<MobileBlocksProps> = ({
  blocks,
}) => {
  return (
    <div className="max-w-screen-p-incl">
      <Swiper modules={[Navigation]} spaceBetween={100}>
        {blocks.map(block => (
          <SwiperSlide key={block.hash}>
            <BlockDetailsCard isCarousel block={block} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
