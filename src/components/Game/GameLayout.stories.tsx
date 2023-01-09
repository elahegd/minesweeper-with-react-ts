import React from 'react';
import { Story, Meta } from '@storybook/react';

import { GameLayout, GameLayoutProps } from './GameLayout';
import { GameArea } from "./GameArea";
import { GameOver } from './GameOver';

import { Top } from "../Top";
import { Scoreboard } from "../Scoreboard";
import { Grid } from "../Grid";

import { Field } from "../../helpers/Field";
import { fieldGenerator } from "../../helpers/__mocks__/Field";

export default {
    title: "Game/GameLayout",
    component: GameLayout
} as Meta;

const Template: Story<GameLayoutProps> = (args) => <GameLayout {...args} />;

export const GameLayoutExample = Template.bind({});
GameLayoutExample.args = {
    top: (
        <Top 
        feature={'Flag'}
        firstAction={'ctrl'}
        secondAction={'click'}>
        minesweeper
        </Top>
    ),
    children:(
        <>
            <GameArea>
            <Scoreboard 
                timer="000"
                bombs="000"
                levels={['beginner', 'intermediate', 'expert']}
                defaultValue='beginner'
                onReset={() => null}
                onChangeLevel={() => null}
            />
                <GameOver onClick={() => null} isWin={true} />
                <Grid onClick={() => null} onContextMenu={() => null}>
                    {fieldGenerator(9) as Field}
                </Grid>
            </GameArea>
        </>
    )
}