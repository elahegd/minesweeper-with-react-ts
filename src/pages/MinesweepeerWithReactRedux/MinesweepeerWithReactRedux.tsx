import React, { FC } from 'react';

import { GameLayout } from '../../components/Game';
import  Top  from "../../components/Top";
import { GameWithReactRedux } from '../../module/GameWithRedux';

const MinesweepeerWithReactRedux: FC = () => {
    return (
        <GameLayout 
            top={
                <Top feature="Flag" firstAction="ctrl" secondAction="click">
                    Minesweeper with React - Redux
                </Top>
            }
        >
            <GameWithReactRedux />
        </GameLayout>
    );
}

export default MinesweepeerWithReactRedux;