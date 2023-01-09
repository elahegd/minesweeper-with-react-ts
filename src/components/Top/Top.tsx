import { FC, memo } from 'react';
import styled from '@emotion/styled';

import { Legend, LegendProps } from './Legend';
import { GameName } from './GameName';

export interface TopProps extends LegendProps {
    children: string;
}

export const Top: FC<TopProps> = memo(({ children, ...legendProps }) => (
  <Header>
    <GameName>{children}</GameName>
    <Legend {...legendProps} />
  </Header>
));
// Stryker disable next-line StringLiteral
// Useful for debuging in devtools
Top.displayName = 'Top';

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;