import styled from '@emotion/styled';
import { breakpoints, colors, pxToRem } from 'src/styled-theme';

export const FormContainer = styled.div<{ isFirstVisit: boolean }>`
  /* border: solid 1px red; */
  display: flex;
  justify-content: center;

  /* REFACTOR */
  /* width: 100%; */
  /* ORIGINAL */

  width: 92%;
  max-width: ${pxToRem(592)};
  padding: ${({ isFirstVisit }) => (isFirstVisit ? `${pxToRem(25)} 0` : '0')};
  margin: 0 auto 2rem auto;
  position: relative;
  padding: 0;

  @media (min-width: ${breakpoints.md}) {
    margin: 0 auto;
    width: 64%;

    /* REFACTOR */
    /* min-width: ${pxToRem(0)}; */

    /* ORIGINAL */
    min-width: ${pxToRem(625)};
    max-width: ${pxToRem(655)};
    align-items: center;
  }

  @media (min-width: ${breakpoints.lg}) {
    /* REFACTOR */
    /* justify-content: space-between;
    width: 100%;
    min-width: ${({ isFirstVisit }) =>
      isFirstVisit ? `${pxToRem(860)}` : `${pxToRem(600)}`};
    max-width: ${({ isFirstVisit }) =>
      isFirstVisit ? `${pxToRem(860)}` : `${pxToRem(10)}`};
    margin: ${({ isFirstVisit }) => (isFirstVisit ? '0 auto' : '0 auto')};
    padding-right: ${({ isFirstVisit }) =>
      isFirstVisit ? '0' : `${pxToRem(20)}`}; */

    /* ORIGINAL */
    justify-content: start;
    width: 100%;
    min-width: ${({ isFirstVisit }) =>
      isFirstVisit ? `${pxToRem(860)}` : `${pxToRem(350)}`};
    max-width: ${({ isFirstVisit }) =>
      isFirstVisit ? `${pxToRem(860)}` : `${pxToRem(1000)}`};
    margin: 0 auto;
    padding-right: ${({ isFirstVisit }) =>
      isFirstVisit ? '0' : `${pxToRem(20)}`};
  }
`;

export const Form = styled.form`
  /* border: solid 5px orange; */
  width: 100%;
`;

export const FormComponentsContainer = styled.div`
  @media (min-width: ${breakpoints.md}) {
    /* border: solid 5px black; */
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

  @media (min-width: ${breakpoints.md}) {
    padding-top: 0;
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  display: block;
  color: ${colors.black};
  background-color: ${colors.white};
  height: 2.5rem;
  width: 100%;
  font-size: clamp(0.9rem, 1.1vw, 1.4rem);
  border-radius: 0.375rem 0 0 0.375rem;
  padding: 0 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: inset 0px 1px 7px ${colors.boxShadow};
  border-style: none;
  appearance: none;

  /* Firefox Version 110.0b3 (Versions 69+) */
  @supports selector(:-moz-is-html) {
    height: 2.25rem;
  }

  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  @media (min-width: ${breakpoints.md}) {
    border-radius: 0;
  }
`;

export const SubmitButton = styled.button`
  font-weight: 500;
  background-color: ${colors.primary};
  height: 2.5rem;
  width: 3.2rem;
  padding-top: 0.5rem;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer;
  position: relative;
  right: 0.0625rem;
  border-style: none;

  /* Safari Version 12.3 11-15 up to Monterey */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      padding-top: 0.55rem;
    }
  }

  /* Firefox Version 110.0b3 (Versions 69+) */
  @supports selector(:-moz-is-html) {
    height: 2.25rem;
  }

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
  stroke: ${colors.mediumWarning};
  stroke-width: 2;
  fill: ${colors.white};
`;

export const ErrorMessage = styled.p`
  color: ${colors.mediumWarning};
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
