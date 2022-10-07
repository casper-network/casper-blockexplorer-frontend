import styled from '@emotion/styled';

export const DetailDataLabel = styled.h3`
  font-weight: 400;
  font-size: 1.05rem;
  color: #64748b;
`;

export const DetailDataWrapper = styled.ul`
  display: grid;
  gap: 2rem;
`;

export const DetailDataValue = styled.p`
  font-size: 1.25rem;
  color: black;
  font-weight: 500;
  margin-right: 5rem;
  margin-bottom: 1rem;
`;

export const DetailDataWrapperRow = styled.ul`
  display: flex;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;
