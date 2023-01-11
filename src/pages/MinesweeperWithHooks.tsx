import React, { FC } from 'react';

import { useParams } from "react-router-dom";

import { GameLayout } from '../components/Game';
import  Top  from "../components/Top";
import { GameWithHooks } from '../module/GameWithHooks';

const MinesweeperWithHooks: FC = () => {
    const { username } = useParams<{ username?: string }>();

    return (
        <GameLayout 
            top={
                <Top feature="Flag" firstAction="ctrl" secondAction="click">
                    Minesweeper with React Hooks special for you: {username && ` ${username}`}
                </Top>
            }
        >
            <GameWithHooks />
        </GameLayout>
    );
}

export default MinesweeperWithHooks;