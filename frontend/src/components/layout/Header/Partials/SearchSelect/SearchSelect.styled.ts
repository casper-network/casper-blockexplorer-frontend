import styled from '@emotion/styled';

export const MobileSelectContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 20.5rem;
  margin: 0 auto;
`;

export const MobileSelectButton = styled.button`
  font-size: 0.8rem;
  border-style: none;
  font-weight: 500;
  border-radius: 0.938rem;
  padding: 0.3125rem 0.625rem;
`;

export const SelectWrapper = styled.div`
  .react-select__control {
    width: 11rem;
    box-shadow: none;
    border: none;
  }

  .react-select__value-container {
    height: 3.2rem;
    background-color: #fff;
    padding: 0.7rem 0rem 0.7rem 0rem;
    margin: 0;
    border-radius: 0.375rem 0 0 0.375rem;
    box-shadow: inset 0px 1px 7px rgba(127, 128, 149, 0.3);
    position: relative;
  }

  .react-select__indicators {
    display: block;
    position: absolute;
    top: 0.5rem;
    left: 7.938rem;
    padding: 0;
  }

  .react-select__value-container:hover {
    cursor: pointer;
  }

  .react-select__single-value {
    color: black;
    font-weight: 500;
    font-size: clamp(1rem, 1vw, 1.1rem);
    text-align: left;
    padding-right: 2.3rem;
    padding-left: 1rem;
    padding-bottom: 0.05rem;
    margin: 0 auto;
  }

  .react-select__dropdown-indicator svg {
    color: black;
    width: 25px;
  }

  .react-select__indicator {
    display: block;
    color: black;
    width: 5px;
    padding: 0.5rem 0.4rem 0.5rem 0;
  }

  .react-select__menu-list {
    color: black;
    font-size: clamp(1rem, 1.2vw, 1.4rem);
    padding: 0;
    margin: 0;
    border-radius: 0.375rem;
  }

  .react-select__menu {
    color: white;
    background-color: #fff;
    border-radius: 0.375rem;
    width: 10.9rem;
  }

  .react-select__option:hover,
  .react-select__option:focus {
    color: black;
    transition-property: font-weight, color, 200ms, ease-in;
    background-image: linear-gradient(
      90deg,
      #1c1e90,
      #693590,
      #d81d54,
      #d81e54,
      #fd6b52
    );
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    font-weight: 700;
    background-color: transparent;
  }
  .react-select__option {
    background-color: transparent;
  }

  .react-select__option--is-selected {
    background-color: #0721cb;
  }
`;
