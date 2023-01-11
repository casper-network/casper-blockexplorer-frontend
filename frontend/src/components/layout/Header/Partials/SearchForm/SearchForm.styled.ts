import styled from '@emotion/styled';
import { breakpoints, pxToRem } from 'src/styled-theme';

export const FormContainer = styled.div<{ isFirstVisit: boolean }>`
  display: flex;
  justify-content: center;
  width: 92%;
  max-width: ${pxToRem(592)};
  padding: ${({ isFirstVisit }) =>
    isFirstVisit ? '0.5rem 0 2.7rem 0' : `${pxToRem(42)} 0`};
  margin: 0 auto;
  position: relative;

  @media (min-width: ${breakpoints.md}) {
    width: 80%;
    max-width: ${pxToRem(740)};
  }

  @media (min-width: ${breakpoints.lg}) {
    justify-content: start;
    width: ${({ isFirstVisit }) => (isFirstVisit ? '64.5%' : '76.5%')};
    max-width: ${({ isFirstVisit }) =>
      isFirstVisit ? `${pxToRem(792)}` : `${pxToRem(975)}`};
    padding-bottom: ${pxToRem(19)};
  }
`;

export const Form = styled.form`
  width: 100%;
`;

export const FormComponentsContainer = styled.div`
  @media (min-width: ${breakpoints.lg}) {
    display: flex;
    width: 100%;
  }
`;

export const InputAndButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.4rem;
  margin: 0 auto;
  width: 91%;

  @media (min-width: ${breakpoints.lg}) {
    padding-top: 0;
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  display: block;
  color: black;
  background-color: #fff;
  height: 2.8125rem;
  width: 100%;
  font-size: clamp(0.9rem, 1.1vw, 1.4rem);
  border-radius: 0.375rem 0 0 0.375rem;
  padding: 0 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: inset 0px 1px 7px rgba(127, 128, 149, 0.2);
  border-style: none;
  appearance: none;

  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  @media (min-width: ${breakpoints.lg}) {
    border-radius: 0;
  }
`;

export const SubmitButton = styled.button`
  font-weight: 500;
  background-color: #0325d1;
  height: 2.8125rem;
  width: 3.4rem;
  padding-top: 0.5rem;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  position: relative;
  right: 0.0625rem;
  border-style: none;

  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0;
  position: absolute;
  right: 0;
  left: 0;
`;

export const ErrorSvgContainer = styled.div`
  height: 1.55rem;
  width: 1.55rem;
  stroke: #da2f54;
  stroke-width: 2;
  fill: #fff;
`;

export const ErrorMessage = styled.p`
  color: #da2f54;
  font-size: 0.9rem;
  padding-top: 0.1rem;
`;

export const SearchLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
