import { useState, useCallback } from "react";

import { fieldGenerator, generateFieldWithDefaultState } from "../helpers/Field";
import { openCell } from '../helpers/openCell';
import { setFlag } from "../helpers/setFlag";
import { Field, CellState, Coords } from '../helpers/Field';
import { LevelNames } from "../module/GameSettings";
import { useTime } from "../hooks/useTime";
import { useGameStatus } from "./useGameStatus";
import { useSettings } from "./useSettings";

export interface ReturnType {
    level: string,
    setting: [number, number],
    isGameOver: boolean,
    isWin: boolean,
    gameIsStarted: boolean,
    playerField: Field,
    gameField: Field,
    time: number,
    flagCounter: number,
    handleClick: (coords: Coords) => void,
    handleChangeLevel: (level: LevelNames) => void,
    onReset: () => void,
    handleContextMenu: (coords: Coords) => void,
}

export const useGame = (defaultLevel = 'beginner' as LevelNames ):ReturnType => {
    
    const { level, setLevel, settings: [size, bombs] } = useSettings(defaultLevel);

    const [playerField, setPlayerfield] = useState<Field>(generateFieldWithDefaultState(size, CellState.hidden));
    const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs/(size*size)));

    const { isGameOver, isWin, gameIsStarted, setGameWin, setGameLoose, setNewGame, setInProgress } = useGameStatus();

    const [time, resetTime] = useTime(gameIsStarted, isGameOver);
    const [flagCounter, setFlagCounter] = useState<number>(0);
  
    const handleClick = useCallback((coords: Coords) => { 
      !gameIsStarted && setInProgress();
      try {
        const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);

        if(isSolved) {
          setGameWin();
        }
        setPlayerfield([...newPlayerField])
      } catch(err) {
        // we should prevent to click other cells, so set the player field as game field
        setPlayerfield([...gameField]);
        setGameLoose();
      }
    }, [gameIsStarted, isWin, isGameOver, level, flagCounter, playerField, gameField]);

    const handleContextMenu = useCallback((coords: Coords) => {
      !gameIsStarted && setInProgress();
      const [newPlayerField, isSolved, newFlagCounter] = setFlag(coords, playerField, gameField, flagCounter, bombs);
      setFlagCounter(newFlagCounter);

      if(isSolved) {
        setGameWin();
      }
      setPlayerfield([...newPlayerField])
    }, [gameIsStarted, isWin, isGameOver, level, flagCounter, playerField, gameField])
  
    const handleChangeLevel = useCallback((level: LevelNames) => {
      const [size, bombs] = setLevel(level);
  
      handleReset([size, bombs])
    }, []);
  
    const handleReset = ([size, bombs]: [number, number]) => {
      const newgameField = fieldGenerator(size, bombs/(size*size));
      const newPlayerField = generateFieldWithDefaultState(size, CellState.hidden);

      setPlayerfield([...newPlayerField]);
      setGameField([...newgameField]);
      setFlagCounter(0);
      setNewGame();
      resetTime();
    }

    const onReset = useCallback(() => handleReset([size, bombs]), [size, bombs]);

    return {
        level,
        isGameOver,
        isWin,
        gameIsStarted,
        setting: [size, bombs],
        playerField,
        gameField,
        time,
        flagCounter,
        handleClick,
        handleChangeLevel,
        onReset,
        handleContextMenu
    }
}