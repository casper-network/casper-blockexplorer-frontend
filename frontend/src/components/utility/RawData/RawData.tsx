import React from 'react';
import ReactJson from '@microlink/react-json-view';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';

interface RawDataProps {
  readonly rawData: string;
}

// added to satisfy TS ESLint
// https://stackoverflow.com/questions/63727066/typescript-unsafe-assignment-of-an-any-value-eslint-error
const parseJSON = (JSONString: string) => {
  return JSON.parse(JSONString) as object;
};

export const RawData: React.FC<RawDataProps> = ({ rawData }) => {
  const rawDataJSON: object = parseJSON(rawData);

  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton className="bg-light-grey hover:bg-light-red text-dark-red px-16 py-6 text-13 w-fit rounded-md">
            <AccordionItemState>
              {({ expanded }) =>
                !expanded ? 'Show raw data' : 'Hide raw data'
              }
            </AccordionItemState>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="mt-24">
          <ReactJson src={rawDataJSON} displayDataTypes={false} collapsed />
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};
