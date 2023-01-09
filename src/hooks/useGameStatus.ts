import { useState } from "react";

interface ReturnType {
    setInProgress: () => void,
    setGameWin: () => void,
    setGameLoose: () => void,
    setNewGame: () => void,
    isGameOver: boolean,
    isWin: boolean,
    gameIsStarted: boolean
}

export enum GameStatuses {
    NewGame,
    InProgress,
    Loose,
    Win
}

export const useGameStatus = () => {
    const { NewGame, InProgress, Loose, Win } = GameStatuses;

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);

    const setNewGame = () => {
        setIsWin(false);
        setIsGameOver(false);
        setGameIsStarted(false);
    }

    const setInProgress = () => setGameIsStarted(true);

    const setGameWin = () => {
        setIsWin(true);
        setIsGameOver(true);
        setGameIsStarted(false);
    }
    
    const setGameLoose = () => {
        setIsGameOver(true);
        setGameIsStarted(false);
        setIsWin(false);
    }

    return {
        setInProgress,
        setGameWin,
        setGameLoose,
        setNewGame,
        isGameOver,
        isWin,
        gameIsStarted
    }
}