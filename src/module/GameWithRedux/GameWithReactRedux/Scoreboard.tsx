import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from "../../../pages/store";
import { actions } from "../index";

import { Scoreboard as ScoreboardComponent } from "../../../components/Scoreboard";
import { GameLevel, LevelNames } from '../../GameSettings';

export const Scoreboard: FC = () => {
    const dispatch = useDispatch();

    const { time, bombs, flagCounter, level } = useSelector(
        ({ game: { time, bombs, flagCounter, level } }: RootState) => ({ 
            time, bombs, flagCounter, level 
        })
    );

    const handleChange = useCallback(
        ({target: {value: level}}: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch(actions.changeLevel(level as LevelNames))
          }, 
          // Stryker disable next-line ArrayDeclaration
          []);

    const onReset = useCallback(
        () => dispatch(actions.reset()), 
        // Stryker disable next-line ArrayDeclaration
        []
    );

    return (
        <>
            <ScoreboardComponent 
                timer={String(time)} 
                levels={GameLevel as unknown as string[]}
                defaultValue={level}
                onChangeLevel={handleChange}
                onReset={onReset}
                bombs={String(bombs - flagCounter)}
            />
        </>
    )
}
