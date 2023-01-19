import styled from '@emotion/styled';

export const AvatarIcon = styled.img<{ isTruncated: boolean }>`
  width: 3rem;
  display: inline;
  margin-right: 1.25rem;
  margin-bottom: ${({ isTruncated }) => (isTruncated ? '1rem' : '5.166rem')};
`;
