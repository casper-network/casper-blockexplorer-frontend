import styled from '@emotion/styled';
import { pxToRem } from 'src/styled-theme';

export const AvatarIcon = styled.img<{ isTruncated: boolean }>`
  width: ${pxToRem(74)};
  margin: 0 2rem;
  /* margin-right: 1.25rem; */
  /* margin-bottom: ${({ isTruncated }) =>
    isTruncated ? '1rem' : '5.166rem'}; */
`;
