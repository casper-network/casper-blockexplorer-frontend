import styled from '@emotion/styled';

export const LanguageSelectorWrapper = styled.div``;

export const LanguageSelectorButton = styled.button`
  border: black 2px solid;
  text-align: center;
  padding: 0.26rem 1rem;
  cursor: pointer;
  color: black;
  background-color: white;

  :disabled {
    background-color: blue;
    color: white;
  }
`;
