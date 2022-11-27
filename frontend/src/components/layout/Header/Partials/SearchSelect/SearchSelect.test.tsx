import React from 'react';
import { useForm } from 'react-hook-form';
import { render } from '../../../../../test-utils';
import { SearchSelect } from './SearchSelect';
import { FormValues } from '../partials.types';

// jest.mock('react-select', () => ({ options, value, onChange }) => {
//   function handleChange(event) {
//     const option = options.find(
//       option => option.value === event.currentTarget.value,
//     );
//     onChange(option);
//   }

//   return (
//     <select data-testid="select" value={value} onChange={handleChange}>
//       {options.map(({ label, value }) => (
//         <option key={value} value={value}>
//           {label}
//         </option>
//       ))}
//     </select>
//   );
// });

// jest.mock('react-hook-form', () => ({
//   ...jest.requireActual('react-hook-form'),
//   useFormContext: () => ({
//     handleSubmit: () => jest.fn(),
//     control: {
//       register: jest.fn(),
//       unregister: jest.fn(),
//       getFieldState: jest.fn(),
//       _names: {
//         array: new Set('test'),
//         mount: new Set('test'),
//         unMount: new Set('test'),
//         watch: new Set('test'),
//         focus: 'test',
//         watchAll: false,
//       },
//       _subjects: {
//         watch: jest.fn(),
//         array: jest.fn(),
//         state: jest.fn(),
//       },
//       _getWatch: jest.fn(),
//       _formValues: ['test'],
//       _defaultValues: ['test'],
//     },
//     getValues: () => {
//       return [];
//     },
//     setValue: () => jest.fn(),
//     formState: () => jest.fn(),
//     watch: () => jest.fn(),
//   }),
//   Controller: () => [],
//   useSubscribe: () => ({
//     r: { current: { subject: { subscribe: () => jest.fn() } } },
//   }),
// }));

// SearchSelectProps.setCurrentFilterOption: React.Dispatch<React.SetStateAction<string>>

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: () => <div />,
  useForm: () => ({
    control: () => ({}),
    handleSubmit: () => jest.fn(),
  }),
}));

describe('SearchSelect', () => {
  it('should render without error', () => {
    const { control } = useForm<FormValues>();
    const mockCurrentFilterOptions = 'test';

    const { getByTestId } = render(
      <SearchSelect
        control={control}
        currentFilterOption={mockCurrentFilterOptions}
        setCurrentFilterOption={jest.fn()}
      />,
    );

    const test = getByTestId('search-select');

    expect(test).toBeInTheDocument();
  });

  it('should display the current filter option by default', () => {
    const { control } = useForm<FormValues>();
    const mockCurrentFilterOptions = 'current filter option';

    const { getByDisplayValue } = render(
      <SearchSelect
        control={control}
        currentFilterOption={mockCurrentFilterOptions}
        setCurrentFilterOption={jest.fn()}
      />,
    );
    const test = getByDisplayValue('current filter option');

    expect(test).toBeInTheDocument();
  });
});

// const { getByTestId, getByLabelText } = render(
//   <form data-testid="form">
//     <label htmlFor="food">Food</label>
//     <Select options={OPTIONS} name="food" inputId="food" isMulti />
//   </form>,
// );
// expect(getByTestId('form')).toHaveFormValues({ food: '' }); // empty select

// // select two values...
// await selectEvent.select(getByLabelText('Food'), ['Strawberry', 'Mango']);
// expect(getByTestId('form')).toHaveFormValues({ food: ['strawberry', 'mango'] });

// // ...and add a third one
// await selectEvent.select(getByLabelText('Food'), 'Chocolate');
// expect(getByTestId('form')).toHaveFormValues({
//   food: ['strawberry', 'mango', 'chocolate'],
// });
