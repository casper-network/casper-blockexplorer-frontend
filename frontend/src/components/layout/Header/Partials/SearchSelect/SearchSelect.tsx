import React from 'react';

import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormValues, SelectOptions } from '../partials.types';

import { useAppSelector, getBounds } from '../../../../../store';

import { MOBILE_BREAKPOINT } from '../../../../../constants';

import {
  MobileSelectButton,
  MobileSelectContainer,
} from './SearchSelect.styled';

interface SearchSelectProps {
  readonly control: Control<FormValues, any>;
  readonly currentFilterOption: string;
  readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  control,
  currentFilterOption,
  setCurrentFilterOption,
}) => {
  const bounds = useAppSelector(getBounds);
  const windowWidth = bounds?.width || 0;

  const selectOptions: SelectOptions[] = [
    { value: 'account', label: 'Account' },
    { value: 'deploy', label: 'Deploy' },
    { value: 'block', label: 'Block Hash' },
    { value: 'blockHeight', label: 'Block Height' },
  ];

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value, name } }) => {
        const currentSelection = selectOptions.find(
          option => option.value === value,
        );

        const handleSelectChange = (selectedOption: SelectOptions | null) => {
          onChange(selectedOption?.value);
          setCurrentFilterOption(selectedOption?.value!);
        };

        return windowWidth > MOBILE_BREAKPOINT ? (
          <Select
            defaultValue={selectOptions[0]}
            value={currentSelection}
            name={name}
            options={selectOptions}
            onChange={handleSelectChange}
            isSearchable={false}
            noOptionsMessage={() => null}
            className="custom-select"
            classNamePrefix="react-select"
          />
        ) : (
          <MobileSelectContainer>
            {selectOptions.map(option => {
              const handleClick = () => {
                onChange(option.value);
                setCurrentFilterOption(option.value);
              };

              return (
                <li key={option.value}>
                  <MobileSelectButton
                    onClick={handleClick}
                    style={{
                      backgroundColor:
                        currentFilterOption === option.value
                          ? '#0325d1'
                          : '#F1F1F4',
                      color:
                        currentFilterOption === option.value ? '#fff' : '#000',
                    }}
                    type="button">
                    {option.label.includes('Block')
                      ? option.label.replace('Block', 'Blk')
                      : option.label}
                  </MobileSelectButton>
                </li>
              );
            })}
          </MobileSelectContainer>
        );
      }}
      name="filterOptions"
      rules={{
        required: true,
      }}
    />
  );
};

// interface MobileSelectProps {
//   readonly control: Control<FormValues, any>;
//   readonly selectOptions: SelectOptions[];
//   readonly currentFilterOption: string;
//   readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
// }

// interface DesktopSelectProps {
//   readonly control: Control<FormValues, any>;
//   readonly selectOptions: SelectOptions[];
//   readonly setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>;
// }

// export const SearchSelect: React.FC<SearchSelectProps> = ({
//   control,
//   currentFilterOption,
//   setCurrentFilterOption,
// }) => {
//   const bounds = useAppSelector(getBounds);

//   const windowWidth = bounds?.width || 0;

//   const selectOptions: SelectOptions[] = [
//     { value: 'account', label: 'Account' },
//     { value: 'deploy', label: 'Deploy' },
//     { value: 'block', label: 'Block Hash' },
//     { value: 'blockHeight', label: 'Block Height' },
//   ];

//   return windowWidth > MOBILE_BREAKPOINT ? (
//     <DesktopSelect
//       control={control}
//       selectOptions={selectOptions}
//       setCurrentFilterOption={setCurrentFilterOption}
//     />
//   ) : (
//     <MobileSelect
//       control={control}
//       selectOptions={selectOptions}
//       currentFilterOption={currentFilterOption}
//       setCurrentFilterOption={setCurrentFilterOption}
//     />
//   );
// };

// export const MobileSelect: React.FC<MobileSelectProps> = ({
//   control,
//   selectOptions,
//   currentFilterOption,
//   setCurrentFilterOption,
// }) => (
//   <Controller
//     control={control}
//     render={({ field: { onChange } }) => {
//       return (
//         <MobileSelectContainer>
//           {selectOptions.map(option => {
//             const handleClick = () => {
//               onChange(option.value);
//               setCurrentFilterOption(option.value);
//             };

//             return (
//               <li key={option.value}>
//                 <MobileSelectButton
//                   onClick={handleClick}
//                   style={{
//                     backgroundColor:
//                       currentFilterOption === option.value
//                         ? '#0325d1'
//                         : '#F1F1F4',
//                     color:
//                       currentFilterOption === option.value ? '#fff' : '#000',
//                   }}
//                   type="button">
//                   {option.label.includes('Block')
//                     ? option.label.replace('Block', 'Blk')
//                     : option.label}
//                 </MobileSelectButton>
//               </li>
//             );
//           })}
//         </MobileSelectContainer>
//       );
//     }}
//     name="filterOptions"
//     rules={{
//       required: true,
//     }}
//   />
// );

// export const DesktopSelect: React.FC<DesktopSelectProps> = ({
//   control,
//   selectOptions,
//   setCurrentFilterOption,
// }) => (
//   <Controller
//     control={control}
//     render={({ field: { onChange, value, name } }) => {
//       const currentSelection = selectOptions.find(
//         option => option.value === value,
//       );

//       const handleSelectChange = (selectedOption: SelectOptions | null) => {
//         onChange(selectedOption?.value);
//         setCurrentFilterOption(selectedOption?.value!);
//       };

//       return (
//         <Select
//           defaultValue={selectOptions[0]}
//           value={currentSelection}
//           name={name}
//           options={selectOptions}
//           onChange={handleSelectChange}
//           isSearchable={false}
//           noOptionsMessage={() => null}
//           className="custom-select"
//           classNamePrefix="react-select"
//         />
//       );
//     }}
//     name="filterOptions"
//     rules={{
//       required: true,
//     }}
//   />
// );
