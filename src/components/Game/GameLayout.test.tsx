import React from 'react';
import { render } from "@testing-library/react";

import {GameLayout} from "./GameLayout";
import { GameArea } from "./GameArea";
import { GameOver } from './GameOver';

import { Top } from "../Top";
import { Scoreboard } from "../Scoreboard";
import { Grid } from "../Grid";

import { Field } from "../../helpers/Field";
import { fieldGenerator } from "../../helpers/__mocks__/Field";

describe("Render GameLayout component with props", () => {
    it("GameLayout renders correctly", () => {
        const { asFragment } = render(
        <GameLayout
            top= { 
                <Top 
                    feature={'Flag'}
                    firstAction={'ctrl'}
                    secondAction={'click'}>
                minesweeper
                </Top>
            }
            >
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
            </GameLayout>);

        expect(asFragment()).toMatchSnapshot();;
    });
});