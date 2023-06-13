import styled from '@emotion/styled';
import { UiKitButton } from 'src/components/base/UiKitButton/UiKitButton';

export const MobileSelectContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 20.5rem;
  margin: 0 auto;
`;

export const MobileSelectButton = styled(UiKitButton)`
  font-size: 0.8rem;
  border-style: none;
  font-weight: 500;
  border-radius: 0.938rem;
  padding: 0.3125rem 0.625rem;
`;
