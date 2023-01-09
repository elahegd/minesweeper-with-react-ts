import { FC, ChangeEvent, useCallback } from 'react';

import { GameArea } from '../../components/Game/GameArea';
import { GameOver } from '../../components/Game/GameOver';
import { Grid } from "../../components/Grid/Grid";
import { Top } from "../../components/Top";
import { Scoreboard } from '../../components/Scoreboard';

import { GameLevel, LevelNames } from "../../module/GameSettings";

import { useGame } from "../../hooks/useGame";

export const GameWithHooks:FC = () => {
  const { 
    level,
    isGameOver,
    isWin,
    playerField,
    setting,
    time,
    flagCounter,
    handleClick,
    handleChangeLevel,
    onReset,
    handleContextMenu
  } = useGame();

  const [, bombs] = setting;

  const handleChange = useCallback(
    ({target: {value: level}}: ChangeEvent<HTMLSelectElement>) => 
      handleChangeLevel(level as LevelNames), 
      // Stryker disable next-line ArrayDeclaration
      []);

  return (
    <>
        <Top feature="Flag" firstAction="ctrl" secondAction="click">Minesweeper</Top>
        <GameArea>
          <Scoreboard 
            timer={String(time)}
            levels={GameLevel as unknown as string[]}
            defaultValue={level}
            onChangeLevel={handleChange}
            onReset={onReset}
            bombs={String(bombs - flagCounter)}
          />
          {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
          <Grid onClick={handleClick} onContextMenu={handleContextMenu}>
              {playerField}
          </Grid>
        </GameArea>
    </>
  )
}