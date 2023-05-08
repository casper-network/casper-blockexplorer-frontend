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
import { pxToRem, defaultTheme } from 'casper-ui-kit';
import styled from '@emotion/styled';

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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
  padding: 0.4rem 1.25rem;
  font-size: 1.25rem;
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  border-radius: 0.35rem;
  transition: ease-in 0.2s;
  width: ${pxToRem(188)};
  height: ${pxToRem(55)};

  &:hover {
    background-color: ${props => props.theme.background.hover};
    cursor: pointer;
  }
`;

const CodeBackground = styled.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  background-color: ${props => props.theme.background.secondary};

  * {
    color: ${props => props.theme.text.primary};
  }
`;
