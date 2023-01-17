import React, { FC } from 'react';
import { GameOver } from './GameOver';
import { Grid } from './Grid';
import { Scoreboard } from './Scoreboard';

export const GameWithReactRedux: FC = () => {
  return (
    <>
        <Scoreboard />
        <GameOver />
        <Grid />
    </>
  )
}
