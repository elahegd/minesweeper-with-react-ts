import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Wrapper, WrapperProps } from './Wrapper';
import { GameOver } from "./GameOver";
import { GameArea } from "./GameArea";

import { Top } from "../Top";
import { Scoreboard } from "../Scoreboard";
import { Grid } from "../Grid";

import { Field } from "../../helpers/Field";
import { fieldGenerator } from "../../helpers/__mocks__/Field";

export default {
    title: "Game/GameExample",
    component: Wrapper
} as Meta;

const Template: Story<WrapperProps> = (args) => <Wrapper {...args} />;

export const GameExample = Template.bind({});
GameExample.args = {
    children: (
        <>
            <Top feature="Flag" firstAction="ctrl" secondAction="click">Minesweeper</Top>
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