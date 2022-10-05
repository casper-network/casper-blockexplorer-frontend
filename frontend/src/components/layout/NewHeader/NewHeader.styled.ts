import styled from '@emotion/styled';

const breakpoints = [420, 480, 640, 768, 992, 1024, 1200, 1440, 1600, 1800];
const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

export const MobileSelectContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MobileSelectButtons = styled.button<{ isSelected?: boolean }>`
  font-size: 0.75rem;
  font-style: bold;
  line-height: 1rem;
  border-style: none;
  border-radius: 9999px;
  padding: 0.3125rem 0.625rem; ;
`;

// color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
// background-color: ${({ isSelected }) =>
// isSelected ? '#0325D1' : '#e6e6e7'};

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;

// className="flex justify-center bg-casper-white pt-25 lg:pt-0"

export const InputButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5625rem;
  ${mq[5]} {
    padding-top: 0;
  }
`;
// className =  shadow-inner shadow-gray-300;
export const SearchInput = styled.input`
  display: block;
  color: #84888e;
  background-color: #fff;
  height: 2.8125rem;
  max-width: 16.25rem;
  border-radius: 0.375rem 0 0 0.375rem;
  padding: 0 1.25rem;
  margin-top: 0;
  margin-bottom: 0;
  border-style: none;
  appearance: none;
  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

// className =
//   'bg-cobalt-blue w-45 relative h-45 right-1 focus:outline-none font-medium rounded-r-md border-none cursor-pointer';

export const SubmitButton = styled.button`
  font-weight: 500;
  background-color: #0325d1;
  height: 2.8125rem;
  width: 2.8125rem;
  padding-top: 0.5rem;
  border-radius: 0 0.375rem 0.375rem 0;
  cursor: pointer
  position: relative;
  right: 0.0625rem;
  border-style: none;
  :hover,
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

// className = ' lg:pb-16 ';
export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 0.3125rem;
`;

// className = 'fill-casper-white pt-12 w-20 h-30 stroke-casper-red stroke-2 mr-7';

export const ErrorSvgContainer = styled.div`
  height: 1.875rem;
  width: 1.25rem;
  stroke: #da2f54;
  stroke-width: 2;
  fill: #fff;
  padding-top: 0.75rem;
  margin-right: 0.4375rem;
`;

// className = 'text-casper-red text-[0.9rem] xxs:text-base pt-14 xxs:pt-12';

export const ErrorMessage = styled.p`
  color: #da2f54;
  font-size: 1rem;
  padding-top: 0.875rem;
`;

// className="w-full bg-casper-white

export const Header = styled.header`
  width: 100%;
  background-color: #fff;
`;

// className = 'px-40 py-20 xxs:pl-22 md:pl-30 xl:pl-46 pr-28 md:pr-36 xl:pr-52';

export const HeaderComponentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 112.5rem;
  padding: 1.25rem 2.5rem;
`;

// className="pt-7

export const LogoContainer = styled.div`
  padding: 0.4375rem 0 0 0;
`;

// className = 'flex flex-row items-center';

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// className = 'h-26 w-28  xxs:h-50';

export const CasperLogo = styled.img`
height: 3.125rem
width: 1.75rem;
`;

// className = 'z-10 lg:py-15 bg-casper-white lg:w-500';

export const Nav = styled.nav`
  background-color: #fff;
  z-index: 10;
  padding: 0 0.9375rem;
  ${mq[5]} {
    width: 31.25rem;
  }
`;

// className = 'flex flex-col lg:flex-row lg:justify-between';

export const NavComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${mq[5]} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// className = 'z-30 pt-5 flex flex-row justify-end lg:justify-between';

export const NavButtonContainer = styled.div`
  display: flex;
  z-index: 30;
  flex-direction: row;
  justify-content: end;
  padding-top: 0.3125rem;
  ${mq[5]} {
    justify-content: space-between;
  }
`;

// className = 'lg:hidden bg-transparent border-none';

export const NavButton = styled.button`
  background-color: green;
  border-style: none;
  ${mq[5]} {
    display: none;
  }
`;

// className=" lg:space-x-12 "

export const NavMenuContainer = styled.div`
  background-color: yellow;
  border-style: none;
  ${mq[5]} {
    display: flex;
    flex-direction: row;
    width: auto;
  }
`;

// {`${
//     currentFilterOption === option.value
//       ? 'bg-cobalt-blue text-white'
//       : 'bg-[#e6e6e7] text-black'
//   } text-xs text-bold border-none rounded-full py-5 px-10`}

// export const TableData = styled.td<{ noDividers?: boolean }>`
//   height: 100%;
//   width: auto;
//   padding: 1rem 0;
//   border: none;
//   border-bottom: ${({ noDividers }) =>
//     noDividers ? 'none' : '1px solid rgb(245 245 247)'};
// `;
