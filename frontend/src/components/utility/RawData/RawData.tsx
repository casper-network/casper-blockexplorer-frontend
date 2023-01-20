import React from 'react';
import ReactJson from '@microlink/react-json-view';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import styled from '@emotion/styled';
import { colors } from '../../../styled-theme';

interface RawDataProps {
  readonly rawData: string;
}

// added to satisfy TS ESLint
// https://stackoverflow.com/questions/63727066/typescript-unsafe-assignment-of-an-any-value-eslint-error
const parseJSON = (JSONString: string) => {
  return JSON.parse(JSONString) as object;
};

export const RawData: React.FC<RawDataProps> = ({ rawData }) => {
  const { t } = useTranslation();
  const rawDataJSON: object = parseJSON(rawData);

  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <RawDataToggleButton>
            <AccordionItemState>
              {({ expanded }) =>
                !expanded ? t('show-raw-data') : t('hide-raw-data')
              }
            </AccordionItemState>
          </RawDataToggleButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <CodeBackground>
            <ReactJson src={rawDataJSON} displayDataTypes={false} collapsed />
          </CodeBackground>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

const RawDataToggleButton = styled(AccordionItemButton)`
  margin-top: 0.5rem;

  background-color: ${colors.lightSupporting};
  color: ${colors.darkWarning};
  padding: 0.4rem 1.25rem;
  font-size: 0.875rem;
  width: fit-content;
  border-radius: 0.35rem;
  transition: ease-in 0.2s;

  &:hover {
    background-color: ${colors.lightWarning};
  }
`;

const CodeBackground = styled.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  background-color: ${colors.lightSupporting};
`;
