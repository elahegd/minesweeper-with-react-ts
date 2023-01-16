import React, { FC } from 'react';

import { GameLayout } from '../../components/Game';
import  Top  from "../../components/Top";
import { GameWithUseReducer } from '../../module/GameWithRedux';

const MinesweeperWithUseReducer: FC = () => {
    return (
        <GameLayout 
            top={
                <Top feature="Flag" firstAction="ctrl" secondAction="click">
                    Minesweeper with React and Redux uses useReducer
                </Top>
            }
        >
            <GameWithUseReducer />
        </GameLayout>
    );
}

export default MinesweeperWithUseReducer;