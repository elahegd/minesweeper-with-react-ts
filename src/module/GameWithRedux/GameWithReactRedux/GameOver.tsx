import React, { useCallback, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from "../../../pages/store";
import { actions } from "../index";

import { GameOver as GameOverComponent } from "../../../components/Game/GameOver";

export const GameOver: FC = () => {
    const dispatch = useDispatch();

    const { isWin, isGameOver } = useSelector(({ game: { isWin, isGameOver } }: RootState) => ({
        isWin, isGameOver
    }));

    const onReset = useCallback(
        () => dispatch(actions.reset()), 
        []
    )

    return (
        <>
            {isGameOver && <GameOverComponent onClick={onReset} isWin={isWin} />}
        </>
    )
}
