import styled from '@emotion/styled';
import { breakpoints, colors, pxToRem } from 'src/styled-theme';

export const FormContainer = styled.div<{ isFirstVisit: boolean }>`
  display: flex;
  justify-content: center;
  width: auto;
  margin: 0 2.25rem;
  position: relative;
  padding: 0;

  @media (min-width: ${breakpoints.md}) {
    margin: 0 2.25rem;
    width: auto;
    min-width: ${pxToRem(625)};
    align-items: center;
  }

  @media (min-width: ${breakpoints.lg}) {
    justify-content: start;
    width: auto;
    min-width: ${pxToRem(300)};
    margin: 0 2.25rem;
  }
`;

export const Form = styled.form`
  width: 100%;
`;

export const FormComponentsContainer = styled.div`
  @media (min-width: ${breakpoints.md}) {
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
  height: ${pxToRem(72)};
  width: 100%;
  font-size: clamp(0.9rem, 1.1vw, 1.4rem);
  border-radius: 0.375rem 0 0 0.375rem;
  padding: 0 2rem;
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
  background-color: #4589f6;
  height: ${pxToRem(72)};
  width: ${pxToRem(72)};
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
