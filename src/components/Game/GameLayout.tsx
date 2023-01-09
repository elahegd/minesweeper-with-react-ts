import React, { FC, ReactNode } from 'react';

import { GameArea } from './GameArea';
import { Wrapper } from './Wrapper';

export interface GameLayoutProps {
    top: ReactNode;
    children: ReactNode;
}

export const GameLayout:FC<GameLayoutProps> = ({ top, children }) => {
  return (
    <Wrapper>
        {top}
        <GameArea>{children}</GameArea>
    </Wrapper>
  )
}
