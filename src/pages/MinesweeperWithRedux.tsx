import React, { FC } from 'react';

import { GameLayout } from '../components/Game';
import  Top  from "../components/Top";
import { GameWithRedux } from '../module/GameWithRedux';

const MinesweeperWithRedux: FC = () => {
    return (
        <GameLayout 
            top={
                <Top feature="Flag" firstAction="ctrl" secondAction="click">
                    Minesweeper with React and Redux uses useReducer
                </Top>
            }
        >
            <GameWithRedux />
        </GameLayout>
    );
}

export default MinesweeperWithRedux;