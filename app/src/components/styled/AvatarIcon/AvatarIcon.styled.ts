import styled from '@emotion/styled';
import { defaultTheme, pxToRem } from 'casper-ui-kit';

export const AvatarIcon = styled.img<{ isTruncated: boolean }>`
  width: ${pxToRem(74)};
  margin-right: 1rem;
  @media (min-width: ${defaultTheme.typography.breakpoints.xxs}) {
    margin: 0 2rem;
  }
`;
