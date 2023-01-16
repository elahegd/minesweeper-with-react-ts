import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CellState, Coords, Field, fieldGenerator, generateFieldWithDefaultState } from "../../helpers/Field";
import { GameSettings, LevelNames } from "../GameSettings";
import { openCell as openCellHandler } from "../../helpers/openCell";
import { setFlag as setFlagHandler } from "../../helpers/setFlag";

export interface State {
    level: LevelNames;
    time: number;
    bombs: number;
    isGameOver: boolean;
    isGameStarted: boolean;
    isWin: boolean;
    settings: [number, number];
    playerField: Field;
    gameField: Field;
    flagCounter: number
}

export const getInitialState = (level: LevelNames = 'beginner') => {
    const settings = GameSettings[level];
    const [size, bombs] = settings;
  
    return {
        level,
        time: 0,
        bombs,
        isGameOver: false,
        isGameStarted: false,
        isWin: false,
        settings,
        flagCounter: 0,
        playerField: generateFieldWithDefaultState(size, CellState.hidden),
        gameField: fieldGenerator(size, bombs / (size*size))
    }
}

export const { reducer, actions } = createSlice({
    name: 'game',
    initialState: getInitialState(),
    reducers: {
      openCell: (state, { payload }: PayloadAction<Coords>) => {
        const { playerField, gameField } = state;

        try {
            const [newPlayerField, isSolved] = openCellHandler(payload, playerField, gameField);
            
            state.isWin= isSolved;
            state.isGameOver= isSolved;
            state.isGameStarted= !isSolved;
            state.playerField= newPlayerField;
            
        } catch(err) {
            state.isWin= false;
            state.isGameOver= true;
            state.isGameStarted= false;
            state.playerField= gameField;
        }
      },
      setFlag: (state, { payload }: PayloadAction<Coords>) => {
        const { playerField, gameField, bombs, flagCounter } = state;
        const [newPlayerField, isSolved, newFlagCounter] = setFlagHandler(payload, playerField, gameField, flagCounter, bombs);

        state.flagCounter = newFlagCounter;
        state.isWin = isSolved;
        state.isGameOver = isSolved;
        state.isGameStarted = !isSolved;
        state.playerField = newPlayerField;

      },
      reset: ({ level }) => getInitialState(level),
      changeLevel: (state, { payload }: PayloadAction<LevelNames>) => getInitialState(payload)
    },
})