import React from 'react';
import { InfoCardContentWrapper, InfoCardSection } from './InfoCard.styled';

interface InfoCardProps {
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ children }) => {
  return (
    <InfoCardSection>
      <InfoCardContentWrapper>{children}</InfoCardContentWrapper>
    </InfoCardSection>
  );
};
