import styled from '@emotion/styled';

export const AvatarIcon = styled.img<{ isHashTruncated: boolean }>`
  width: 3rem;
  display: inline;
  margin-right: 1.25rem;
  margin-bottom: ${({ isHashTruncated }) =>
    isHashTruncated ? '1rem' : '5.166rem'};
`;
