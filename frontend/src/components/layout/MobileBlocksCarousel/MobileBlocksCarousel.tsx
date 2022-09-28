import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BlockCarouselCard } from 'src/components/cards/BlockCarouselCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';

import { Block } from '../../../types';

interface MobileBlocksProps {
  readonly blocks: Block[];
}

export const MobileBlocksCarousel: React.FC<MobileBlocksProps> = ({
  blocks,
}) => {
  return (
    <div className="max-w-screen-p-incl">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        spaceBetween={100}
        pagination={{
          clickable: true,
        }}>
        {blocks.map(block => (
          <SwiperSlide key={block.hash}>
            <BlockCarouselCard block={block} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
