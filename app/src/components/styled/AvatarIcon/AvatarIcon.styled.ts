import styled from '@emotion/styled';
import { pxToRem } from 'casper-ui-kit';

export const AvatarIcon = styled.img<{ isTruncated: boolean }>`
  width: ${pxToRem(74)};
  margin: 0 2rem;
`;
