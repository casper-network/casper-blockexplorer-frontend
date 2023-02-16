import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import { ApiData } from 'src/api/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlockCarouselCard } from '../../cards/BlockCarouselCard';

interface MobileBlocksProps {
  readonly blocks: ApiData.Block[];
}

export const MobileBlocksCarousel: React.FC<MobileBlocksProps> = ({
  blocks,
}) => {
  return (
    <MobileBlocksCarouselWrapper>
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
    </MobileBlocksCarouselWrapper>
  );
};

const MobileBlocksCarouselWrapper = styled.div`
  max-width: calc(100vw - 4rem);
`;
