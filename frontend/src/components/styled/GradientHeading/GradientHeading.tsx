import styled from '@emotion/styled';
import { Heading, HeadingProps } from '../../base';

interface GradientHeadingProps extends HeadingProps {
  readonly gradient?: string;
}

const baseGradient =
  'linear-gradient(93.67deg, #1C1E90 1.63%, #693590 64.2%, #D81D54 92.03%, #D81E54 92.49%, #FD6B52 151.99%)';

export const GradientHeading = styled(Heading)<GradientHeadingProps>`
  background: ${({ gradient }) => gradient ?? baseGradient};
  background-clip: text;
  width: fit-content;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
