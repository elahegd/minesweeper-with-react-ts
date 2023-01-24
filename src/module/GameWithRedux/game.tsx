import { AnyAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, ThunkAction } from '@reduxjs/toolkit';

import { CellState, Coords, Field, fieldGenerator, generateFieldWithDefaultState } from "../../helpers/Field";
import { GameSettings, LevelNames } from "../GameSettings";
import { openCell as openCellHandler } from "../../helpers/openCell";
import { setFlag as setFlagHandler } from "../../helpers/setFlag";
import { RootState } from '../../pages/store';

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
    flagCounter: number,
    isTimerRunning: boolean
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
        gameField: fieldGenerator(size, bombs / (size*size)),
        isTimerRunning:false
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
      changeLevel: (state, { payload }: PayloadAction<LevelNames>) => getInitialState(payload),
      updateTime: (state) => {
        state.time = state.time + 1;
      },
      setTimerActive: (state) => {
        state.isTimerRunning = true;
      }
    },
});

// Action creator
export const recursiveUpdate = 
  (prevGameField: Field): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch, getState) => {

      setTimeout(() => {
        const { isGameStarted, isTimerRunning, gameField } = getState().game;
        // Compare the link pointer to the memory
        const isTheSameGame = gameField === prevGameField;
        
        if(isGameStarted && isTimerRunning && isTheSameGame) {
          dispatch(actions.updateTime());
          dispatch(recursiveUpdate(gameField));
        }
      }, 1000);

    }


export const runTimer = 
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch, getState) => {
      const { isGameStarted, isTimerRunning, gameField } = getState().game;
  
      if(isGameStarted && !isTimerRunning) {
        dispatch(actions.setTimerActive());
        dispatch(recursiveUpdate(gameField));
      }
  };

