import { FC, ChangeEvent, useCallback, useReducer } from 'react';

import { GameArea } from '../../../components/Game/GameArea';
import { GameOver } from '../../../components/Game/GameOver';
import { Grid } from "../../../components/Grid/Grid";
import  Top  from "../../../components/Top";
import { Scoreboard } from '../../../components/Scoreboard';

import { GameLevel, LevelNames } from "../../../module/GameSettings";

import { reducer, actions, getInitialState } from "../game";
import { Coords } from '../../../helpers/Field';

export const GameWithUseReducer:FC = () => {
  const [{
    level,
    isGameOver,
    isWin,
    playerField,
    settings: setting,
    time,
    flagCounter}, dispatch] = useReducer(reducer, getInitialState());

  const [, bombs] = setting;

  const handleClick = useCallback(
    (coords: Coords) => dispatch(actions.openCell(coords)),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const handleContextMenu = useCallback(
    (coords: Coords) => dispatch(actions.setFlag(coords)),
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const onReset = useCallback(
    () => dispatch(actions.reset()) ,
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const handleChange = useCallback(
    ({target: {value: level}}: ChangeEvent<HTMLSelectElement>) => {
      dispatch(actions.changeLevel(level as LevelNames))
      }, 
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