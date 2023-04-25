import styled from '@emotion/styled';
import { pxToRem } from 'src/styled-theme';

export const AvatarIcon = styled.img<{ isTruncated: boolean }>`
  width: ${pxToRem(74)};
  margin: 0 2rem;
`;
