import React, { useEffect, useState } from 'react';
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
import { useTheme } from '@emotion/react';
import { darkTheme, lightTheme } from 'src/theme';
import {
  DESKTOP_RAW_DATA_STRING_LENGTH_COEFFICIENT,
  MOBILE_BREAKPOINT,
  MOBILE_RAW_DATA_STRING_LENGTH_COEFFICIENT,
} from 'src/constants';

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
  const [stringLength, setStringLength] = useState<number>();

  const windowWidth = window.innerWidth;

  useEffect(() => {
    if (windowWidth <= MOBILE_BREAKPOINT) {
      const MobileRawDataStringLength = Math.floor(
        windowWidth * MOBILE_RAW_DATA_STRING_LENGTH_COEFFICIENT,
      );
      setStringLength(MobileRawDataStringLength);
    } else {
      const DesktopRawDataStringLength = Math.floor(
        windowWidth * DESKTOP_RAW_DATA_STRING_LENGTH_COEFFICIENT,
      );
      setStringLength(DesktopRawDataStringLength);
    }
  }, [windowWidth]);

  const { type: themeType } = useTheme();

  const rawDataBackgroundColor =
    themeType === 'light'
      ? lightTheme.rawData.background
      : darkTheme.rawData.background;

  const rawDataKeyValStrings =
    themeType === 'light'
      ? lightTheme.rawData.keyValString
      : darkTheme.rawData.keyValString;

  const rawDataNumberOfItemsAndArrayIndices =
    themeType === 'light'
      ? lightTheme.rawData.itemsArrayIndices
      : darkTheme.rawData.itemsArrayIndices;

  const rawDataSvgAndNestedVal =
    themeType === 'light' ? lightTheme.text.warning : darkTheme.text.warning;

  const rawDataTheme = {
    base00: `${rawDataBackgroundColor}`,
    base01: `${rawDataBackgroundColor}`,
    base02: `${rawDataBackgroundColor}`,
    base03: `${rawDataKeyValStrings}`,
    base04: `${rawDataNumberOfItemsAndArrayIndices}`,
    base05: `${rawDataKeyValStrings}`,
    base06: `${rawDataKeyValStrings}`,
    base07: `${rawDataKeyValStrings}`,
    base08: `${rawDataKeyValStrings}`,
    base09: `${rawDataKeyValStrings}`,
    base0A: `${rawDataNumberOfItemsAndArrayIndices}`,
    base0B: `${rawDataKeyValStrings}`,
    base0C: `${rawDataNumberOfItemsAndArrayIndices}`,
    base0D: `${rawDataSvgAndNestedVal}`,
    base0E: `${rawDataSvgAndNestedVal}`,
    base0F: `${rawDataSvgAndNestedVal}`,
  };

  // More on base roles at: https://github.com/chriskempson/base16/blob/main/styling.md

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
            <ReactJson
              src={rawDataJSON}
              displayDataTypes={false}
              collapsed
              theme={rawDataTheme}
              collapseStringsAfterLength={stringLength}
            />
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
  padding: 1.5rem 0.1rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  background-color: ${props => props.theme.background.secondary};

  @media (min-width: ${defaultTheme.typography.breakpoints.xs}) {
    padding: 1.5rem;
  }
`;
