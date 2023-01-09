import { renderHook, act } from "@testing-library/react";

import { useGameStatus } from "./useGameStatus";

describe("useGameStatus test cases", () => {
    it("Check default state", () => {
        const { result } = renderHook(useGameStatus);

        const { isGameOver, isWin, gameIsStarted } = result.current;

        expect({ isGameOver, isWin, gameIsStarted }).toStrictEqual({
            isGameOver: false,
            isWin: false,
            gameIsStarted: false
        });
    });
    it("Check setNewGame handler", () => {
        const { result } = renderHook(useGameStatus);

        const { isGameOver, isWin, gameIsStarted } = result.current;

        expect({ isGameOver, isWin, gameIsStarted }).toStrictEqual({
            isGameOver: false,
            isWin: false,
            gameIsStarted: false
        });
    });
    it("Check setInProgress handler", () => {
        const { result } = renderHook(useGameStatus);

        act(result.current.setInProgress);
        const { isGameOver, isWin, gameIsStarted } = result.current;
        expect({ isGameOver, isWin, gameIsStarted }).toStrictEqual({
            isGameOver: false,
            isWin: false,
            gameIsStarted: true
        });
    });
    it("Check setGameWin handler", () => {
        const { result } = renderHook(useGameStatus);

        act(result.current.setGameWin);
        const { isGameOver, isWin, gameIsStarted } = result.current;
        expect({ isGameOver, isWin, gameIsStarted }).toStrictEqual({
            isGameOver: true,
            isWin: true,
            gameIsStarted: false
        });
    });
    it("Check setGameLoose handler", () => {
        const { result } = renderHook(useGameStatus);

        act(result.current.setGameLoose);
        const { isGameOver, isWin, gameIsStarted } = result.current;
        expect({ isGameOver, isWin, gameIsStarted }).toStrictEqual({
            isGameOver: true,
            isWin: false,
            gameIsStarted: false
        });
    });
    it("Full game statuses flow", () => {
        const { result } = renderHook(useGameStatus);

        act(result.current.setInProgress);
        const { isGameOver, isWin, gameIsStarted } = result.current;
        expect({ isGameOver, isWin, gameIsStarted }).toStrictEqual({
            isGameOver: false,
            isWin: false,
            gameIsStarted: true
        });

        act(result.current.setGameWin);
        const { isGameOver: newIsGameOver, isWin: newIsWin, gameIsStarted: newGameIsStarted } = result.current;
        expect({ newIsGameOver, newIsWin, newGameIsStarted }).toEqual({
            newIsGameOver: true,
            newIsWin: true,
            newGameIsStarted: false
        });

        act(result.current.setGameLoose);
        const { isGameOver: newIsGameOver1, isWin: newIsWin1, gameIsStarted: newGameIsStarted1 } = result.current;
        expect({ newIsGameOver1, newIsWin1, newGameIsStarted1 }).toEqual({
            newIsGameOver1: true,
            newIsWin1: false,
            newGameIsStarted1: false
        });

        act(result.current.setNewGame);
        const { isGameOver: newIsGameOver2, isWin: newIsWin2, gameIsStarted: newGameIsStarted2 } = result.current;
        expect({ newIsGameOver2, newIsWin2, newGameIsStarted2 }).toEqual({
            newIsGameOver2: false,
            newIsWin2: false,
            newGameIsStarted2: false
        });
    });
})